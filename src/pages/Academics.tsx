import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { PageBanner } from "@/components/common/PageBanner";
import { BookOpen, Download, Calendar, Clock, GraduationCap } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const courses = {
  arts: {
    title: "Bachelor of Arts (B.A.)",
    duration: "3 Years (6 Semesters)",
    eligibility: "10+2 from recognized board",
    subjects: [
      "Hindi", "English", "History", "Political Science", 
      "Economics", "Geography", "Philosophy", "Sociology", "Sanskrit"
    ],
    description: "The B.A. program offers a comprehensive education in humanities and social sciences, preparing students for diverse career paths in education, civil services, journalism, and more.",
  },
  science: {
    title: "Bachelor of Science (B.Sc.)",
    duration: "3 Years (6 Semesters)",
    eligibility: "10+2 (Science) from recognized board",
    subjects: [
      "Physics", "Chemistry", "Mathematics", "Botany", "Zoology"
    ],
    description: "The B.Sc. program provides a strong foundation in scientific principles and laboratory skills, opening doors to careers in research, industry, and higher education.",
  },
  commerce: {
    title: "Bachelor of Commerce (B.Com)",
    duration: "3 Years (6 Semesters)",
    eligibility: "10+2 from recognized board",
    subjects: [
      "Accountancy", "Business Studies", "Economics", "Mathematics", 
      "Business Law", "Statistics", "Computer Applications"
    ],
    description: "The B.Com program equips students with knowledge of commerce, accounting, and business management, preparing them for careers in finance, banking, and corporate sectors.",
  },
};

const syllabusLinks = [
  { title: "B.A. Syllabus (All Semesters)", year: "2024-25" },
  { title: "B.Sc. Syllabus (All Semesters)", year: "2024-25" },
  { title: "B.Com Syllabus (All Semesters)", year: "2024-25" },
  { title: "VBU Examination Guidelines", year: "2024-25" },
];

const academicCalendar = [
  { event: "Admission Process Begins", date: "June 2025" },
  { event: "Commencement of Classes", date: "July 2025" },
  { event: "First Internal Assessment", date: "September 2025" },
  { event: "Mid-Semester Break", date: "October 2025" },
  { event: "Second Internal Assessment", date: "November 2025" },
  { event: "Semester Examinations", date: "December 2025" },
  { event: "Winter Vacation", date: "Dec - Jan" },
  { event: "Even Semester Begins", date: "January 2026" },
];

export default function Academics() {
  return (
    <Layout>
      <PageBanner
        title="Academics"
        subtitle="Explore our undergraduate programs and academic resources"
        breadcrumbs={[{ label: "Academics" }]}
      />

      {/* Courses Offered */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="section-title">Courses Offered</h2>
            <p className="section-subtitle">Undergraduate programs affiliated to Vinoba Bhave University</p>
          </motion.div>

          <Tabs defaultValue="arts" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8 bg-secondary/50 p-1 rounded-xl max-w-md mx-auto">
              <TabsTrigger value="arts" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg">
                B.A.
              </TabsTrigger>
              <TabsTrigger value="science" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg">
                B.Sc.
              </TabsTrigger>
              <TabsTrigger value="commerce" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg">
                B.Com
              </TabsTrigger>
            </TabsList>

            {Object.entries(courses).map(([key, course]) => (
              <TabsContent key={key} value={key}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="glass-card p-8 max-w-4xl mx-auto"
                >
                  <div className="flex items-start gap-6 mb-6">
                    <div className="w-16 h-16 rounded-xl bg-primary flex items-center justify-center flex-shrink-0">
                      <GraduationCap className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-serif font-bold text-2xl text-primary mb-2">{course.title}</h3>
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" /> {course.duration}
                        </span>
                        <span className="flex items-center gap-1">
                          <BookOpen className="w-4 h-4" /> {course.eligibility}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-muted-foreground mb-6">{course.description}</p>

                  <div>
                    <h4 className="font-semibold mb-3">Subjects Offered:</h4>
                    <div className="flex flex-wrap gap-2">
                      {course.subjects.map((subject, index) => (
                        <span
                          key={index}
                          className="px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground text-sm"
                        >
                          {subject}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Syllabus & Calendar */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Syllabus */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="section-title mb-6">Syllabus</h2>
              <div className="glass-card divide-y divide-border">
                {syllabusLinks.map((item, index) => (
                  <div
                    key={index}
                    className="p-4 flex items-center justify-between gap-4 hover:bg-secondary/50 transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center gap-4">
                      <BookOpen className="w-5 h-5 text-primary" />
                      <div>
                        <h4 className="font-medium group-hover:text-primary transition-colors">
                          {item.title}
                        </h4>
                        <p className="text-sm text-muted-foreground">Session: {item.year}</p>
                      </div>
                    </div>
                    <button className="p-2 rounded-full hover:bg-primary/10 transition-colors">
                      <Download className="w-5 h-5 text-primary" />
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Academic Calendar */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="section-title mb-6">Academic Calendar</h2>
              <div className="glass-card p-6">
                <div className="space-y-4">
                  {academicCalendar.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-4 p-3 rounded-lg hover:bg-secondary/50 transition-colors"
                    >
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Calendar className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{item.event}</h4>
                      </div>
                      <span className="text-sm text-accent font-medium">{item.date}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Additional Info */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: BookOpen,
                title: "Teaching Methodology",
                description: "Blend of traditional and modern teaching methods including lectures, seminars, group discussions, and practical sessions.",
              },
              {
                icon: GraduationCap,
                title: "Examination Pattern",
                description: "Semester-based examination system as per VBU guidelines with internal assessments and end-semester exams.",
              },
              {
                icon: Calendar,
                title: "Academic Support",
                description: "Tutorial classes, remedial sessions, and mentor-mentee programs for comprehensive student support.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="quick-card"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <item.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
