import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Users, Award, GraduationCap } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import heroImage from "@/assets/hero-campus.jpg";

function AnimatedCounter({ end, duration = 2000, suffix = "" }: { end: number; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let start = 0;
          const increment = end / (duration / 16);
          const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
              setCount(end);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, 16);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration, hasAnimated]);

  return (
    <div ref={ref} className="text-4xl md:text-5xl font-bold text-accent">
      {count}{suffix}
    </div>
  );
}

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img src={heroImage} alt="Model College Campus" className="w-full h-full object-cover" />
        <div className="absolute inset-0 hero-overlay"></div>
      </div>

      {/* Floating particles effect */}
      <div className="absolute inset-0 z-[1] overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="inline-block px-4 py-1.5 rounded-full bg-accent/20 text-accent text-sm font-medium mb-6">
              Government College • Affiliated to VBU, Hazaribagh
            </span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }} className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-6 leading-tight">
            Welcome to<br />
            <span className="text-gradient-gold">Model College, Chatra</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl leading-relaxed">
            A premier general degree government college located in Kishunpur Tongri, Chatra, Jharkhand. Committed to providing quality higher education and nurturing future leaders of the nation.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }} className="flex flex-wrap gap-4">
            <Link to="/admission" className="btn-accent flex items-center gap-2">
              Apply for Admission <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/about" className="btn-gov border-2 border-white/30">Explore College</Link>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5 }} className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: Users, value: 2000, suffix: "+", label: "Students" },
            { icon: BookOpen, value: 15, suffix: "+", label: "Courses" },
            { icon: GraduationCap, value: 50, suffix: "+", label: "Faculty" },
            { icon: Award, value: 30, suffix: "+", label: "Years Legacy" },
          ].map((stat, index) => (
            <div key={index} className="stat-card text-center text-white border border-white/10">
              <stat.icon className="w-8 h-8 mx-auto mb-2 text-accent" />
              <AnimatedCounter end={stat.value} suffix={stat.suffix} />
              <div className="text-sm opacity-80 mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
