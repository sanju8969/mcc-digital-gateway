import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { PageBanner } from "@/components/common/PageBanner";
import { FileText, Download, Calendar, AlertCircle, ExternalLink } from "lucide-react";

const examNotices = [
  { title: "Semester End Examination Schedule - Dec 2025", date: "01 Dec 2025", type: "Schedule" },
  { title: "Practical Examination Routine", date: "28 Nov 2025", type: "Routine" },
  { title: "Internal Assessment Marks List", date: "25 Nov 2025", type: "Marks" },
  { title: "Examination Form Fill-up Notice", date: "15 Nov 2025", type: "Notice" },
  { title: "Re-evaluation Application Form", date: "10 Nov 2025", type: "Form" },
];

const examSchedule = [
  { course: "B.A. Part-I", subjects: "All Subjects", dates: "15 Dec - 30 Dec 2025" },
  { course: "B.A. Part-II", subjects: "All Subjects", dates: "15 Dec - 30 Dec 2025" },
  { course: "B.A. Part-III", subjects: "All Subjects", dates: "15 Dec - 30 Dec 2025" },
  { course: "B.Sc. Part-I", subjects: "Theory + Practical", dates: "15 Dec - 05 Jan 2026" },
  { course: "B.Sc. Part-II", subjects: "Theory + Practical", dates: "15 Dec - 05 Jan 2026" },
  { course: "B.Sc. Part-III", subjects: "Theory + Practical", dates: "15 Dec - 05 Jan 2026" },
  { course: "B.Com Part-I", subjects: "All Subjects", dates: "15 Dec - 30 Dec 2025" },
  { course: "B.Com Part-II", subjects: "All Subjects", dates: "15 Dec - 30 Dec 2025" },
  { course: "B.Com Part-III", subjects: "All Subjects", dates: "15 Dec - 30 Dec 2025" },
];

const downloadForms = [
  { title: "Examination Form (Regular)", description: "For regular semester students" },
  { title: "Examination Form (Ex-Regular)", description: "For back paper students" },
  { title: "Re-evaluation Form", description: "Apply for answer sheet re-checking" },
  { title: "Migration Certificate Form", description: "For migration to other university" },
  { title: "Duplicate Marksheet Form", description: "Request for duplicate marksheet" },
];

export default function Examination() {
  return (
    <Layout>
      <PageBanner
        title="Examination"
        subtitle="Examination schedules, notices, and downloadable forms"
        breadcrumbs={[{ label: "Examination" }]}
      />

      {/* Important Notice */}
      <section className="py-8 bg-accent/10">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4 p-4 rounded-lg bg-accent/20 border border-accent/30"
          >
            <AlertCircle className="w-6 h-6 text-accent flex-shrink-0" />
            <p className="text-foreground">
              <strong>Important:</strong> All examinations are conducted as per Vinoba Bhave University guidelines. 
              Check the university website for the latest updates.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Exam Notices & Schedule */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Notices */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="section-title mb-6">Exam Notices</h2>
              <div className="glass-card divide-y divide-border">
                {examNotices.map((notice, index) => (
                  <div
                    key={index}
                    className="p-4 flex items-center justify-between gap-4 hover:bg-secondary/50 transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center gap-4">
                      <FileText className="w-5 h-5 text-primary" />
                      <div>
                        <h4 className="font-medium group-hover:text-primary transition-colors">
                          {notice.title}
                        </h4>
                        <p className="text-sm text-muted-foreground">{notice.date}</p>
                      </div>
                    </div>
                    <span className="px-2 py-1 rounded text-xs bg-secondary text-secondary-foreground">
                      {notice.type}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Schedule */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="section-title mb-6">Exam Schedule</h2>
              <div className="glass-card overflow-hidden">
                <table className="w-full">
                  <thead className="bg-primary text-primary-foreground">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-medium">Course</th>
                      <th className="px-4 py-3 text-left text-sm font-medium">Subjects</th>
                      <th className="px-4 py-3 text-left text-sm font-medium">Dates</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {examSchedule.map((item, index) => (
                      <tr key={index} className="hover:bg-secondary/30 transition-colors">
                        <td className="px-4 py-3 text-sm font-medium">{item.course}</td>
                        <td className="px-4 py-3 text-sm text-muted-foreground">{item.subjects}</td>
                        <td className="px-4 py-3 text-sm text-muted-foreground">{item.dates}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Download Forms */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="section-title">Download Forms</h2>
            <p className="section-subtitle">Important examination-related forms</p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {downloadForms.map((form, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-card p-6 group cursor-pointer hover:border-primary/50 transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <Download className="w-6 h-6 text-primary group-hover:text-primary-foreground" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1 group-hover:text-primary transition-colors">
                      {form.title}
                    </h4>
                    <p className="text-sm text-muted-foreground">{form.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* University Link */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card p-8 max-w-2xl mx-auto"
          >
            <Calendar className="w-16 h-16 text-primary mx-auto mb-4" />
            <h3 className="font-serif font-bold text-2xl text-primary mb-4">
              VBU Examination Controller
            </h3>
            <p className="text-muted-foreground mb-6">
              For detailed examination schedule, admit cards, and official updates, 
              please visit the Vinoba Bhave University examination portal.
            </p>
            <a
              href="https://www.vbu.ac.in"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gov inline-flex items-center gap-2"
            >
              Visit VBU Portal <ExternalLink className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
