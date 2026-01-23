# API Integration Guide - MCC Admin Panel

This document describes all the backend API endpoints required to integrate with the Model College Chatra (MCC) Admin Panel frontend.

## Table of Contents

1. [Configuration](#configuration)
2. [Authentication](#authentication)
3. [API Endpoints](#api-endpoints)
4. [Error Handling](#error-handling)

---

## Configuration

Set the API base URL in your `.env` file:

```env
VITE_API_BASE_URL=https://your-api-domain.com/api
```

All requests (except login) must include the Authorization header:

```
Authorization: Bearer <jwt_token>
```

---

## Authentication

### 1. Login

Authenticates admin user and initiates OTP verification.

**Endpoint:** `POST /auth/login`

**Request:**
```json
{
  "email": "admin@mcc.edu.in",
  "password": "your_password"
}
```

**Response (OTP Required):**
```json
{
  "success": true,
  "requiresOtp": true,
  "message": "OTP sent to your email"
}
```

**Response (Direct Login - if OTP disabled):**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "user_id",
    "email": "admin@mcc.edu.in",
    "name": "Admin Name",
    "role": "admin"
  }
}
```

**Error Response:**
```json
{
  "success": false,
  "message": "Invalid credentials"
}
```

---

### 2. Verify OTP

Verifies the OTP sent to admin's email.

**Endpoint:** `POST /auth/verify-otp`

**Request:**
```json
{
  "email": "admin@mcc.edu.in",
  "otp": "123456"
}
```

**Success Response:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "user_id",
    "email": "admin@mcc.edu.in",
    "name": "Admin Name",
    "role": "admin"
  }
}
```

**Error Response:**
```json
{
  "success": false,
  "message": "Invalid or expired OTP"
}
```

---

### 3. Forgot Password

Sends password reset link to admin's email.

**Endpoint:** `POST /auth/forgot-password`

**Request:**
```json
{
  "email": "admin@mcc.edu.in"
}
```

**Success Response:**
```json
{
  "success": true,
  "message": "Password reset link sent to your email"
}
```

**Error Response:**
```json
{
  "success": false,
  "message": "Email not found"
}
```

---

### 4. Reset Password

Resets password using token from email link.

**Endpoint:** `POST /auth/reset-password`

**Request:**
```json
{
  "token": "reset_token_from_email",
  "password": "new_password",
  "confirmPassword": "new_password"
}
```

**Success Response:**
```json
{
  "success": true,
  "message": "Password reset successfully"
}
```

---

### 5. Validate Token

Validates the current JWT token (called on app load).

**Endpoint:** `GET /auth/validate`

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Success Response:**
```json
{
  "success": true,
  "user": {
    "id": "user_id",
    "email": "admin@mcc.edu.in",
    "name": "Admin Name",
    "role": "admin"
  }
}
```

---

## API Endpoints

### Notices

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/notices` | Get all notices |
| GET | `/notices/:id` | Get notice by ID |
| POST | `/notices` | Create new notice |
| PUT | `/notices/:id` | Update notice |
| DELETE | `/notices/:id` | Delete notice |

**Notice Object:**
```json
{
  "id": "notice_id",
  "title": "Notice Title",
  "category": "Academic | Administrative | Examination | General",
  "date": "2024-01-15",
  "content": "Notice content...",
  "pdfUrl": "https://..../notice.pdf",
  "isPublished": true,
  "createdAt": "2024-01-15T10:00:00Z",
  "updatedAt": "2024-01-15T10:00:00Z"
}
```

---

### Events

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/events` | Get all events |
| GET | `/events/:id` | Get event by ID |
| POST | `/events` | Create new event |
| PUT | `/events/:id` | Update event |
| DELETE | `/events/:id` | Delete event |

**Event Object:**
```json
{
  "id": "event_id",
  "title": "Event Title",
  "description": "Event description...",
  "type": "Event | News | Tender | Press Release",
  "date": "2024-01-20",
  "imageUrl": "https://..../event.jpg",
  "isPublished": true,
  "createdAt": "2024-01-15T10:00:00Z",
  "updatedAt": "2024-01-15T10:00:00Z"
}
```

---

### Faculty

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/faculty` | Get all faculty members |
| GET | `/faculty/:id` | Get faculty by ID |
| POST | `/faculty` | Create new faculty |
| PUT | `/faculty/:id` | Update faculty |
| DELETE | `/faculty/:id` | Delete faculty |

**Faculty Object:**
```json
{
  "id": "faculty_id",
  "name": "Dr. John Doe",
  "department": "Computer Science",
  "designation": "Professor | Associate Professor | Assistant Professor | Lecturer",
  "qualification": "Ph.D. in Computer Science",
  "email": "john.doe@mcc.edu.in",
  "phone": "9876543210",
  "photoUrl": "https://..../photo.jpg",
  "bio": "Brief biography...",
  "specialization": "Machine Learning, AI",
  "isActive": true,
  "createdAt": "2024-01-15T10:00:00Z",
  "updatedAt": "2024-01-15T10:00:00Z"
}
```

---

### Courses

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/courses` | Get all courses |
| GET | `/courses/:id` | Get course by ID |
| POST | `/courses` | Create new course |
| PUT | `/courses/:id` | Update course |
| DELETE | `/courses/:id` | Delete course |

**Course Object:**
```json
{
  "id": "course_id",
  "name": "Bachelor of Computer Applications",
  "code": "BCA",
  "duration": "3 Years",
  "type": "UG | PG | Diploma | Certificate",
  "department": "Computer Science",
  "description": "Course description...",
  "eligibility": "10+2 with Mathematics",
  "syllabusUrl": "https://..../syllabus.pdf",
  "isActive": true,
  "createdAt": "2024-01-15T10:00:00Z",
  "updatedAt": "2024-01-15T10:00:00Z"
}
```

---

### Examination

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/examination` | Get all exam notices/schedules |
| GET | `/examination/:id` | Get exam by ID |
| POST | `/examination` | Create new exam notice |
| PUT | `/examination/:id` | Update exam notice |
| DELETE | `/examination/:id` | Delete exam notice |

**Examination Object:**
```json
{
  "id": "exam_id",
  "title": "End Semester Examination 2024",
  "type": "Notice | Schedule | Form | Datesheet",
  "date": "2024-02-01",
  "description": "Examination details...",
  "pdfUrl": "https://..../schedule.pdf",
  "isPublished": true,
  "createdAt": "2024-01-15T10:00:00Z",
  "updatedAt": "2024-01-15T10:00:00Z"
}
```

---

### Results

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/results` | Get all results |
| GET | `/results/:id` | Get result by ID |
| POST | `/results` | Create new result |
| PUT | `/results/:id` | Update result |
| DELETE | `/results/:id` | Delete result |

**Result Object:**
```json
{
  "id": "result_id",
  "title": "BCA 6th Semester Results",
  "course": "BCA",
  "semester": "6th Semester",
  "year": "2024",
  "status": "Published | Pending",
  "pdfUrl": "https://..../result.pdf",
  "publishedAt": "2024-01-15T10:00:00Z",
  "createdAt": "2024-01-15T10:00:00Z",
  "updatedAt": "2024-01-15T10:00:00Z"
}
```

---

### Pages (Static Content)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/pages` | Get all pages |
| GET | `/pages/:slug` | Get page by slug |
| PUT | `/pages/:slug` | Update page content |

**Page Object:**
```json
{
  "id": "page_id",
  "slug": "about | home | vision | principal-message",
  "title": "About Us",
  "content": "Page HTML/Markdown content...",
  "metaTitle": "About - Model College Chatra",
  "metaDescription": "Learn about Model College Chatra...",
  "updatedAt": "2024-01-15T10:00:00Z"
}
```

---

### Media Library

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/media` | Get all media files |
| GET | `/media/:id` | Get media by ID |
| POST | `/media/upload` | Upload new file |
| DELETE | `/media/:id` | Delete media file |

**Upload Request:**
```
Content-Type: multipart/form-data

file: <binary>
folder: "images" | "documents" | "general"
alt: "Image description"
```

**Media Object:**
```json
{
  "id": "media_id",
  "filename": "campus-photo.jpg",
  "originalName": "Campus Photo.jpg",
  "mimeType": "image/jpeg",
  "size": 245678,
  "url": "https://..../uploads/campus-photo.jpg",
  "folder": "images",
  "alt": "College campus aerial view",
  "createdAt": "2024-01-15T10:00:00Z"
}
```

---

## Error Handling

All API errors should follow this format:

```json
{
  "success": false,
  "message": "Human-readable error message",
  "errors": [
    {
      "field": "email",
      "message": "Email is required"
    }
  ]
}
```

### HTTP Status Codes

| Code | Description |
|------|-------------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request (validation errors) |
| 401 | Unauthorized (invalid/expired token) |
| 403 | Forbidden (insufficient permissions) |
| 404 | Not Found |
| 500 | Internal Server Error |

---

## CORS Configuration

Your backend should allow requests from the frontend domain:

```javascript
// Express.js example
app.use(cors({
  origin: ['https://your-frontend-domain.com', 'http://localhost:5173'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
```

---

## JWT Token Structure

```json
{
  "sub": "user_id",
  "email": "admin@mcc.edu.in",
  "role": "admin",
  "iat": 1704067200,
  "exp": 1704153600
}
```

**Recommended expiry:** 24 hours

---

## File Upload Limits

- **Images:** Max 5MB, formats: JPG, PNG, WebP
- **Documents:** Max 10MB, formats: PDF, DOC, DOCX
- **General:** Max 20MB

---

## Sample Backend Implementation

A sample Node.js/Express backend implementation is available at:
[GitHub Repository Link - To be added]

---

## Support

For integration support, contact:
- Email: chatramodelcollege@gmail.com
- Phone: 7903462065
