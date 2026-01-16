import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { PageBanner } from "@/components/common/PageBanner";
import { Mail, GraduationCap, Award } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const facultyData = {
  arts: [
    { name: "Dr. Ramesh Kumar Singh", designation: "Associate Professor", qualification: "M.A., Ph.D. (Hindi)", department: "Hindi" },
    { name: "Dr. Priya Sharma", designation: "Assistant Professor", qualification: "M.A., Ph.D. (English)", department: "English" },
    { name: "Prof. Anil Prasad", designation: "Associate Professor", qualification: "M.A., Ph.D. (History)", department: "History" },
    { name: "Dr. Sunita Devi", designation: "Assistant Professor", qualification: "M.A., Ph.D. (Political Science)", department: "Political Science" },
    { name: "Dr. Vijay Kumar", designation: "Assistant Professor", qualification: "M.A., Ph.D. (Economics)", department: "Economics" },
    { name: "Prof. Meera Kumari", designation: "Assistant Professor", qualification: "M.A., Ph.D. (Geography)", department: "Geography" },
  ],
  science: [
    { name: "Dr. Rajesh Verma", designation: "Associate Professor", qualification: "M.Sc., Ph.D. (Physics)", department: "Physics" },
    { name: "Dr. Anita Kumari", designation: "Assistant Professor", qualification: "M.Sc., Ph.D. (Chemistry)", department: "Chemistry" },
    { name: "Prof. Sanjay Singh", designation: "Associate Professor", qualification: "M.Sc., Ph.D. (Mathematics)", department: "Mathematics" },
    { name: "Dr. Kavita Devi", designation: "Assistant Professor", qualification: "M.Sc., Ph.D. (Botany)", department: "Botany" },
    { name: "Dr. Amit Kumar", designation: "Assistant Professor", qualification: "M.Sc., Ph.D. (Zoology)", department: "Zoology" },
  ],
  commerce: [
    { name: "Dr. Manoj Kumar", designation: "Associate Professor", qualification: "M.Com., Ph.D. (Commerce)", department: "Commerce" },
    { name: "Prof. Rekha Singh", designation: "Assistant Professor", qualification: "M.Com., M.Phil.", department: "Commerce" },
    { name: "Dr. Suresh Prasad", designation: "Assistant Professor", qualification: "M.Com., Ph.D. (Accounting)", department: "Commerce" },
  ],
};

const nonTeachingStaff = [
  { name: "Shri Rajendra Prasad", designation: "Office Superintendent" },
  { name: "Shri Mukesh Kumar", designation: "Head Clerk" },
  { name: "Shri Dinesh Singh", designation: "Accountant" },
  { name: "Shri Ramesh Oraon", designation: "Library Assistant" },
  { name: "Shri Sunil Kumar", designation: "Lab Assistant (Physics)" },
  { name: "Shri Ashok Mahto", designation: "Lab Assistant (Chemistry)" },
  { name: "Smt. Geeta Devi", designation: "Office Assistant" },
  { name: "Shri Birju Ram", designation: "Peon" },
];

export default function Faculty() {
  return (
    <Layout>
      <PageBanner
        title="Faculty & Staff"
        subtitle="Meet our dedicated team of educators and support staff"
        breadcrumbs={[{ label: "Faculty" }]}
      />

      {/* Teaching Faculty */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="section-title">Teaching Faculty</h2>
            <p className="section-subtitle">Our experienced and dedicated educators</p>
          </motion.div>

          <Tabs defaultValue="arts" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8 bg-secondary/50 p-1 rounded-xl max-w-md mx-auto">
              <TabsTrigger value="arts" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg">
                Arts
              </TabsTrigger>
              <TabsTrigger value="science" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg">
                Science
              </TabsTrigger>
              <TabsTrigger value="commerce" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg">
                Commerce
              </TabsTrigger>
            </TabsList>

            {Object.entries(facultyData).map(([key, faculty]) => (
              <TabsContent key={key} value={key}>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  {faculty.map((member, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="faculty-card"
                    >
                      <div className="p-6">
                        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                          <GraduationCap className="w-10 h-10 text-primary" />
                        </div>
                        <h3 className="font-serif font-bold text-lg text-primary text-center mb-1">
                          {member.name}
                        </h3>
                        <p className="text-accent text-sm text-center font-medium mb-2">
                          {member.designation}
                        </p>
                        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-2">
                          <Award className="w-4 h-4" />
                          <span>{member.qualification}</span>
                        </div>
                        <div className="text-center">
                          <span className="inline-block px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-xs">
                            {member.department}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Non-Teaching Staff */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="section-title">Non-Teaching Staff</h2>
            <p className="section-subtitle">Our dedicated administrative and support team</p>
          </motion.div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {nonTeachingStaff.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="glass-card p-4 text-center"
              >
                <h4 className="font-medium text-foreground">{member.name}</h4>
                <p className="text-sm text-muted-foreground">{member.designation}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
