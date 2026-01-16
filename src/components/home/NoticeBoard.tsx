import { motion } from "framer-motion";
import { Bell, Calendar, FileText, Newspaper, ChevronRight } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const notices = [
  { id: 1, title: "Admission Open for Session 2025-26", date: "15 Jan 2026", type: "important" },
  { id: 2, title: "Last date for UG Form Submission Extended", date: "12 Jan 2026", type: "normal" },
  { id: 3, title: "Semester Examination Schedule Released", date: "10 Jan 2026", type: "exam" },
  { id: 4, title: "Winter Vacation Notice - Dec 25 to Jan 1", date: "20 Dec 2025", type: "normal" },
  { id: 5, title: "Faculty Recruitment Notification", date: "18 Dec 2025", type: "recruitment" },
];

const events = [
  { id: 1, title: "Annual Sports Day 2026", date: "25 Jan 2026" },
  { id: 2, title: "National Youth Day Celebration", date: "12 Jan 2026" },
  { id: 3, title: "Republic Day Celebration", date: "26 Jan 2026" },
  { id: 4, title: "Cultural Fest 'Tarang 2026'", date: "Feb 2026" },
];

const tenders = [
  { id: 1, title: "Tender for Computer Lab Equipment", date: "20 Jan 2026" },
  { id: 2, title: "Furniture Supply for New Building", date: "15 Jan 2026" },
  { id: 3, title: "Annual Maintenance Contract - Electrical", date: "10 Jan 2026" },
];

const news = [
  { id: 1, title: "MCC Students Excel in University Exams", date: "14 Jan 2026" },
  { id: 2, title: "New Research Center Inaugurated", date: "08 Jan 2026" },
  { id: 3, title: "MoU Signed with Local Industries", date: "02 Jan 2026" },
];

export function NoticeBoard() {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="section-title">Latest Updates</h2>
          <p className="section-subtitle">Stay informed with the latest news and announcements</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Tabs defaultValue="notices" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8 bg-secondary/50 p-1 rounded-xl">
              <TabsTrigger value="notices" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg">
                <Bell className="w-4 h-4" />
                <span className="hidden sm:inline">Notices</span>
              </TabsTrigger>
              <TabsTrigger value="events" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg">
                <Calendar className="w-4 h-4" />
                <span className="hidden sm:inline">Events</span>
              </TabsTrigger>
              <TabsTrigger value="tenders" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg">
                <FileText className="w-4 h-4" />
                <span className="hidden sm:inline">Tenders</span>
              </TabsTrigger>
              <TabsTrigger value="news" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg">
                <Newspaper className="w-4 h-4" />
                <span className="hidden sm:inline">News</span>
              </TabsTrigger>
            </TabsList>

            <div className="glass-card p-6 max-h-[400px] overflow-y-auto">
              <TabsContent value="notices" className="m-0">
                {notices.map((notice, index) => (
                  <motion.div
                    key={notice.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="notice-card group cursor-pointer"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h4 className="font-medium text-foreground group-hover:text-primary transition-colors">
                          {notice.title}
                        </h4>
                        <p className="text-sm text-muted-foreground mt-1">{notice.date}</p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                  </motion.div>
                ))}
              </TabsContent>

              <TabsContent value="events" className="m-0">
                {events.map((event, index) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="notice-card group cursor-pointer"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h4 className="font-medium text-foreground group-hover:text-primary transition-colors">
                          {event.title}
                        </h4>
                        <p className="text-sm text-muted-foreground mt-1">{event.date}</p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                  </motion.div>
                ))}
              </TabsContent>

              <TabsContent value="tenders" className="m-0">
                {tenders.map((tender, index) => (
                  <motion.div
                    key={tender.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="notice-card group cursor-pointer"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h4 className="font-medium text-foreground group-hover:text-primary transition-colors">
                          {tender.title}
                        </h4>
                        <p className="text-sm text-muted-foreground mt-1">{tender.date}</p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                  </motion.div>
                ))}
              </TabsContent>

              <TabsContent value="news" className="m-0">
                {news.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="notice-card group cursor-pointer"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h4 className="font-medium text-foreground group-hover:text-primary transition-colors">
                          {item.title}
                        </h4>
                        <p className="text-sm text-muted-foreground mt-1">{item.date}</p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                  </motion.div>
                ))}
              </TabsContent>
            </div>
          </Tabs>
        </motion.div>
      </div>
    </section>
  );
}
