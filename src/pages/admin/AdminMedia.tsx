import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Upload, Search, Trash2, FileText, Image as ImageIcon, File, Copy, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { api } from "@/hooks/useApi";

interface MediaFile {
  id: string;
  name: string;
  type: "image" | "pdf" | "other";
  size: string;
  url: string;
  uploadedAt: string;
}

const demoMedia: MediaFile[] = [
  { id: "1", name: "campus-photo.jpg", type: "image", size: "2.4 MB", url: "#", uploadedAt: "2024-01-15" },
  { id: "2", name: "admission-notice.pdf", type: "pdf", size: "156 KB", url: "#", uploadedAt: "2024-01-14" },
  { id: "3", name: "syllabus-ba.pdf", type: "pdf", size: "890 KB", url: "#", uploadedAt: "2024-01-12" },
  { id: "4", name: "principal.jpg", type: "image", size: "1.2 MB", url: "#", uploadedAt: "2024-01-10" },
];

const DEMO_MODE = !import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_API_BASE_URL === '/api';

export default function AdminMedia() {
  const [media, setMedia] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [deletingFile, setDeletingFile] = useState<MediaFile | null>(null);

  useEffect(() => {
    fetchMedia();
  }, []);

  const fetchMedia = async () => {
    setLoading(true);
    if (DEMO_MODE) {
      await new Promise(resolve => setTimeout(resolve, 500));
      setMedia(demoMedia);
      setLoading(false);
      return;
    }

    const { data, error } = await api.media.getAll();
    if (error) {
      toast.error("Failed to fetch media");
      setMedia(demoMedia);
    } else {
      setMedia(data as MediaFile[] || []);
    }
    setLoading(false);
  };

  const filteredMedia = media.filter(file => file.name.toLowerCase().includes(searchQuery.toLowerCase()));

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    
    setUploading(true);

    if (DEMO_MODE) {
      await new Promise(resolve => setTimeout(resolve, 500));
      Array.from(files).forEach(file => {
        const newFile: MediaFile = {
          id: Date.now().toString(),
          name: file.name,
          type: file.type.startsWith("image") ? "image" : file.type === "application/pdf" ? "pdf" : "other",
          size: `${(file.size / 1024).toFixed(0)} KB`,
          url: "#",
          uploadedAt: new Date().toISOString().split("T")[0],
        };
        setMedia(prev => [newFile, ...prev]);
      });
      toast.success("Files uploaded successfully");
      setUploading(false);
      return;
    }

    for (const file of Array.from(files)) {
      const formData = new FormData();
      formData.append('file', file);
      
      const { error } = await api.media.upload(formData);
      if (error) {
        toast.error(`Failed to upload ${file.name}`);
      }
    }
    
    await fetchMedia();
    toast.success("Files uploaded successfully");
    setUploading(false);
  };

  const handleDelete = async () => {
    if (!deletingFile) return;

    setDeleting(true);

    if (DEMO_MODE) {
      await new Promise(resolve => setTimeout(resolve, 500));
      setMedia(media.filter(f => f.id !== deletingFile.id));
      toast.success("File deleted");
      setDeletingFile(null);
      setDeleting(false);
      return;
    }

    const { error } = await api.media.delete(deletingFile.id);
    if (error) {
      toast.error("Failed to delete file");
    } else {
      await fetchMedia();
      toast.success("File deleted");
      setDeletingFile(null);
    }
    setDeleting(false);
  };

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    toast.success("URL copied to clipboard");
  };

  const getIcon = (type: MediaFile["type"]) => {
    switch (type) {
      case "image": return <ImageIcon className="h-8 w-8 text-green-500" />;
      case "pdf": return <FileText className="h-8 w-8 text-red-500" />;
      default: return <File className="h-8 w-8 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Media Library</h1>
          <p className="text-muted-foreground">
            Upload and manage images and documents
            {DEMO_MODE && <Badge variant="outline" className="ml-2">Demo Mode</Badge>}
          </p>
        </div>
        <label>
          <input type="file" multiple accept="image/*,.pdf" className="hidden" onChange={handleUpload} disabled={uploading} />
          <Button asChild disabled={uploading}>
            <span>
              {uploading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Upload className="mr-2 h-4 w-4" />}
              Upload Files
            </span>
          </Button>
        </label>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search files..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10" />
          </div>
        </CardContent>
      </Card>

      {loading ? (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {filteredMedia.map((file) => (
            <Card key={file.id} className="group">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  {getIcon(file.type)}
                  <p className="mt-2 font-medium text-sm truncate w-full">{file.name}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline" className="text-xs">{file.type.toUpperCase()}</Badge>
                    <span className="text-xs text-muted-foreground">{file.size}</span>
                  </div>
                  <div className="flex gap-2 mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button size="sm" variant="outline" onClick={() => copyUrl(file.url)}>
                      <Copy className="h-3 w-3" />
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => setDeletingFile(file)}>
                      <Trash2 className="h-3 w-3 text-destructive" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          {filteredMedia.length === 0 && (
            <div className="col-span-full text-center py-8 text-muted-foreground">
              No files found
            </div>
          )}
        </div>
      )}

      <AlertDialog open={!!deletingFile} onOpenChange={() => setDeletingFile(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete File?</AlertDialogTitle>
            <AlertDialogDescription>This will permanently delete "{deletingFile?.name}".</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground" disabled={deleting}>
              {deleting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
