import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { PageBanner } from "@/components/common/PageBanner";
import { FileText, Download, ExternalLink, Award } from "lucide-react";

const resultNotices = [
  { title: "B.A. Part-III Results - Dec 2025", date: "15 Jan 2026", status: "New" },
  { title: "B.Sc. Part-III Results - Dec 2025", date: "14 Jan 2026", status: "New" },
  { title: "B.Com Part-III Results - Dec 2025", date: "13 Jan 2026", status: "New" },
  { title: "B.A. Part-II Results - Dec 2025", date: "12 Jan 2026", status: "" },
  { title: "B.Sc. Part-II Results - Dec 2025", date: "11 Jan 2026", status: "" },
  { title: "B.A. Part-I Results - Dec 2025", date: "10 Jan 2026", status: "" },
];

const semesterResults = [
  { semester: "Odd Semester 2025-26", course: "B.A./B.Sc./B.Com", status: "Awaited" },
  { semester: "Even Semester 2024-25", course: "B.A./B.Sc./B.Com", status: "Available" },
  { semester: "Odd Semester 2024-25", course: "B.A./B.Sc./B.Com", status: "Available" },
  { semester: "Even Semester 2023-24", course: "B.A./B.Sc./B.Com", status: "Available" },
  { semester: "Odd Semester 2023-24", course: "B.A./B.Sc./B.Com", status: "Available" },
];

export default function Result() {
  return (
    <Layout>
      <PageBanner
        title="Results"
        subtitle="Semester examination results and university result portal"
        breadcrumbs={[{ label: "Result" }]}
      />

      {/* Result Notices */}
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
              <h2 className="section-title mb-6">Result Notifications</h2>
              <div className="glass-card divide-y divide-border">
                {resultNotices.map((notice, index) => (
                  <div
                    key={index}
                    className="p-4 flex items-center justify-between gap-4 hover:bg-secondary/50 transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center gap-4">
                      <FileText className="w-5 h-5 text-primary" />
                      <div>
                        <h4 className="font-medium group-hover:text-primary transition-colors flex items-center gap-2">
                          {notice.title}
                          {notice.status && (
                            <span className="px-2 py-0.5 rounded text-xs bg-accent text-accent-foreground">
                              {notice.status}
                            </span>
                          )}
                        </h4>
                        <p className="text-sm text-muted-foreground">{notice.date}</p>
                      </div>
                    </div>
                    <button className="p-2 rounded-full hover:bg-primary/10 transition-colors">
                      <Download className="w-5 h-5 text-primary" />
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Semester-wise Results */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="section-title mb-6">Semester-wise Results</h2>
              <div className="glass-card overflow-hidden">
                <table className="w-full">
                  <thead className="bg-primary text-primary-foreground">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-medium">Semester</th>
                      <th className="px-4 py-3 text-left text-sm font-medium">Course</th>
                      <th className="px-4 py-3 text-left text-sm font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {semesterResults.map((item, index) => (
                      <tr key={index} className="hover:bg-secondary/30 transition-colors">
                        <td className="px-4 py-3 text-sm font-medium">{item.semester}</td>
                        <td className="px-4 py-3 text-sm text-muted-foreground">{item.course}</td>
                        <td className="px-4 py-3 text-sm">
                          <span className={`px-2 py-1 rounded text-xs ${
                            item.status === "Available" 
                              ? "bg-green-100 text-green-700" 
                              : "bg-yellow-100 text-yellow-700"
                          }`}>
                            {item.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* University Result Link */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <div className="glass-card p-8 text-center">
              <Award className="w-20 h-20 text-primary mx-auto mb-6" />
              <h3 className="font-serif font-bold text-2xl text-primary mb-4">
                Check Your Result Online
              </h3>
              <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                All examination results are published on the Vinoba Bhave University official website. 
                Click the button below to check your result using your roll number.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://www.vbu.ac.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gov inline-flex items-center justify-center gap-2"
                >
                  VBU Result Portal <ExternalLink className="w-4 h-4" />
                </a>
                <a
                  href="https://www.vbu.ac.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-accent inline-flex items-center justify-center gap-2"
                >
                  Download Marksheet
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Instructions */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="section-title">How to Check Result</h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              { step: 1, title: "Visit VBU Website", description: "Go to the official VBU result portal" },
              { step: 2, title: "Select Exam", description: "Choose your course and examination session" },
              { step: 3, title: "Enter Details", description: "Enter your roll number and required details" },
              { step: 4, title: "View Result", description: "View and download your result/marksheet" },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="quick-card text-center"
              >
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  {item.step}
                </div>
                <h4 className="font-semibold mb-2">{item.title}</h4>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
