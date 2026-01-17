import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
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
  DialogDescription,
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
import { Plus, Search, Edit, Trash2, Upload, FileText, Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

interface Notice {
  id: string;
  title: string;
  category: string;
  date: string;
  pdfUrl?: string;
  published: boolean;
}

// Mock data - replace with API calls
const initialNotices: Notice[] = [
  { id: "1", title: "Admission Notice 2024-25", category: "Admission", date: "2024-01-15", pdfUrl: "#", published: true },
  { id: "2", title: "Semester Examination Schedule", category: "Examination", date: "2024-01-10", pdfUrl: "#", published: true },
  { id: "3", title: "Holiday Notice - Republic Day", category: "General", date: "2024-01-08", published: true },
  { id: "4", title: "Library Timing Change", category: "Academic", date: "2024-01-05", published: false },
  { id: "5", title: "Fee Payment Deadline Extended", category: "Admission", date: "2024-01-03", pdfUrl: "#", published: true },
];

const categories = ["General", "Admission", "Examination", "Academic", "Administrative", "Sports", "Cultural"];

export default function AdminNotices() {
  const [notices, setNotices] = useState<Notice[]>(initialNotices);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editingNotice, setEditingNotice] = useState<Notice | null>(null);
  const [deletingNotice, setDeletingNotice] = useState<Notice | null>(null);
  
  // Form state
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    date: new Date().toISOString().split("T")[0],
    pdfFile: null as File | null,
    published: true,
  });

  const filteredNotices = notices.filter((notice) => {
    const matchesSearch = notice.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === "all" || notice.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const openCreateDialog = () => {
    setEditingNotice(null);
    setFormData({
      title: "",
      category: "",
      date: new Date().toISOString().split("T")[0],
      pdfFile: null,
      published: true,
    });
    setIsDialogOpen(true);
  };

  const openEditDialog = (notice: Notice) => {
    setEditingNotice(notice);
    setFormData({
      title: notice.title,
      category: notice.category,
      date: notice.date,
      pdfFile: null,
      published: notice.published,
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = async () => {
    if (!formData.title || !formData.category) {
      toast.error("Please fill in all required fields");
      return;
    }

    // TODO: Replace with actual API call
    // const formDataToSend = new FormData();
    // formDataToSend.append('title', formData.title);
    // formDataToSend.append('category', formData.category);
    // formDataToSend.append('date', formData.date);
    // formDataToSend.append('published', formData.published.toString());
    // if (formData.pdfFile) formDataToSend.append('pdf', formData.pdfFile);
    // await api.notices.create(formDataToSend) or api.notices.update(id, formDataToSend);

    if (editingNotice) {
      setNotices(notices.map((n) =>
        n.id === editingNotice.id
          ? { ...n, title: formData.title, category: formData.category, date: formData.date, published: formData.published }
          : n
      ));
      toast.success("Notice updated successfully");
    } else {
      const newNotice: Notice = {
        id: Date.now().toString(),
        title: formData.title,
        category: formData.category,
        date: formData.date,
        pdfUrl: formData.pdfFile ? "#" : undefined,
        published: formData.published,
      };
      setNotices([newNotice, ...notices]);
      toast.success("Notice created successfully");
    }

    setIsDialogOpen(false);
  };

  const handleDelete = async () => {
    if (!deletingNotice) return;

    // TODO: Replace with actual API call
    // await api.notices.delete(deletingNotice.id);

    setNotices(notices.filter((n) => n.id !== deletingNotice.id));
    toast.success("Notice deleted successfully");
    setIsDeleteDialogOpen(false);
    setDeletingNotice(null);
  };

  const togglePublish = async (notice: Notice) => {
    // TODO: Replace with actual API call
    // await api.notices.update(notice.id, { published: !notice.published });

    setNotices(notices.map((n) =>
      n.id === notice.id ? { ...n, published: !n.published } : n
    ));
    toast.success(notice.published ? "Notice unpublished" : "Notice published");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Notices</h1>
          <p className="text-muted-foreground">Manage all notices and announcements</p>
        </div>
        <Button onClick={openCreateDialog}>
          <Plus className="mr-2 h-4 w-4" />
          Add Notice
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search notices..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>All Notices ({filteredNotices.length})</CardTitle>
            <CardDescription>Click on a notice to edit or delete it</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>PDF</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredNotices.map((notice) => (
                  <TableRow key={notice.id}>
                    <TableCell className="font-medium">{notice.title}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{notice.category}</Badge>
                    </TableCell>
                    <TableCell>{notice.date}</TableCell>
                    <TableCell>
                      {notice.pdfUrl ? (
                        <FileText className="h-4 w-4 text-primary" />
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge variant={notice.published ? "default" : "outline"}>
                        {notice.published ? "Published" : "Draft"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => togglePublish(notice)}
                          title={notice.published ? "Unpublish" : "Publish"}
                        >
                          {notice.published ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => openEditDialog(notice)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            setDeletingNotice(notice);
                            setIsDeleteDialogOpen(true);
                          }}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredNotices.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                      No notices found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </motion.div>

      {/* Create/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{editingNotice ? "Edit Notice" : "Create Notice"}</DialogTitle>
            <DialogDescription>
              {editingNotice ? "Update the notice details below" : "Fill in the details to create a new notice"}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Enter notice title"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pdf">PDF Attachment</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="pdf"
                  type="file"
                  accept=".pdf"
                  onChange={(e) => setFormData({ ...formData, pdfFile: e.target.files?.[0] || null })}
                  className="flex-1"
                />
                <Upload className="h-4 w-4 text-muted-foreground" />
              </div>
              {editingNotice?.pdfUrl && (
                <p className="text-xs text-muted-foreground">Current PDF attached. Upload new to replace.</p>
              )}
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="published">Publish immediately</Label>
              <Switch
                id="published"
                checked={formData.published}
                onCheckedChange={(checked) => setFormData({ ...formData, published: checked })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>
              {editingNotice ? "Update Notice" : "Create Notice"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the notice "{deletingNotice?.title}". This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
