import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  GraduationCap, 
  BookOpen, 
  Bell, 
  FileText, 
  Library,
  Users,
  Calendar,
  Award
} from "lucide-react";

const quickLinks = [
  {
    icon: GraduationCap,
    title: "Admission",
    description: "Apply now for UG programs",
    path: "/admission",
    color: "from-blue-500 to-blue-600",
  },
  {
    icon: BookOpen,
    title: "Courses",
    description: "BA, B.Sc, B.Com programs",
    path: "/academics",
    color: "from-emerald-500 to-emerald-600",
  },
  {
    icon: Bell,
    title: "Notice Board",
    description: "Latest announcements",
    path: "/contact",
    color: "from-amber-500 to-amber-600",
  },
  {
    icon: FileText,
    title: "Results",
    description: "Semester examination results",
    path: "/result",
    color: "from-rose-500 to-rose-600",
  },
  {
    icon: Library,
    title: "Library",
    description: "Access digital resources",
    path: "/library",
    color: "from-purple-500 to-purple-600",
  },
  {
    icon: Users,
    title: "Faculty",
    description: "Meet our educators",
    path: "/faculty",
    color: "from-cyan-500 to-cyan-600",
  },
];

export function QuickLinks() {
  return (
    <section className="py-16 bg-secondary/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="section-title">Quick Access</h2>
          <p className="section-subtitle">Everything you need at your fingertips</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {quickLinks.map((link, index) => (
            <motion.div
              key={link.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link to={link.path} className="quick-card group block h-full">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${link.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <link.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-foreground mb-1">{link.title}</h3>
                <p className="text-sm text-muted-foreground">{link.description}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
