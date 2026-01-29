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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Edit, Trash2, Upload, FileText, ClipboardList, Calendar, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { api } from "@/hooks/useApi";

interface ExamNotice {
  id: string;
  title: string;
  type: "notice" | "schedule" | "form";
  date: string;
  pdfUrl?: string;
  description?: string;
}

const demoExams: ExamNotice[] = [
  { id: "1", title: "End Semester Examination Notice - May 2024", type: "notice", date: "2024-04-15", pdfUrl: "#" },
  { id: "2", title: "BA/BSc/BCom Semester 4 Exam Schedule", type: "schedule", date: "2024-04-10", pdfUrl: "#" },
  { id: "3", title: "Examination Form - Semester 4", type: "form", date: "2024-04-05", pdfUrl: "#" },
  { id: "4", title: "Practical Examination Schedule 2024", type: "schedule", date: "2024-04-01", pdfUrl: "#" },
  { id: "5", title: "Backlog Examination Form", type: "form", date: "2024-03-25", pdfUrl: "#" },
];

const examTypes = [
  { value: "notice", label: "Exam Notice" },
  { value: "schedule", label: "Exam Schedule" },
  { value: "form", label: "Exam Form" },
];

const DEMO_MODE = !import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_API_BASE_URL === '/api';

export default function AdminExamination() {
  const [exams, setExams] = useState<ExamNotice[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingExam, setEditingExam] = useState<ExamNotice | null>(null);
  const [deletingExam, setDeletingExam] = useState<ExamNotice | null>(null);
  
  const [formData, setFormData] = useState({
    title: "",
    type: "notice" as ExamNotice["type"],
    date: new Date().toISOString().split("T")[0],
    description: "",
    pdfFile: null as File | null,
  });

  useEffect(() => {
    fetchExams();
  }, []);

  const fetchExams = async () => {
    setLoading(true);
    if (DEMO_MODE) {
      await new Promise(resolve => setTimeout(resolve, 500));
      setExams(demoExams);
      setLoading(false);
      return;
    }

    const { data, error } = await api.examination.getAll();
    if (error) {
      toast.error("Failed to fetch examination entries");
      setExams(demoExams);
    } else {
      setExams(data as ExamNotice[] || []);
    }
    setLoading(false);
  };

  const filteredExams = exams.filter((exam) => {
    const matchesSearch = exam.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === "all" || exam.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const openDialog = (exam?: ExamNotice) => {
    if (exam) {
      setEditingExam(exam);
      setFormData({
        title: exam.title,
        type: exam.type,
        date: exam.date,
        description: exam.description || "",
        pdfFile: null,
      });
    } else {
      setEditingExam(null);
      setFormData({
        title: "",
        type: "notice",
        date: new Date().toISOString().split("T")[0],
        description: "",
        pdfFile: null,
      });
    }
    setIsDialogOpen(true);
  };

  const handleSubmit = async () => {
    if (!formData.title) {
      toast.error("Please enter a title");
      return;
    }

    setSubmitting(true);

    if (DEMO_MODE) {
      await new Promise(resolve => setTimeout(resolve, 500));
      if (editingExam) {
        setExams(exams.map(e =>
          e.id === editingExam.id
            ? { ...e, ...formData }
            : e
        ));
        toast.success("Examination entry updated successfully");
      } else {
        const newExam: ExamNotice = {
          id: Date.now().toString(),
          ...formData,
          pdfUrl: formData.pdfFile ? "#" : undefined,
        };
        setExams([newExam, ...exams]);
        toast.success("Examination entry added successfully");
      }
      setIsDialogOpen(false);
      setSubmitting(false);
      return;
    }

    const payload = {
      title: formData.title,
      type: formData.type,
      date: formData.date,
      description: formData.description,
    };

    if (editingExam) {
      const { error } = await api.examination.update(editingExam.id, payload);
      if (error) {
        toast.error("Failed to update examination entry");
      } else {
        await fetchExams();
        toast.success("Examination entry updated successfully");
        setIsDialogOpen(false);
      }
    } else {
      const { error } = await api.examination.create(payload);
      if (error) {
        toast.error("Failed to add examination entry");
      } else {
        await fetchExams();
        toast.success("Examination entry added successfully");
        setIsDialogOpen(false);
      }
    }
    setSubmitting(false);
  };

  const handleDelete = async () => {
    if (!deletingExam) return;

    setSubmitting(true);

    if (DEMO_MODE) {
      await new Promise(resolve => setTimeout(resolve, 500));
      setExams(exams.filter(e => e.id !== deletingExam.id));
      toast.success("Examination entry deleted successfully");
      setDeletingExam(null);
      setSubmitting(false);
      return;
    }

    const { error } = await api.examination.delete(deletingExam.id);
    if (error) {
      toast.error("Failed to delete examination entry");
    } else {
      await fetchExams();
      toast.success("Examination entry deleted successfully");
      setDeletingExam(null);
    }
    setSubmitting(false);
  };

  const getTypeBadge = (type: ExamNotice["type"]) => {
    switch (type) {
      case "notice": return <Badge variant="default">Notice</Badge>;
      case "schedule": return <Badge variant="secondary">Schedule</Badge>;
      case "form": return <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Form</Badge>;
    }
  };

  const getTypeIcon = (type: ExamNotice["type"]) => {
    switch (type) {
      case "notice": return <ClipboardList className="h-4 w-4" />;
      case "schedule": return <Calendar className="h-4 w-4" />;
      case "form": return <FileText className="h-4 w-4" />;
    }
  };

  const stats = {
    total: exams.length,
    notices: exams.filter(e => e.type === "notice").length,
    schedules: exams.filter(e => e.type === "schedule").length,
    forms: exams.filter(e => e.type === "form").length,
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Examination</h1>
          <p className="text-muted-foreground">
            Manage exam notices, schedules, and forms
            {DEMO_MODE && <Badge variant="outline" className="ml-2">Demo Mode</Badge>}
          </p>
        </div>
        <Button onClick={() => openDialog()}>
          <Plus className="mr-2 h-4 w-4" />
          Add Entry
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-2xl font-bold">{stats.total}</p>
              <p className="text-sm text-muted-foreground">Total</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">{stats.notices}</p>
              <p className="text-sm text-muted-foreground">Notices</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-secondary-foreground">{stats.schedules}</p>
              <p className="text-sm text-muted-foreground">Schedules</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">{stats.forms}</p>
              <p className="text-sm text-muted-foreground">Forms</p>
            </div>
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
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {examTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
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
            <CardTitle>Examination Entries ({filteredExams.length})</CardTitle>
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
                    <TableHead>Type</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>PDF</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredExams.map((exam) => (
                    <TableRow key={exam.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getTypeIcon(exam.type)}
                          <span className="font-medium">{exam.title}</span>
                        </div>
                      </TableCell>
                      <TableCell>{getTypeBadge(exam.type)}</TableCell>
                      <TableCell>{exam.date}</TableCell>
                      <TableCell>
                        {exam.pdfUrl ? (
                          <FileText className="h-4 w-4 text-primary" />
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="icon" onClick={() => openDialog(exam)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => setDeletingExam(exam)}>
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                  {filteredExams.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                        No examination entries found
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
            <DialogTitle>{editingExam ? "Edit Entry" : "Add Examination Entry"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Title *</Label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Enter title"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Type *</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value) => setFormData({ ...formData, type: value as ExamNotice["type"] })}
                >
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {examTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Date</Label>
                <Input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Optional description"
                rows={2}
              />
            </div>
            <div className="space-y-2">
              <Label>PDF File</Label>
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
              {editingExam ? "Update" : "Add"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deletingExam} onOpenChange={() => setDeletingExam(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Entry?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete "{deletingExam?.title}".
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
