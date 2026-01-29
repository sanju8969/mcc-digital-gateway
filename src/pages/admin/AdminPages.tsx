import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Save, FileText, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { api } from "@/hooks/useApi";

interface PageContent {
  title: string;
  content: string;
}

const demoPages: Record<string, PageContent> = {
  home: { title: "Home", content: "Welcome to Model College, Chatra..." },
  about: { title: "About Us", content: "Model College, Chatra is a premier institution..." },
  vision: { title: "Vision & Mission", content: "To provide quality education..." },
  principal: { title: "Principal's Message", content: "Dear Students and Parents..." },
};

const DEMO_MODE = !import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_API_BASE_URL === '/api';

export default function AdminPages() {
  const [pages, setPages] = useState<Record<string, PageContent>>(demoPages);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("home");

  useEffect(() => {
    fetchPages();
  }, []);

  const fetchPages = async () => {
    setLoading(true);
    if (DEMO_MODE) {
      await new Promise(resolve => setTimeout(resolve, 500));
      setPages(demoPages);
      setLoading(false);
      return;
    }

    const { data, error } = await api.pages.getAll();
    if (error) {
      toast.error("Failed to fetch pages");
      setPages(demoPages);
    } else {
      setPages(data as Record<string, PageContent> || demoPages);
    }
    setLoading(false);
  };

  const handleSave = async (pageKey: string) => {
    setSaving(pageKey);

    if (DEMO_MODE) {
      await new Promise(resolve => setTimeout(resolve, 500));
      toast.success(`${pages[pageKey].title} content saved`);
      setSaving(null);
      return;
    }

    const { error } = await api.pages.update(pageKey, { content: pages[pageKey].content });
    if (error) {
      toast.error("Failed to save page content");
    } else {
      toast.success(`${pages[pageKey].title} content saved`);
    }
    setSaving(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Pages Content</h1>
        <p className="text-muted-foreground">
          Edit website page content using rich text
          {DEMO_MODE && <Badge variant="outline" className="ml-2">Demo Mode</Badge>}
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          {Object.entries(pages).map(([key, page]) => (
            <TabsTrigger key={key} value={key}>{page.title}</TabsTrigger>
          ))}
        </TabsList>

        {Object.entries(pages).map(([key, page]) => (
          <TabsContent key={key} value={key}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  {page.title}
                </CardTitle>
                <CardDescription>Edit the content for this page</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  value={page.content}
                  onChange={(e) => setPages({ ...pages, [key]: { ...page, content: e.target.value } })}
                  rows={12}
                  placeholder="Enter page content..."
                  className="font-mono"
                />
                <Button onClick={() => handleSave(key)} disabled={saving === key}>
                  {saving === key ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Save className="mr-2 h-4 w-4" />
                  )}
                  Save Changes
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
