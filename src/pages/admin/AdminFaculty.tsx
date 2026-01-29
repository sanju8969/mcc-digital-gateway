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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Plus, Search, Edit, Trash2, Upload, Users, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { api } from "@/hooks/useApi";

interface FacultyMember {
  id: string;
  name: string;
  department: string;
  designation: string;
  qualification: string;
  email: string;
  phone?: string;
  photoUrl?: string;
  type: "teaching" | "non-teaching";
}

const demoFaculty: FacultyMember[] = [
  { id: "1", name: "Dr. Rajesh Kumar", department: "Physics", designation: "Associate Professor & HOD", qualification: "Ph.D. in Physics", email: "rajesh@mcc.edu.in", type: "teaching" },
  { id: "2", name: "Dr. Sunita Devi", department: "Chemistry", designation: "Assistant Professor", qualification: "Ph.D. in Chemistry", email: "sunita@mcc.edu.in", type: "teaching" },
  { id: "3", name: "Prof. Amit Singh", department: "Mathematics", designation: "Professor & HOD", qualification: "M.Sc., Ph.D.", email: "amit@mcc.edu.in", type: "teaching" },
  { id: "4", name: "Shri Ramesh Prasad", department: "Administration", designation: "Head Clerk", qualification: "B.A.", email: "ramesh@mcc.edu.in", type: "non-teaching" },
  { id: "5", name: "Smt. Meera Kumari", department: "Library", designation: "Librarian", qualification: "M.Lib.Sc.", email: "meera@mcc.edu.in", type: "non-teaching" },
];

const departments = ["Physics", "Chemistry", "Mathematics", "English", "Hindi", "History", "Political Science", "Economics", "Commerce", "Botany", "Zoology", "Administration", "Library", "Accounts"];
const designations = ["Professor", "Associate Professor", "Assistant Professor", "HOD", "Lecturer", "Lab Assistant", "Head Clerk", "Clerk", "Librarian", "Accountant", "Peon", "Security"];

const DEMO_MODE = !import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_API_BASE_URL === '/api';

