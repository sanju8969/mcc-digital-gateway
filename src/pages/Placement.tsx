import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { PageBanner } from "@/components/common/PageBanner";
import { Briefcase, Award, Handshake, GraduationCap } from "lucide-react";

export default function Placement() {
  return (
    <Layout>
      <PageBanner title="Training & Placement" subtitle="Career guidance and skill development programs" breadcrumbs={[{ label: "Training & Placement" }]} />
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Briefcase, title: "Career Guidance", desc: "Regular career counseling and guidance sessions for students" },
              { icon: GraduationCap, title: "Skill Development", desc: "BOPT and skill enhancement programs under government schemes" },
              { icon: Handshake, title: "Industry Connect", desc: "MOUs with local industries for internship opportunities" },
              { icon: Award, title: "Competitive Exams", desc: "Coaching for civil services and competitive examinations" },
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="quick-card">
                <item.icon className="w-12 h-12 text-primary mb-4" />
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
