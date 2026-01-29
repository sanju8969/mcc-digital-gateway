import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Edit, Trash2, Upload, FileText, ExternalLink, GraduationCap, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { api } from "@/hooks/useApi";

interface Result {
  id: string;
  title: string;
  course: string;
  semester: string;
  year: string;
  status: "published" | "processing";
  pdfUrl?: string;
  publishedAt: string;
}

const demoResults: Result[] = [
  { id: "1", title: "B.Sc Semester 4 Results", course: "BSc", semester: "Semester 4", year: "2024", status: "published", pdfUrl: "#", publishedAt: "2024-01-15" },
  { id: "2", title: "B.A Semester 4 Results", course: "BA", semester: "Semester 4", year: "2024", status: "published", pdfUrl: "#", publishedAt: "2024-01-14" },
  { id: "3", title: "B.Com Semester 4 Results", course: "BCom", semester: "Semester 4", year: "2024", status: "processing", publishedAt: "2024-01-13" },
  { id: "4", title: "B.Sc Semester 2 Results", course: "BSc", semester: "Semester 2", year: "2024", status: "published", pdfUrl: "#", publishedAt: "2024-01-10" },
  { id: "5", title: "Backlog Examination Results", course: "All", semester: "Backlog", year: "2023", status: "published", pdfUrl: "#", publishedAt: "2024-01-05" },
];

const courses = ["All", "BA", "BSc", "BCom"];
const semesters = ["Semester 1", "Semester 2", "Semester 3", "Semester 4", "Semester 5", "Semester 6", "Backlog"];
const years = ["2024", "2023", "2022", "2021"];

const DEMO_MODE = !import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_API_BASE_URL === '/api';

