import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import principalImage from "@/assets/principal.jpg";

const highlights = [
  "Affiliated to Vinoba Bhave University, Hazaribagh",
  "UGC recognized Government Institution",
  "Well-equipped Library and Laboratories",
  "Experienced and Dedicated Faculty",
  "Affordable Education for All",
  "Strong Placement Support",
];

export function WelcomeSection() {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-3 py-1 rounded-full bg-secondary text-primary text-sm font-medium mb-4">
              About Our College
            </span>
            <h2 className="section-title mb-6">
              Building Tomorrow's Leaders Through Quality Education
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Model College, Chatra (MCC) is a premier general degree government college 
              established by the Government of Jharkhand. Located in the serene environment 
              of Kishunpur Tongri, Chatra, the college is committed to providing quality 
              higher education to students from the region and beyond.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Affiliated to Vinoba Bhave University, Hazaribagh, we offer undergraduate 
              programs in Arts, Science, and Commerce. Our dedicated faculty, modern 
              infrastructure, and student-centric approach make MCC a preferred choice 
              for students seeking academic excellence.
            </p>

            <ul className="grid sm:grid-cols-2 gap-3 mb-8">
              {highlights.map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-center gap-2 text-sm"
                >
                  <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                  <span>{item}</span>
                </motion.li>
              ))}
            </ul>

            <Link to="/about" className="btn-gov">
              Learn More About Us
            </Link>
          </motion.div>

          {/* Right Content - Principal's Message */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-card p-8"
          >
            <div className="flex items-center gap-4 mb-6">
              <img
                src={principalImage}
                alt="Principal"
                className="w-24 h-24 rounded-full object-cover border-4 border-accent shadow-lg"
              />
              <div>
                <h3 className="font-serif font-bold text-xl text-primary">Principal's Desk</h3>
                <p className="text-muted-foreground text-sm">Dr. [Principal Name]</p>
                <p className="text-accent text-sm font-medium">M.A., Ph.D.</p>
              </div>
            </div>
            <blockquote className="text-muted-foreground leading-relaxed italic border-l-4 border-accent pl-4">
              "Education is the most powerful weapon which you can use to change the world. 
              At Model College, Chatra, we are committed to nurturing young minds and 
              preparing them for the challenges of tomorrow. Our goal is to provide 
              holistic education that combines academic excellence with character building."
            </blockquote>
            <p className="mt-4 text-muted-foreground">
              I welcome all students, parents, and visitors to explore our college and 
              discover the opportunities that await here. Together, let us build a 
              brighter future for our nation.
            </p>
            <Link to="/about" className="inline-block mt-6 text-primary font-medium hover:text-accent transition-colors underline-animate">
              Read Full Message →
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
