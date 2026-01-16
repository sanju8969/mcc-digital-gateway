import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { PageBanner } from "@/components/common/PageBanner";
import { BookOpen, Globe, FileText, ExternalLink } from "lucide-react";
import libraryImage from "@/assets/library.jpg";

export default function Library() {
  return (
    <Layout>
      <PageBanner title="Library" subtitle="Access physical and digital learning resources" breadcrumbs={[{ label: "Library" }]} />
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="section-title mb-4">Central Library</h2>
              <p className="text-muted-foreground mb-6">Our well-stocked library houses over 10,000 books, journals, and periodicals. Students have access to reading rooms, reference sections, and digital resources.</p>
              <ul className="space-y-3 mb-6">
                {["10,000+ Books & Journals", "Spacious Reading Hall", "Reference Section", "Newspaper & Magazines", "Digital Catalog System"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3"><BookOpen className="w-5 h-5 text-accent" />{item}</li>
                ))}
              </ul>
            </motion.div>
            <motion.img initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} src={libraryImage} alt="Library" className="rounded-xl shadow-lg" />
          </div>
        </div>
      </section>
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="section-title mb-8">E-Library Resources</h2>
          <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[{ title: "INFLIBNET", url: "https://www.inflibnet.ac.in" }, { title: "NDL India", url: "https://ndl.iitkgp.ac.in" }, { title: "e-PG Pathshala", url: "https://epgp.inflibnet.ac.in" }].map((link, i) => (
              <a key={i} href={link.url} target="_blank" rel="noopener noreferrer" className="glass-card p-6 hover:border-primary/50 transition-all group">
                <Globe className="w-10 h-10 text-primary mx-auto mb-3" />
                <h4 className="font-semibold group-hover:text-primary">{link.title}</h4>
              </a>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