export default function AdminResults() {
  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [courseFilter, setCourseFilter] = useState("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingResult, setEditingResult] = useState<Result | null>(null);
  const [deletingResult, setDeletingResult] = useState<Result | null>(null);
  
  const [formData, setFormData] = useState({
    title: "",
    course: "",
    semester: "",
    year: new Date().getFullYear().toString(),
    status: "published" as Result["status"],
    pdfFile: null as File | null,
  });

  useEffect(() => {
    fetchResults();
  }, []);

  const fetchResults = async () => {
    setLoading(true);
    if (DEMO_MODE) {
      await new Promise(resolve => setTimeout(resolve, 500));
      setResults(demoResults);
      setLoading(false);
      return;
    }

    const { data, error } = await api.results.getAll();
    if (error) {
      toast.error("Failed to fetch results");
      setResults(demoResults);
    } else {
      setResults(data as Result[] || []);
    }
    setLoading(false);
  };

  const filteredResults = results.filter((result) => {
    const matchesSearch = result.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCourse = courseFilter === "all" || result.course === courseFilter;
    return matchesSearch && matchesCourse;
  });

  const openDialog = (result?: Result) => {
    if (result) {
      setEditingResult(result);
      setFormData({
        title: result.title,
        course: result.course,
        semester: result.semester,
        year: result.year,
        status: result.status,
        pdfFile: null,
      });
    } else {
      setEditingResult(null);
      setFormData({
        title: "",
        course: "",
        semester: "",
        year: new Date().getFullYear().toString(),
        status: "published",
        pdfFile: null,
      });
    }
    setIsDialogOpen(true);
  };

  const handleSubmit = async () => {
    if (!formData.title || !formData.course || !formData.semester) {
      toast.error("Please fill in required fields");
      return;
    }

    setSubmitting(true);

    if (DEMO_MODE) {
      await new Promise(resolve => setTimeout(resolve, 500));
      if (editingResult) {
        setResults(results.map(r =>
          r.id === editingResult.id
            ? { ...r, ...formData, pdfUrl: formData.pdfFile ? "#" : r.pdfUrl }
            : r
        ));
        toast.success("Result updated successfully");
      } else {
        const newResult: Result = {
          id: Date.now().toString(),
          ...formData,
          pdfUrl: formData.pdfFile ? "#" : undefined,
          publishedAt: new Date().toISOString().split("T")[0],
        };
        setResults([newResult, ...results]);
        toast.success("Result uploaded successfully");
      }
      setIsDialogOpen(false);
      setSubmitting(false);
      return;
    }

    const payload = {
      title: formData.title,
      course: formData.course,
      semester: formData.semester,
      year: formData.year,
      status: formData.status,
    };

    if (editingResult) {
      const { error } = await api.results.update(editingResult.id, payload);
      if (error) {
        toast.error("Failed to update result");
      } else {
        await fetchResults();
        toast.success("Result updated successfully");
        setIsDialogOpen(false);
      }
    } else {
      const { error } = await api.results.create(payload);
      if (error) {
        toast.error("Failed to upload result");
      } else {
        await fetchResults();
        toast.success("Result uploaded successfully");
        setIsDialogOpen(false);
      }
    }
    setSubmitting(false);
  };

  const handleDelete = async () => {
    if (!deletingResult) return;

    setSubmitting(true);

    if (DEMO_MODE) {
      await new Promise(resolve => setTimeout(resolve, 500));
      setResults(results.filter(r => r.id !== deletingResult.id));
      toast.success("Result deleted successfully");
      setDeletingResult(null);
      setSubmitting(false);
      return;
    }

    const { error } = await api.results.delete(deletingResult.id);
    if (error) {
      toast.error("Failed to delete result");
    } else {
      await fetchResults();
      toast.success("Result deleted successfully");
      setDeletingResult(null);
    }
    setSubmitting(false);
  };

  const stats = {
    total: results.length,
    published: results.filter(r => r.status === "published").length,
    processing: results.filter(r => r.status === "processing").length,
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Results</h1>
          <p className="text-muted-foreground">
            Manage examination results and publish PDFs
            {DEMO_MODE && <Badge variant="outline" className="ml-2">Demo Mode</Badge>}
          </p>
        </div>
        <Button onClick={() => openDialog()}>
          <Plus className="mr-2 h-4 w-4" />
          Upload Result
        </Button>
      </div>

      {/* Stats & University Link */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="bg-primary/10 p-3 rounded-lg">
                <GraduationCap className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Results</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="bg-green-100 p-3 rounded-lg">
                <FileText className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Published</p>
                <p className="text-2xl font-bold">{stats.published}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="bg-orange-100 p-3 rounded-lg">
                <FileText className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Processing</p>
                <p className="text-2xl font-bold">{stats.processing}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-primary text-primary-foreground">
          <CardContent className="pt-6">
            <a
              href="https://www.vbu.ac.in/results"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 hover:opacity-90"
            >
              <div className="bg-white/20 p-3 rounded-lg">
                <ExternalLink className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm opacity-90">VBU Result</p>
                <p className="font-semibold">University Portal →</p>
              </div>
            </a>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search results..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={courseFilter} onValueChange={setCourseFilter}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Course" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Courses</SelectItem>
                {courses.map((course) => (
                  <SelectItem key={course} value={course}>{course}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Card>
          <CardHeader>
            <CardTitle>All Results ({filteredResults.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Course</TableHead>
                    <TableHead>Semester</TableHead>
                    <TableHead>Year</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Published</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredResults.map((result) => (
                    <TableRow key={result.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-primary" />
                          <span className="font-medium">{result.title}</span>
                        </div>
                      </TableCell>
                      <TableCell><Badge variant="secondary">{result.course}</Badge></TableCell>
                      <TableCell>{result.semester}</TableCell>
                      <TableCell>{result.year}</TableCell>
                      <TableCell>
                        <Badge variant={result.status === "published" ? "default" : "outline"}>
                          {result.status === "published" ? "Published" : "Processing"}
                        </Badge>
                      </TableCell>
                      <TableCell>{result.publishedAt}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="icon" onClick={() => openDialog(result)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => setDeletingResult(result)}>
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                  {filteredResults.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                        No results found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Create/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{editingResult ? "Edit Result" : "Upload Result"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Title *</Label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="B.Sc Semester 4 Results"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Course *</Label>
                <Select
                  value={formData.course}
                  onValueChange={(value) => setFormData({ ...formData, course: value })}
                >
                  <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                  <SelectContent>
                    {courses.map((course) => (
                      <SelectItem key={course} value={course}>{course}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Semester *</Label>
                <Select
                  value={formData.semester}
                  onValueChange={(value) => setFormData({ ...formData, semester: value })}
                >
                  <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                  <SelectContent>
                    {semesters.map((sem) => (
                      <SelectItem key={sem} value={sem}>{sem}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Year</Label>
                <Select
                  value={formData.year}
                  onValueChange={(value) => setFormData({ ...formData, year: value })}
                >
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {years.map((year) => (
                      <SelectItem key={year} value={year}>{year}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => setFormData({ ...formData, status: value as Result["status"] })}
                >
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="processing">Processing</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Result PDF</Label>
              <div className="flex items-center gap-2">
                <Input
                  type="file"
                  accept=".pdf"
                  onChange={(e) => setFormData({ ...formData, pdfFile: e.target.files?.[0] || null })}
                />
                <Upload className="h-4 w-4 text-muted-foreground" />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)} disabled={submitting}>Cancel</Button>
            <Button onClick={handleSubmit} disabled={submitting}>
              {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {editingResult ? "Update" : "Upload"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deletingResult} onOpenChange={() => setDeletingResult(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Result?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete "{deletingResult?.title}".
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={submitting}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground" disabled={submitting}>
              {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