export default function AdminFaculty() {
  const [faculty, setFaculty] = useState<FacultyMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [deptFilter, setDeptFilter] = useState("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<FacultyMember | null>(null);
  const [deletingMember, setDeletingMember] = useState<FacultyMember | null>(null);
  
  const [formData, setFormData] = useState({
    name: "",
    department: "",
    designation: "",
    qualification: "",
    email: "",
    phone: "",
    photoFile: null as File | null,
    type: "teaching" as FacultyMember["type"],
  });

  useEffect(() => {
    fetchFaculty();
  }, []);

  const fetchFaculty = async () => {
    setLoading(true);
    if (DEMO_MODE) {
      await new Promise(resolve => setTimeout(resolve, 500));
      setFaculty(demoFaculty);
      setLoading(false);
      return;
    }

    const { data, error } = await api.faculty.getAll();
    if (error) {
      toast.error("Failed to fetch faculty");
      setFaculty(demoFaculty);
    } else {
      setFaculty(data as FacultyMember[] || []);
    }
    setLoading(false);
  };

  const filteredFaculty = faculty.filter((member) => {
    const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          member.department.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === "all" || member.type === typeFilter;
    const matchesDept = deptFilter === "all" || member.department === deptFilter;
    return matchesSearch && matchesType && matchesDept;
  });

  const openCreateDialog = () => {
    setEditingMember(null);
    setFormData({
      name: "",
      department: "",
      designation: "",
      qualification: "",
      email: "",
      phone: "",
      photoFile: null,
      type: "teaching",
    });
    setIsDialogOpen(true);
  };

  const openEditDialog = (member: FacultyMember) => {
    setEditingMember(member);
    setFormData({
      name: member.name,
      department: member.department,
      designation: member.designation,
      qualification: member.qualification,
      email: member.email,
      phone: member.phone || "",
      photoFile: null,
      type: member.type,
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.department || !formData.designation || !formData.email) {
      toast.error("Please fill in all required fields");
      return;
    }

    setSubmitting(true);

    if (DEMO_MODE) {
      await new Promise(resolve => setTimeout(resolve, 500));
      if (editingMember) {
        setFaculty(faculty.map((m) =>
          m.id === editingMember.id
            ? { ...m, ...formData, phone: formData.phone || undefined }
            : m
        ));
        toast.success("Faculty member updated successfully");
      } else {
        const newMember: FacultyMember = {
          id: Date.now().toString(),
          ...formData,
          phone: formData.phone || undefined,
          photoUrl: formData.photoFile ? "#" : undefined,
        };
        setFaculty([newMember, ...faculty]);
        toast.success("Faculty member added successfully");
      }
      setIsDialogOpen(false);
      setSubmitting(false);
      return;
    }

    const payload = {
      name: formData.name,
      department: formData.department,
      designation: formData.designation,
      qualification: formData.qualification,
      email: formData.email,
      phone: formData.phone || undefined,
      type: formData.type,
    };

    if (editingMember) {
      const { error } = await api.faculty.update(editingMember.id, payload);
      if (error) {
        toast.error("Failed to update faculty member");
      } else {
        await fetchFaculty();
        toast.success("Faculty member updated successfully");
        setIsDialogOpen(false);
      }
    } else {
      const { error } = await api.faculty.create(payload);
      if (error) {
        toast.error("Failed to add faculty member");
      } else {
        await fetchFaculty();
        toast.success("Faculty member added successfully");
        setIsDialogOpen(false);
      }
    }
    setSubmitting(false);
  };

  const handleDelete = async () => {
    if (!deletingMember) return;

    setSubmitting(true);

    if (DEMO_MODE) {
      await new Promise(resolve => setTimeout(resolve, 500));
      setFaculty(faculty.filter((m) => m.id !== deletingMember.id));
      toast.success("Faculty member deleted successfully");
      setIsDeleteDialogOpen(false);
      setDeletingMember(null);
      setSubmitting(false);
      return;
    }

    const { error } = await api.faculty.delete(deletingMember.id);
    if (error) {
      toast.error("Failed to delete faculty member");
    } else {
      await fetchFaculty();
      toast.success("Faculty member deleted successfully");
      setIsDeleteDialogOpen(false);
      setDeletingMember(null);
    }
    setSubmitting(false);
  };

  const getInitials = (name: string) => {
    return name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Faculty & Staff</h1>
          <p className="text-muted-foreground">
            Manage teaching and non-teaching staff
            {DEMO_MODE && <Badge variant="outline" className="ml-2">Demo Mode</Badge>}
          </p>
        </div>
        <Button onClick={openCreateDialog}>
          <Plus className="mr-2 h-4 w-4" />
          Add Member
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="bg-primary/10 p-3 rounded-lg">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Staff</p>
                <p className="text-2xl font-bold">{faculty.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="bg-green-100 p-3 rounded-lg">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Teaching</p>
                <p className="text-2xl font-bold">{faculty.filter(f => f.type === "teaching").length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="bg-orange-100 p-3 rounded-lg">
                <Users className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Non-Teaching</p>
                <p className="text-2xl font-bold">{faculty.filter(f => f.type === "non-teaching").length}</p>
              </div>
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
                placeholder="Search by name or department..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Staff type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="teaching">Teaching</SelectItem>
                <SelectItem value="non-teaching">Non-Teaching</SelectItem>
              </SelectContent>
            </Select>
            <Select value={deptFilter} onValueChange={setDeptFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                {departments.map((dept) => (
                  <SelectItem key={dept} value={dept}>{dept}</SelectItem>
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
            <CardTitle>All Faculty & Staff ({filteredFaculty.length})</CardTitle>
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
                    <TableHead>Name</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Designation</TableHead>
                    <TableHead>Qualification</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredFaculty.map((member) => (
                    <TableRow key={member.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={member.photoUrl} />
                            <AvatarFallback>{getInitials(member.name)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{member.name}</p>
                            <p className="text-sm text-muted-foreground">{member.email}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{member.department}</TableCell>
                      <TableCell>{member.designation}</TableCell>
                      <TableCell>{member.qualification}</TableCell>
                      <TableCell>
                        <Badge variant={member.type === "teaching" ? "default" : "secondary"}>
                          {member.type === "teaching" ? "Teaching" : "Non-Teaching"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="icon" onClick={() => openEditDialog(member)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              setDeletingMember(member);
                              setIsDeleteDialogOpen(true);
                            }}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                  {filteredFaculty.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                        No faculty members found
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
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>{editingMember ? "Edit Faculty Member" : "Add Faculty Member"}</DialogTitle>
            <DialogDescription>
              {editingMember ? "Update the member details" : "Add a new faculty or staff member"}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Dr. Rajesh Kumar"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Staff Type *</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value) => setFormData({ ...formData, type: value as FacultyMember["type"] })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="teaching">Teaching</SelectItem>
                    <SelectItem value="non-teaching">Non-Teaching</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="department">Department *</Label>
                <Select
                  value={formData.department}
                  onValueChange={(value) => setFormData({ ...formData, department: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map((dept) => (
                      <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="designation">Designation *</Label>
                <Select
                  value={formData.designation}
                  onValueChange={(value) => setFormData({ ...formData, designation: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select designation" />
                  </SelectTrigger>
                  <SelectContent>
                    {designations.map((desig) => (
                      <SelectItem key={desig} value={desig}>{desig}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="qualification">Qualification *</Label>
              <Input
                id="qualification"
                value={formData.qualification}
                onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                placeholder="Ph.D. in Physics"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="email@mcc.edu.in"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="9876543210"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="photo">Photo</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="photo"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setFormData({ ...formData, photoFile: e.target.files?.[0] || null })}
                  className="flex-1"
                />
                <Upload className="h-4 w-4 text-muted-foreground" />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)} disabled={submitting}>Cancel</Button>
            <Button onClick={handleSubmit} disabled={submitting}>
              {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {editingMember ? "Update" : "Add"} Member
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Faculty Member?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete "{deletingMember?.name}". This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={submitting}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90" disabled={submitting}>
              {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
