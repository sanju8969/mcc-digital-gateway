import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, Calendar, Users, BookOpen, FileText, ClipboardList, TrendingUp, Clock } from "lucide-react";
import { motion } from "framer-motion";

const statsCards = [
  { title: "Total Notices", value: "24", icon: Bell, color: "bg-blue-500", change: "+3 this week" },
  { title: "Events", value: "12", icon: Calendar, color: "bg-green-500", change: "+2 this month" },
  { title: "Faculty Members", value: "45", icon: Users, color: "bg-purple-500", change: "Active" },
  { title: "Courses", value: "8", icon: BookOpen, color: "bg-orange-500", change: "3 programs" },
  { title: "Results Published", value: "6", icon: FileText, color: "bg-red-500", change: "Latest: Sem 4" },
  { title: "Exam Notices", value: "5", icon: ClipboardList, color: "bg-teal-500", change: "Upcoming: 2" },
];

const recentActivity = [
  { action: "New notice added", item: "Admission Notice 2024-25", time: "2 hours ago", type: "notice" },
  { action: "Event updated", item: "Annual Sports Day", time: "5 hours ago", type: "event" },
  { action: "Result published", item: "B.Sc Semester 4 Results", time: "1 day ago", type: "result" },
  { action: "Faculty added", item: "Dr. Rajesh Kumar - Physics", time: "2 days ago", type: "faculty" },
  { action: "Course updated", item: "B.Com Syllabus Revision", time: "3 days ago", type: "course" },
  { action: "Notice published", item: "Holiday Notice - Republic Day", time: "1 week ago", type: "notice" },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to MCC Admin Panel. Manage your college website content here.</p>
      </div>

      {/* Stats Grid */}
      <motion.div 
        className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {statsCards.map((stat) => (
          <motion.div key={stat.title} variants={item}>
            <Card className="relative overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <div className={`${stat.color} p-2 rounded-lg`}>
                  <stat.icon className="h-4 w-4 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
                  {stat.change}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Recent Activity
            </CardTitle>
            <CardDescription>Latest changes made to the website content</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between border-b border-border pb-4 last:border-0 last:pb-0"
                >
                  <div className="flex items-center gap-4">
                    <div className={`h-2 w-2 rounded-full ${
                      activity.type === 'notice' ? 'bg-blue-500' :
                      activity.type === 'event' ? 'bg-green-500' :
                      activity.type === 'result' ? 'bg-red-500' :
                      activity.type === 'faculty' ? 'bg-purple-500' :
                      'bg-orange-500'
                    }`} />
                    <div>
                      <p className="text-sm font-medium">{activity.action}</p>
                      <p className="text-sm text-muted-foreground">{activity.item}</p>
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">
                    {activity.time}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks you can perform</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <a
                href="/admin/notices"
                className="flex items-center gap-3 p-4 rounded-lg border border-border hover:bg-secondary transition-colors"
              >
                <Bell className="h-5 w-5 text-blue-500" />
                <span className="font-medium">Add Notice</span>
              </a>
              <a
                href="/admin/events"
                className="flex items-center gap-3 p-4 rounded-lg border border-border hover:bg-secondary transition-colors"
              >
                <Calendar className="h-5 w-5 text-green-500" />
                <span className="font-medium">Add Event</span>
              </a>
              <a
                href="/admin/results"
                className="flex items-center gap-3 p-4 rounded-lg border border-border hover:bg-secondary transition-colors"
              >
                <FileText className="h-5 w-5 text-red-500" />
                <span className="font-medium">Upload Result</span>
              </a>
              <a
                href="/admin/faculty"
                className="flex items-center gap-3 p-4 rounded-lg border border-border hover:bg-secondary transition-colors"
              >
                <Users className="h-5 w-5 text-purple-500" />
                <span className="font-medium">Add Faculty</span>
              </a>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
