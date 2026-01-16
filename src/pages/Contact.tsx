import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { PageBanner } from "@/components/common/PageBanner";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

export default function Contact() {
  return (
    <Layout>
      <PageBanner title="Contact Us" subtitle="Get in touch with Model College, Chatra" breadcrumbs={[{ label: "Contact" }]} />
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="glass-card p-8">
              <h2 className="section-title mb-6">Contact Information</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-accent mt-1" />
                  <div><h4 className="font-semibold mb-1">Address</h4><p className="text-muted-foreground">Kishunpur Tongri, Chatra, Jharkhand – 825401, India</p></div>
                </div>
                <div className="flex items-start gap-4">
                  <Phone className="w-6 h-6 text-accent mt-1" />
                  <div><h4 className="font-semibold mb-1">Phone</h4><a href="tel:7903462065" className="text-muted-foreground hover:text-primary">7903462065</a></div>
                </div>
                <div className="flex items-start gap-4">
                  <Mail className="w-6 h-6 text-accent mt-1" />
                  <div><h4 className="font-semibold mb-1">Email</h4><a href="mailto:chatramodelcollege@gmail.com" className="text-muted-foreground hover:text-primary">chatramodelcollege@gmail.com</a></div>
                </div>
                <div className="flex items-start gap-4">
                  <Clock className="w-6 h-6 text-accent mt-1" />
                  <div><h4 className="font-semibold mb-1">Office Hours</h4><p className="text-muted-foreground">Monday - Saturday: 10:00 AM - 5:00 PM</p></div>
                </div>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="glass-card overflow-hidden">
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3653.258!2d84.87!3d23.87!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDUyJzEyLjAiTiA4NMKwNTInMTIuMCJF!5e0!3m2!1sen!2sin!4v1234567890" width="100%" height="400" style={{ border: 0 }} allowFullScreen loading="lazy" title="Location" />
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
