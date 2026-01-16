import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { PageBanner } from "@/components/common/PageBanner";
import { Microscope, FileText, Users, Calendar } from "lucide-react";

export default function Research() {
  return (
    <Layout>
      <PageBanner title="Research & Publication" subtitle="Academic research and scholarly activities" breadcrumbs={[{ label: "Research" }]} />
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass-card p-8">
              <Microscope className="w-12 h-12 text-primary mb-4" />
              <h3 className="font-serif font-bold text-xl text-primary mb-3">Research Cell</h3>
              <p className="text-muted-foreground">The college has an active Research Cell that promotes research culture among faculty and students. We encourage participation in national and state-level research projects.</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="glass-card p-8">
              <FileText className="w-12 h-12 text-primary mb-4" />
              <h3 className="font-serif font-bold text-xl text-primary mb-3">Faculty Publications</h3>
              <p className="text-muted-foreground">Our faculty members regularly publish research papers in UGC-approved journals and present at national/international conferences.</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="glass-card p-8">
              <Users className="w-12 h-12 text-primary mb-4" />
              <h3 className="font-serif font-bold text-xl text-primary mb-3">Seminars & Webinars</h3>
              <p className="text-muted-foreground">Regular seminars, workshops, and webinars are organized to foster academic discussions and knowledge sharing.</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="glass-card p-8">
              <Calendar className="w-12 h-12 text-primary mb-4" />
              <h3 className="font-serif font-bold text-xl text-primary mb-3">Research Events</h3>
              <p className="text-muted-foreground">Annual research symposium and student research presentations encourage budding researchers.</p>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
