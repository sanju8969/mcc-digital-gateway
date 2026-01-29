import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Search, Edit, Trash2, Upload, FileText, BookOpen, GraduationCap, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { api } from "@/hooks/useApi";

interface Course {
  id: string;
  name: string;
  code: string;
  duration: string;
  description: string;
  subjects: string[];
}

interface Syllabus {
  id: string;
  courseId: string;
  courseName: string;
  semester: string;
  title: string;
  pdfUrl: string;
  uploadedAt: string;
}

const demoCourses: Course[] = [
  { id: "1", name: "Bachelor of Arts (BA)", code: "BA", duration: "3 Years", description: "Undergraduate program in Arts and Humanities", subjects: ["English", "Hindi", "History", "Political Science", "Economics"] },
  { id: "2", name: "Bachelor of Science (BSc)", code: "BSC", duration: "3 Years", description: "Undergraduate program in Science", subjects: ["Physics", "Chemistry", "Mathematics", "Botany", "Zoology"] },
  { id: "3", name: "Bachelor of Commerce (BCom)", code: "BCOM", duration: "3 Years", description: "Undergraduate program in Commerce", subjects: ["Accountancy", "Business Studies", "Economics", "Taxation", "Business Law"] },
];

const demoSyllabus: Syllabus[] = [
  { id: "1", courseId: "1", courseName: "BA", semester: "Semester 1", title: "BA Sem-1 Syllabus 2024", pdfUrl: "#", uploadedAt: "2024-01-10" },
  { id: "2", courseId: "1", courseName: "BA", semester: "Semester 2", title: "BA Sem-2 Syllabus 2024", pdfUrl: "#", uploadedAt: "2024-01-10" },
  { id: "3", courseId: "2", courseName: "BSc", semester: "Semester 1", title: "BSc Sem-1 Syllabus 2024", pdfUrl: "#", uploadedAt: "2024-01-10" },
  { id: "4", courseId: "3", courseName: "BCom", semester: "Semester 1", title: "BCom Sem-1 Syllabus 2024", pdfUrl: "#", uploadedAt: "2024-01-10" },
];

const semesters = ["Semester 1", "Semester 2", "Semester 3", "Semester 4", "Semester 5", "Semester 6"];

const DEMO_MODE = !import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_API_BASE_URL === '/api';

