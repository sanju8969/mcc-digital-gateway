import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { PageBanner } from "@/components/common/PageBanner";
import { 
  FileText, 
  Download, 
  CheckCircle, 
  ExternalLink, 
  Phone, 
  Mail, 
  Clock,
  AlertCircle,
  ArrowRight
} from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const admissionNotices = [
  { title: "Admission Notice 2025-26 (UG Programs)", date: "15 Jan 2026" },
  { title: "Merit List - First Round", date: "10 Jan 2026" },
  { title: "Document Verification Schedule", date: "08 Jan 2026" },
  { title: "Revised Admission Calendar", date: "05 Jan 2026" },
];

const requiredDocuments = [
  "10th (Matriculation) Marksheet & Certificate",
  "12th (Intermediate) Marksheet & Certificate",
  "CUET Scorecard (if applicable)",
  "Caste Certificate (SC/ST/OBC if applicable)",
  "Income Certificate (for fee concession)",
  "Migration Certificate",
  "Transfer Certificate (TC)",
  "Aadhaar Card (Original & Photocopy)",
  "Passport Size Photographs (4 copies)",
  "Character Certificate from previous institution",
];

const importantLinks = [
  { title: "CUET Official Portal", url: "https://cuet.samarth.ac.in", description: "For CUET registration and results" },
  { title: "VBU Admission Portal", url: "https://www.vbu.ac.in", description: "University admission updates" },
  { title: "Jharkhand Higher Education", url: "https://www.jharkhand.gov.in", description: "State education department" },
];

const admissionSteps = [
  {
    step: 1,
    title: "Check Eligibility",
    description: "Verify that you meet the eligibility criteria for your desired course. Check minimum marks requirements and subject combinations.",
  },
  {
    step: 2,
    title: "Apply through CUET / University Portal",
    description: "For most programs, apply through CUET or the Vinoba Bhave University admission portal as per the notification.",
  },
  {
    step: 3,
    title: "Check Merit List",
    description: "Monitor the university website for merit list announcements. Multiple rounds may be conducted based on seat availability.",
  },
  {
    step: 4,
    title: "Report to College",
    description: "Selected candidates must report to Model College, Chatra for document verification on the specified dates.",
  },
  {
    step: 5,
    title: "Complete Admission",
    description: "Submit original documents, pay admission fees, and complete the enrollment process at the college office.",
  },
];

const faqs = [
  {
    question: "What is the admission process for B.A./B.Sc./B.Com?",
    answer: "Admission to undergraduate programs is done through CUET or university counseling. Check the VBU website for detailed guidelines and important dates.",
  },
  {
    question: "What are the minimum eligibility criteria?",
    answer: "Generally, candidates must have passed 10+2 from a recognized board with the required subjects. Specific percentage requirements may vary by course and category.",
  },
  {
    question: "Is there any entrance exam for admission?",
    answer: "Most programs require CUET scores. Some courses may have university-level entrance tests. Check the admission notification for specific requirements.",
  },
  {
    question: "When does the academic session begin?",
    answer: "The academic session typically begins in July/August. Exact dates are announced through admission notifications.",
  },
  {
    question: "What is the fee structure?",
    answer: "Being a government college, fees are very nominal. Exact fee structure is available in the admission notification. Various scholarships are available for eligible students.",
  },
];

export default function Admission() {
  return (
    <Layout>
      <PageBanner
        title="Admissions"
        subtitle="Your gateway to quality higher education at Model College, Chatra"
        breadcrumbs={[{ label: "Admission" }]}
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
              <strong>Important:</strong> Admission to Model College, Chatra is conducted through 
              CUET / University Portal only. Please do not pay any money to unauthorized agents.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Admission Notices */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left - Notices */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2"
            >
              <h2 className="section-title mb-6">Admission Notices</h2>
              <div className="glass-card divide-y divide-border">
                {admissionNotices.map((notice, index) => (
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
                    <button className="p-2 rounded-full hover:bg-primary/10 transition-colors">
                      <Download className="w-5 h-5 text-primary" />
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right - Help Desk */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="section-title mb-6">Help Desk</h2>
              <div className="glass-card p-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Phone className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Phone</p>
                      <a href="tel:7903462065" className="font-medium hover:text-primary transition-colors">
                        7903462065
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <a href="mailto:chatramodelcollege@gmail.com" className="font-medium hover:text-primary transition-colors text-sm break-all">
                        chatramodelcollege@gmail.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Clock className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Office Hours</p>
                      <p className="font-medium">Mon - Sat: 10:00 AM - 5:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Admission Process */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="section-title">Admission Process</h2>
            <p className="section-subtitle">Step-by-step guide to admission at MCC</p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            {admissionSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex gap-6 mb-6"
              >
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg">
                    {step.step}
                  </div>
                  {index < admissionSteps.length - 1 && (
                    <div className="w-0.5 flex-1 bg-primary/30 mt-2"></div>
                  )}
                </div>
                <div className="glass-card p-6 flex-1 mb-2">
                  <h4 className="font-semibold text-lg text-primary mb-2">{step.title}</h4>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Required Documents */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="section-title">Required Documents</h2>
            <p className="section-subtitle">Keep these documents ready for admission</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-3xl mx-auto glass-card p-8"
          >
            <div className="grid sm:grid-cols-2 gap-4">
              {requiredDocuments.map((doc, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">{doc}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Important Links */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="section-title">Important Links</h2>
          </motion.div>

          <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {importantLinks.map((link, index) => (
              <motion.a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-card p-6 group hover:border-primary/50 transition-all"
              >
                <div className="flex items-center gap-3 mb-3">
                  <ExternalLink className="w-5 h-5 text-primary" />
                  <h4 className="font-semibold group-hover:text-primary transition-colors">
                    {link.title}
                  </h4>
                </div>
                <p className="text-sm text-muted-foreground">{link.description}</p>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="section-title">Frequently Asked Questions</h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-3xl mx-auto glass-card p-6"
          >
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left hover:text-primary">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
