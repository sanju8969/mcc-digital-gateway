import { useState, useEffect } from "react";
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
import { Plus, Search, Edit, Trash2, Upload, Image as ImageIcon, Eye, EyeOff, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { api } from "@/hooks/useApi";

interface Event {
  id: string;
  title: string;
  description: string;
  type: "event" | "news" | "tender" | "press";
  date: string;
  imageUrl?: string;
  published: boolean;
}

const demoEvents: Event[] = [
  { id: "1", title: "Annual Sports Day 2024", description: "Join us for the annual sports day celebration.", type: "event", date: "2024-02-15", imageUrl: "#", published: true },
  { id: "2", title: "New Computer Lab Inaugurated", description: "State-of-the-art computer lab with 50 systems.", type: "news", date: "2024-01-20", imageUrl: "#", published: true },
  { id: "3", title: "Tender for Furniture Supply", description: "Sealed tenders invited for classroom furniture.", type: "tender", date: "2024-01-18", published: true },
  { id: "4", title: "College Featured in State News", description: "MCC recognized for academic excellence.", type: "press", date: "2024-01-12", published: true },
  { id: "5", title: "Upcoming Seminar on AI", description: "Technical seminar on Artificial Intelligence.", type: "event", date: "2024-02-01", published: false },
];

const eventTypes = [
  { value: "event", label: "Events" },
  { value: "news", label: "News" },
  { value: "tender", label: "Tenders" },
  { value: "press", label: "Press" },
];

const DEMO_MODE = !import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_API_BASE_URL === '/api';

export default function AdminEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [deletingEvent, setDeletingEvent] = useState<Event | null>(null);
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "event" as Event["type"],
    date: new Date().toISOString().split("T")[0],
    imageFile: null as File | null,
    published: true,
  });

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    setLoading(true);
    if (DEMO_MODE) {
      await new Promise(resolve => setTimeout(resolve, 500));
      setEvents(demoEvents);
      setLoading(false);
      return;
    }

    const { data, error } = await api.events.getAll();
    if (error) {
      toast.error("Failed to fetch events");
      setEvents(demoEvents);
    } else {
      setEvents(data as Event[] || []);
    }
    setLoading(false);
  };

  const filteredEvents = events.filter((event) => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === "all" || event.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const openCreateDialog = () => {
    setEditingEvent(null);
    setFormData({
      title: "",
      description: "",
      type: "event",
      date: new Date().toISOString().split("T")[0],
      imageFile: null,
      published: true,
    });
    setIsDialogOpen(true);
  };

  const openEditDialog = (event: Event) => {
    setEditingEvent(event);
    setFormData({
      title: event.title,
      description: event.description,
      type: event.type,
      date: event.date,
      imageFile: null,
      published: event.published,
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = async () => {
    if (!formData.title || !formData.description) {
      toast.error("Please fill in all required fields");
      return;
    }

    setSubmitting(true);

    if (DEMO_MODE) {
      await new Promise(resolve => setTimeout(resolve, 500));
      if (editingEvent) {
        setEvents(events.map((e) =>
          e.id === editingEvent.id
            ? { ...e, title: formData.title, description: formData.description, type: formData.type, date: formData.date, published: formData.published }
            : e
        ));
        toast.success("Event updated successfully");
      } else {
        const newEvent: Event = {
          id: Date.now().toString(),
          title: formData.title,
          description: formData.description,
          type: formData.type,
          date: formData.date,
          imageUrl: formData.imageFile ? "#" : undefined,
          published: formData.published,
        };
        setEvents([newEvent, ...events]);
        toast.success("Event created successfully");
      }
      setIsDialogOpen(false);
      setSubmitting(false);
      return;
    }

    const payload = {
      title: formData.title,
      description: formData.description,
      type: formData.type,
      date: formData.date,
      published: formData.published,
    };

    if (editingEvent) {
      const { error } = await api.events.update(editingEvent.id, payload);
      if (error) {
        toast.error("Failed to update event");
      } else {
        await fetchEvents();
        toast.success("Event updated successfully");
        setIsDialogOpen(false);
      }
    } else {
      const { error } = await api.events.create(payload);
      if (error) {
        toast.error("Failed to create event");
      } else {
        await fetchEvents();
        toast.success("Event created successfully");
        setIsDialogOpen(false);
      }
    }
    setSubmitting(false);
  };

  const handleDelete = async () => {
    if (!deletingEvent) return;

    setSubmitting(true);

    if (DEMO_MODE) {
      await new Promise(resolve => setTimeout(resolve, 500));
      setEvents(events.filter((e) => e.id !== deletingEvent.id));
      toast.success("Event deleted successfully");
      setIsDeleteDialogOpen(false);
      setDeletingEvent(null);
      setSubmitting(false);
      return;
    }

    const { error } = await api.events.delete(deletingEvent.id);
    if (error) {
      toast.error("Failed to delete event");
    } else {
      await fetchEvents();
      toast.success("Event deleted successfully");
      setIsDeleteDialogOpen(false);
      setDeletingEvent(null);
    }
    setSubmitting(false);
  };

  const togglePublish = async (event: Event) => {
    if (DEMO_MODE) {
      setEvents(events.map((e) =>
        e.id === event.id ? { ...e, published: !e.published } : e
      ));
      toast.success(event.published ? "Event unpublished" : "Event published");
      return;
    }

    const { error } = await api.events.update(event.id, { published: !event.published });
    if (error) {
      toast.error("Failed to update event");
    } else {
      await fetchEvents();
      toast.success(event.published ? "Event unpublished" : "Event published");
    }
  };

  const getTypeBadgeVariant = (type: Event["type"]) => {
    switch (type) {
      case "event": return "default";
      case "news": return "secondary";
      case "tender": return "outline";
      case "press": return "default";
      default: return "secondary";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Events & News</h1>
          <p className="text-muted-foreground">
            Manage events, news, tenders, and press releases
            {DEMO_MODE && <Badge variant="outline" className="ml-2">Demo Mode</Badge>}
          </p>
        </div>
        <Button onClick={openCreateDialog}>
          <Plus className="mr-2 h-4 w-4" />
          Add Event/News
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search events..."
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
                {eventTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
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
            <CardTitle>All Events & News ({filteredEvents.length})</CardTitle>
            <CardDescription>These items appear in the "Latest Updates" section on the homepage</CardDescription>
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
                    <TableHead>Image</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredEvents.map((event) => (
                    <TableRow key={event.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{event.title}</p>
                          <p className="text-sm text-muted-foreground line-clamp-1">{event.description}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getTypeBadgeVariant(event.type)}>
                          {eventTypes.find(t => t.value === event.type)?.label}
                        </Badge>
                      </TableCell>
                      <TableCell>{event.date}</TableCell>
                      <TableCell>
                        {event.imageUrl ? (
                          <ImageIcon className="h-4 w-4 text-primary" />
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge variant={event.published ? "default" : "outline"}>
                          {event.published ? "Published" : "Draft"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => togglePublish(event)}
                          >
                            {event.published ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => openEditDialog(event)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              setDeletingEvent(event);
                              setIsDeleteDialogOpen(true);
                            }}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                  {filteredEvents.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                        No events found
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
            <DialogTitle>{editingEvent ? "Edit Event/News" : "Create Event/News"}</DialogTitle>
            <DialogDescription>
              {editingEvent ? "Update the details below" : "Fill in the details to create a new entry"}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Enter title"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Enter description"
                rows={3}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="type">Type *</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value) => setFormData({ ...formData, type: value as Event["type"] })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    {eventTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
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
            </div>
            <div className="space-y-2">
              <Label htmlFor="image">Image</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setFormData({ ...formData, imageFile: e.target.files?.[0] || null })}
                  className="flex-1"
                />
                <Upload className="h-4 w-4 text-muted-foreground" />
              </div>
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
            <Button variant="outline" onClick={() => setIsDialogOpen(false)} disabled={submitting}>Cancel</Button>
            <Button onClick={handleSubmit} disabled={submitting}>
              {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {editingEvent ? "Update" : "Create"}
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
              This will permanently delete "{deletingEvent?.title}". This action cannot be undone.
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
