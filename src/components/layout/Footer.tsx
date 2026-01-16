import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, ExternalLink } from "lucide-react";

const quickLinks = [
  { label: "About Us", path: "/about" },
  { label: "Admission", path: "/admission" },
  { label: "Courses", path: "/academics" },
  { label: "Faculty", path: "/faculty" },
  { label: "Results", path: "/result" },
  { label: "Contact", path: "/contact" },
];

const importantLinks = [
  { label: "Vinoba Bhave University", url: "https://www.vbu.ac.in" },
  { label: "UGC", url: "https://www.ugc.ac.in" },
  { label: "Jharkhand Govt.", url: "https://www.jharkhand.gov.in" },
  { label: "NAAC", url: "https://www.naac.gov.in" },
];

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* College Info */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-primary-foreground text-primary flex items-center justify-center font-serif text-xl font-bold">
                MCC
              </div>
              <div>
                <h3 className="font-serif font-bold text-lg">Model College, Chatra</h3>
                <p className="text-xs opacity-80">Est. by Govt. of Jharkhand</p>
              </div>
            </div>
            <p className="text-sm opacity-80 leading-relaxed">
              A premier government institution committed to providing quality higher education to students of Chatra district and surrounding areas.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif font-bold text-lg mb-4 flex items-center gap-2">
              <span className="w-8 h-0.5 bg-accent"></span>
              Quick Links
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm opacity-80 hover:opacity-100 hover:text-accent transition-colors flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Important Links */}
          <div>
            <h4 className="font-serif font-bold text-lg mb-4 flex items-center gap-2">
              <span className="w-8 h-0.5 bg-accent"></span>
              Important Links
            </h4>
            <ul className="space-y-2">
              {importantLinks.map((link) => (
                <li key={link.url}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm opacity-80 hover:opacity-100 hover:text-accent transition-colors flex items-center gap-2"
                  >
                    <ExternalLink className="w-3 h-3" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-serif font-bold text-lg mb-4 flex items-center gap-2">
              <span className="w-8 h-0.5 bg-accent"></span>
              Contact Us
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-1 text-accent flex-shrink-0" />
                <span className="text-sm opacity-80">
                  Kishunpur Tongri, Chatra,<br />
                  Jharkhand – 825401, India
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-accent flex-shrink-0" />
                <a href="tel:7903462065" className="text-sm opacity-80 hover:opacity-100 hover:text-accent transition-colors">
                  7903462065
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-accent flex-shrink-0" />
                <a href="mailto:chatramodelcollege@gmail.com" className="text-sm opacity-80 hover:opacity-100 hover:text-accent transition-colors break-all">
                  chatramodelcollege@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Google Map */}
        <div className="mt-8 rounded-lg overflow-hidden">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3653.258!2d84.87!3d23.87!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDUyJzEyLjAiTiA4NMKwNTInMTIuMCJF!5e0!3m2!1sen!2sin!4v1234567890"
            width="100%"
            height="200"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="College Location"
            className="grayscale hover:grayscale-0 transition-all duration-500"
          ></iframe>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/20">
        <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center gap-2 text-sm opacity-80">
          <p>© {new Date().getFullYear()} Model College, Chatra. All Rights Reserved.</p>
          <p>Affiliated to Vinoba Bhave University, Hazaribagh</p>
        </div>
      </div>
    </footer>
  );
}
