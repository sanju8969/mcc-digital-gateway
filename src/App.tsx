import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";

// Public pages
import Index from "./pages/Index";
import About from "./pages/About";
import Admission from "./pages/Admission";
import Academics from "./pages/Academics";
import Faculty from "./pages/Faculty";
import Examination from "./pages/Examination";
import Result from "./pages/Result";
import Library from "./pages/Library";
import Research from "./pages/Research";
import Placement from "./pages/Placement";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

// Admin pages
import { AdminLayout } from "@/components/admin/AdminLayout";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminResetPassword from "./pages/admin/AdminResetPassword";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminNotices from "./pages/admin/AdminNotices";
import AdminEvents from "./pages/admin/AdminEvents";
import AdminFaculty from "./pages/admin/AdminFaculty";
import AdminCourses from "./pages/admin/AdminCourses";
import AdminExamination from "./pages/admin/AdminExamination";
import AdminResults from "./pages/admin/AdminResults";
import AdminPages from "./pages/admin/AdminPages";
import AdminMedia from "./pages/admin/AdminMedia";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/admission" element={<Admission />} />
            <Route path="/academics" element={<Academics />} />
            <Route path="/faculty" element={<Faculty />} />
            <Route path="/examination" element={<Examination />} />
            <Route path="/result" element={<Result />} />
            <Route path="/library" element={<Library />} />
            <Route path="/research" element={<Research />} />
            <Route path="/placement" element={<Placement />} />
            <Route path="/contact" element={<Contact />} />

            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/reset-password" element={<AdminResetPassword />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="notices" element={<AdminNotices />} />
              <Route path="events" element={<AdminEvents />} />
              <Route path="faculty" element={<AdminFaculty />} />
              <Route path="courses" element={<AdminCourses />} />
              <Route path="examination" element={<AdminExamination />} />
              <Route path="results" element={<AdminResults />} />
              <Route path="pages" element={<AdminPages />} />
              <Route path="media" element={<AdminMedia />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
