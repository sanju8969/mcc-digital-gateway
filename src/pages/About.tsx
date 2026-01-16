import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { PageBanner } from "@/components/common/PageBanner";
import { CheckCircle, Target, Eye, Building, Award, Users, BookOpen } from "lucide-react";
import principalImage from "@/assets/principal.jpg";

const milestones = [
  { year: "Est.", title: "College Established", description: "Founded by Government of Jharkhand" },
  { year: "2010", title: "UGC Recognition", description: "Received UGC 2(f) & 12(B) status" },
  { year: "2015", title: "New Building", description: "Modern campus infrastructure added" },
  { year: "2020", title: "Digital Initiative", description: "Smart classrooms and e-learning" },
];

const infrastructure = [
  { icon: Building, title: "Modern Classrooms", description: "Spacious and well-ventilated" },
  { icon: BookOpen, title: "Central Library", description: "10,000+ books and journals" },
  { icon: Users, title: "Computer Lab", description: "Latest hardware and software" },
  { icon: Award, title: "Sports Facilities", description: "Indoor and outdoor sports" },
];

export default function About() {
  return (
    <Layout>
      <PageBanner
        title="About Us"
        subtitle="Learn about our rich history, vision, and commitment to academic excellence"
        breadcrumbs={[{ label: "About" }]}
      />

      {/* Introduction */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glass-card p-8 md:p-12"
            >
              <h2 className="section-title mb-6">College Introduction</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Model College, Chatra (MCC) is a distinguished general degree government college 
                established by the Government of Jharkhand. Situated in the peaceful surroundings 
                of Kishunpur Tongri, Chatra district, the college serves as a beacon of higher 
                education for students from rural and semi-urban areas of Jharkhand.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Affiliated to the prestigious Vinoba Bhave University, Hazaribagh, MCC offers 
                undergraduate programs in Arts, Science, and Commerce streams. The college is 
                committed to providing accessible, affordable, and quality education that 
                empowers students to become responsible citizens and future leaders.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                With a strong emphasis on holistic development, the college combines rigorous 
                academic training with extracurricular activities, sports, and cultural programs. 
                Our experienced faculty, modern facilities, and student-centric approach make 
                MCC a preferred choice for aspiring students in the region.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Affiliation */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="section-title">Affiliation & Recognition</h2>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Vinoba Bhave University",
                description: "Affiliated to VBU, Hazaribagh for all undergraduate programs",
                highlight: "University Affiliation",
              },
              {
                title: "UGC Recognition",
                description: "Recognized under Section 2(f) and 12(B) of UGC Act",
                highlight: "Central Recognition",
              },
              {
                title: "Government of Jharkhand",
                description: "Established and funded by the State Government",
                highlight: "State Institution",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-card p-6 text-center"
              >
                <span className="inline-block px-3 py-1 rounded-full bg-accent/20 text-accent text-sm font-medium mb-4">
                  {item.highlight}
                </span>
                <h3 className="font-serif font-bold text-xl text-primary mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glass-card p-8"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-xl bg-primary flex items-center justify-center">
                  <Eye className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="font-serif font-bold text-2xl text-primary">Our Vision</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                To be a leading center of higher education in Jharkhand, recognized for 
                academic excellence, research contributions, and the holistic development 
                of students. We envision creating a learning environment that nurtures 
                critical thinking, creativity, and ethical values, preparing students 
                to become responsible citizens and leaders who contribute positively 
                to society and the nation.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="glass-card p-8"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-xl bg-accent flex items-center justify-center">
                  <Target className="w-7 h-7 text-accent-foreground" />
                </div>
                <h3 className="font-serif font-bold text-2xl text-primary">Our Mission</h3>
              </div>
              <ul className="space-y-3">
                {[
                  "Provide quality education accessible to all sections of society",
                  "Foster intellectual growth through innovative teaching methods",
                  "Develop research aptitude and scientific temperament",
                  "Promote cultural awareness and social responsibility",
                  "Prepare students for competitive examinations and employment",
                  "Create an inclusive and supportive learning environment",
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3 text-muted-foreground">
                    <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Infrastructure */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="section-title">Infrastructure</h2>
            <p className="section-subtitle">Modern facilities for comprehensive education</p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {infrastructure.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="quick-card text-center"
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Principal's Desk */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="section-title">Principal's Desk</h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-4xl mx-auto glass-card p-8 md:p-12"
          >
            <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
              <div className="flex-shrink-0">
                <img
                  src={principalImage}
                  alt="Principal"
                  className="w-40 h-40 rounded-full object-cover border-4 border-accent shadow-xl"
                />
              </div>
              <div>
                <h3 className="font-serif font-bold text-2xl text-primary mb-1">
                  Dr. [Principal Name]
                </h3>
                <p className="text-accent font-medium mb-4">M.A., Ph.D. (Principal)</p>
                <blockquote className="text-muted-foreground leading-relaxed italic border-l-4 border-accent pl-4 mb-4">
                  "Dear Students and Visitors, it gives me immense pleasure to welcome you to 
                  Model College, Chatra. Our institution stands as a symbol of academic excellence 
                  and holistic development in the region. We believe that education is not merely 
                  about acquiring degrees but about developing character, values, and skills that 
                  prepare students for life's challenges."
                </blockquote>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  At MCC, we are committed to providing an environment that encourages curiosity, 
                  creativity, and critical thinking. Our dedicated faculty members work tirelessly 
                  to ensure that every student receives personalized attention and guidance.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  I invite all prospective students to join our MCC family and embark on a 
                  journey of knowledge, growth, and success. Together, let us work towards 
                  building a brighter future for our nation.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="section-title">Our Journey</h2>
            <p className="section-subtitle">Key milestones in our history</p>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="flex gap-6 mb-8"
              >
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
                    {milestone.year}
                  </div>
                  {index < milestones.length - 1 && (
                    <div className="w-0.5 flex-1 bg-border mt-2"></div>
                  )}
                </div>
                <div className="glass-card p-6 flex-1">
                  <h4 className="font-semibold text-lg text-primary mb-2">{milestone.title}</h4>
                  <p className="text-muted-foreground">{milestone.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