export default function AdminCourses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [syllabus, setSyllabus] = useState<Syllabus[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState("courses");
  const [searchQuery, setSearchQuery] = useState("");
  
  const [isCourseDialogOpen, setIsCourseDialogOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [courseFormData, setCourseFormData] = useState({
    name: "",
    code: "",
    duration: "",
    description: "",
    subjects: "",
  });

  const [isSyllabusDialogOpen, setIsSyllabusDialogOpen] = useState(false);
  const [editingSyllabus, setEditingSyllabus] = useState<Syllabus | null>(null);
  const [syllabusFormData, setSyllabusFormData] = useState({
    courseId: "",
    semester: "",
    title: "",
    pdfFile: null as File | null,
  });

  const [deletingCourse, setDeletingCourse] = useState<Course | null>(null);
  const [deletingSyllabus, setDeletingSyllabus] = useState<Syllabus | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    if (DEMO_MODE) {
      await new Promise(resolve => setTimeout(resolve, 500));
      setCourses(demoCourses);
      setSyllabus(demoSyllabus);
      setLoading(false);
      return;
    }

    const { data: coursesData, error: coursesError } = await api.courses.getAll();
    if (coursesError) {
      toast.error("Failed to fetch courses");
      setCourses(demoCourses);
      setSyllabus(demoSyllabus);
    } else {
      setCourses(coursesData as Course[] || []);
    }
    setLoading(false);
  };

  const filteredCourses = courses.filter((course) =>
    course.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredSyllabus = syllabus.filter((s) =>
    s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.courseName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openCourseDialog = (course?: Course) => {
    if (course) {
      setEditingCourse(course);
      setCourseFormData({
        name: course.name,
        code: course.code,
        duration: course.duration,
        description: course.description,
        subjects: course.subjects.join(", "),
      });
    } else {
      setEditingCourse(null);
      setCourseFormData({ name: "", code: "", duration: "", description: "", subjects: "" });
    }
    setIsCourseDialogOpen(true);
  };

  const handleCourseSubmit = async () => {
    if (!courseFormData.name || !courseFormData.code) {
      toast.error("Please fill in required fields");
      return;
    }

    setSubmitting(true);
    const subjectsArray = courseFormData.subjects.split(",").map(s => s.trim()).filter(Boolean);

    if (DEMO_MODE) {
      await new Promise(resolve => setTimeout(resolve, 500));
      if (editingCourse) {
        setCourses(courses.map(c =>
          c.id === editingCourse.id
            ? { ...c, ...courseFormData, subjects: subjectsArray }
            : c
        ));
        toast.success("Course updated successfully");
      } else {
        const newCourse: Course = {
          id: Date.now().toString(),
          ...courseFormData,
          subjects: subjectsArray,
        };
        setCourses([...courses, newCourse]);
        toast.success("Course added successfully");
      }
      setIsCourseDialogOpen(false);
      setSubmitting(false);
      return;
    }

    const payload = { ...courseFormData, subjects: subjectsArray };

    if (editingCourse) {
      const { error } = await api.courses.update(editingCourse.id, payload);
      if (error) {
        toast.error("Failed to update course");
      } else {
        await fetchData();
        toast.success("Course updated successfully");
        setIsCourseDialogOpen(false);
      }
    } else {
      const { error } = await api.courses.create(payload);
      if (error) {
        toast.error("Failed to add course");
      } else {
        await fetchData();
        toast.success("Course added successfully");
        setIsCourseDialogOpen(false);
      }
    }
    setSubmitting(false);
  };

  const handleDeleteCourse = async () => {
    if (!deletingCourse) return;

    setSubmitting(true);

    if (DEMO_MODE) {
      await new Promise(resolve => setTimeout(resolve, 500));
      setCourses(courses.filter(c => c.id !== deletingCourse.id));
      setSyllabus(syllabus.filter(s => s.courseId !== deletingCourse.id));
      toast.success("Course deleted successfully");
      setDeletingCourse(null);
      setSubmitting(false);
      return;
    }

    const { error } = await api.courses.delete(deletingCourse.id);
    if (error) {
      toast.error("Failed to delete course");
    } else {
      await fetchData();
      toast.success("Course deleted successfully");
      setDeletingCourse(null);
    }
    setSubmitting(false);
  };

  const openSyllabusDialog = (item?: Syllabus) => {
    if (item) {
      setEditingSyllabus(item);
      setSyllabusFormData({
        courseId: item.courseId,
        semester: item.semester,
        title: item.title,
        pdfFile: null,
      });
    } else {
      setEditingSyllabus(null);
      setSyllabusFormData({ courseId: "", semester: "", title: "", pdfFile: null });
    }
    setIsSyllabusDialogOpen(true);
  };

  const handleSyllabusSubmit = async () => {
    if (!syllabusFormData.courseId || !syllabusFormData.semester || !syllabusFormData.title) {
      toast.error("Please fill in required fields");
      return;
    }

    setSubmitting(true);
    const course = courses.find(c => c.id === syllabusFormData.courseId);
    if (!course) {
      setSubmitting(false);
      return;
    }

    if (DEMO_MODE) {
      await new Promise(resolve => setTimeout(resolve, 500));
      if (editingSyllabus) {
        setSyllabus(syllabus.map(s =>
          s.id === editingSyllabus.id
            ? { ...s, ...syllabusFormData, courseName: course.code }
            : s
        ));
        toast.success("Syllabus updated successfully");
      } else {
        const newSyllabus: Syllabus = {
          id: Date.now().toString(),
          ...syllabusFormData,
          courseName: course.code,
          pdfUrl: "#",
          uploadedAt: new Date().toISOString().split("T")[0],
        };
        setSyllabus([...syllabus, newSyllabus]);
        toast.success("Syllabus uploaded successfully");
      }
      setIsSyllabusDialogOpen(false);
      setSubmitting(false);
      return;
    }

    // For real API, syllabus would be managed differently
    setIsSyllabusDialogOpen(false);
    setSubmitting(false);
  };

  const handleDeleteSyllabus = async () => {
    if (!deletingSyllabus) return;

    setSubmitting(true);

    if (DEMO_MODE) {
      await new Promise(resolve => setTimeout(resolve, 500));
      setSyllabus(syllabus.filter(s => s.id !== deletingSyllabus.id));
      toast.success("Syllabus deleted successfully");
      setDeletingSyllabus(null);
      setSubmitting(false);
      return;
    }

    setDeletingSyllabus(null);
    setSubmitting(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Courses & Syllabus</h1>
          <p className="text-muted-foreground">
            Manage academic courses and syllabus documents
            {DEMO_MODE && <Badge variant="outline" className="ml-2">Demo Mode</Badge>}
          </p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="courses" className="gap-2">
              <GraduationCap className="h-4 w-4" />
              Courses
            </TabsTrigger>
            <TabsTrigger value="syllabus" className="gap-2">
              <FileText className="h-4 w-4" />
              Syllabus
            </TabsTrigger>
          </TabsList>
          <Button onClick={() => activeTab === "courses" ? openCourseDialog() : openSyllabusDialog()}>
            <Plus className="mr-2 h-4 w-4" />
            {activeTab === "courses" ? "Add Course" : "Upload Syllabus"}
          </Button>
        </div>

        {/* Courses Tab */}
        <TabsContent value="courses" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search courses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardContent>
          </Card>

          {loading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredCourses.map((course) => (
                  <Card key={course.id} className="relative group">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="bg-primary/10 p-2 rounded-lg">
                          <BookOpen className="h-5 w-5 text-primary" />
                        </div>
                        <Badge variant="secondary">{course.code}</Badge>
                      </div>
                      <CardTitle className="text-lg">{course.name}</CardTitle>
                      <CardDescription>{course.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm font-medium">Duration</p>
                          <p className="text-sm text-muted-foreground">{course.duration}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Subjects</p>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {course.subjects.slice(0, 3).map((subject) => (
                              <Badge key={subject} variant="outline" className="text-xs">{subject}</Badge>
                            ))}
                            {course.subjects.length > 3 && (
                              <Badge variant="outline" className="text-xs">+{course.subjects.length - 3}</Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mt-4 pt-4 border-t">
                        <Button variant="outline" size="sm" className="flex-1" onClick={() => openCourseDialog(course)}>
                          <Edit className="h-4 w-4 mr-1" /> Edit
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => setDeletingCourse(course)}>
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>
          )}
        </TabsContent>

        {/* Syllabus Tab */}
        <TabsContent value="syllabus" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search syllabus..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardContent>
          </Card>

          {loading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <Card>
                <CardHeader>
                  <CardTitle>Syllabus Documents ({filteredSyllabus.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Course</TableHead>
                        <TableHead>Semester</TableHead>
                        <TableHead>Uploaded</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredSyllabus.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell className="font-medium">
                            <div className="flex items-center gap-2">
                              <FileText className="h-4 w-4 text-primary" />
                              {item.title}
                            </div>
                          </TableCell>
                          <TableCell><Badge variant="secondary">{item.courseName}</Badge></TableCell>
                          <TableCell>{item.semester}</TableCell>
                          <TableCell>{item.uploadedAt}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end gap-2">
                              <Button variant="ghost" size="icon" onClick={() => openSyllabusDialog(item)}>
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" onClick={() => setDeletingSyllabus(item)}>
                                <Trash2 className="h-4 w-4 text-destructive" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                      {filteredSyllabus.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                            No syllabus documents found
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </TabsContent>
      </Tabs>

      {/* Course Dialog */}
      <Dialog open={isCourseDialogOpen} onOpenChange={setIsCourseDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{editingCourse ? "Edit Course" : "Add Course"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Course Name *</Label>
                <Input
                  value={courseFormData.name}
                  onChange={(e) => setCourseFormData({ ...courseFormData, name: e.target.value })}
                  placeholder="Bachelor of Arts"
                />
              </div>
              <div className="space-y-2">
                <Label>Course Code *</Label>
                <Input
                  value={courseFormData.code}
                  onChange={(e) => setCourseFormData({ ...courseFormData, code: e.target.value })}
                  placeholder="BA"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Duration</Label>
              <Input
                value={courseFormData.duration}
                onChange={(e) => setCourseFormData({ ...courseFormData, duration: e.target.value })}
                placeholder="3 Years"
              />
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea
                value={courseFormData.description}
                onChange={(e) => setCourseFormData({ ...courseFormData, description: e.target.value })}
                placeholder="Brief description of the course"
                rows={2}
              />
            </div>
            <div className="space-y-2">
              <Label>Subjects (comma-separated)</Label>
              <Textarea
                value={courseFormData.subjects}
                onChange={(e) => setCourseFormData({ ...courseFormData, subjects: e.target.value })}
                placeholder="English, Hindi, History, Economics"
                rows={2}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCourseDialogOpen(false)} disabled={submitting}>Cancel</Button>
            <Button onClick={handleCourseSubmit} disabled={submitting}>
              {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {editingCourse ? "Update" : "Add"} Course
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Syllabus Dialog */}
      <Dialog open={isSyllabusDialogOpen} onOpenChange={setIsSyllabusDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{editingSyllabus ? "Edit Syllabus" : "Upload Syllabus"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Course *</Label>
                <Select
                  value={syllabusFormData.courseId}
                  onValueChange={(value) => setSyllabusFormData({ ...syllabusFormData, courseId: value })}
                >
                  <SelectTrigger><SelectValue placeholder="Select course" /></SelectTrigger>
                  <SelectContent>
                    {courses.map((course) => (
                      <SelectItem key={course.id} value={course.id}>{course.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Semester *</Label>
                <Select
                  value={syllabusFormData.semester}
                  onValueChange={(value) => setSyllabusFormData({ ...syllabusFormData, semester: value })}
                >
                  <SelectTrigger><SelectValue placeholder="Select semester" /></SelectTrigger>
                  <SelectContent>
                    {semesters.map((sem) => (
                      <SelectItem key={sem} value={sem}>{sem}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Title *</Label>
              <Input
                value={syllabusFormData.title}
                onChange={(e) => setSyllabusFormData({ ...syllabusFormData, title: e.target.value })}
                placeholder="BA Sem-1 Syllabus 2024"
              />
            </div>
            <div className="space-y-2">
              <Label>PDF File *</Label>
              <div className="flex items-center gap-2">
                <Input
                  type="file"
                  accept=".pdf"
                  onChange={(e) => setSyllabusFormData({ ...syllabusFormData, pdfFile: e.target.files?.[0] || null })}
                />
                <Upload className="h-4 w-4 text-muted-foreground" />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsSyllabusDialogOpen(false)} disabled={submitting}>Cancel</Button>
            <Button onClick={handleSyllabusSubmit} disabled={submitting}>
              {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {editingSyllabus ? "Update" : "Upload"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Course Confirmation */}
      <AlertDialog open={!!deletingCourse} onOpenChange={() => setDeletingCourse(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Course?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete "{deletingCourse?.name}" and all associated syllabus documents.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={submitting}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteCourse} className="bg-destructive text-destructive-foreground" disabled={submitting}>
              {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Delete Syllabus Confirmation */}
      <AlertDialog open={!!deletingSyllabus} onOpenChange={() => setDeletingSyllabus(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Syllabus?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete "{deletingSyllabus?.title}".
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={submitting}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteSyllabus} className="bg-destructive text-destructive-foreground" disabled={submitting}>
              {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
