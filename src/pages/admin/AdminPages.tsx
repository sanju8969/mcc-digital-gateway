import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Save, FileText } from "lucide-react";
import { toast } from "sonner";

const initialPages = {
  home: { title: "Home", content: "Welcome to Model College, Chatra..." },
  about: { title: "About Us", content: "Model College, Chatra is a premier institution..." },
  vision: { title: "Vision & Mission", content: "To provide quality education..." },
  principal: { title: "Principal's Message", content: "Dear Students and Parents..." },
};

export default function AdminPages() {
  const [pages, setPages] = useState(initialPages);
  const [activeTab, setActiveTab] = useState("home");

  const handleSave = (pageKey: string) => {
    // TODO: API call to save page content
    toast.success(`${pages[pageKey as keyof typeof pages].title} content saved`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Pages Content</h1>
        <p className="text-muted-foreground">Edit website page content using rich text</p>
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
                <Button onClick={() => handleSave(key)}>
                  <Save className="mr-2 h-4 w-4" />
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
