import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/home/HeroSection";
import { QuickLinks } from "@/components/home/QuickLinks";
import { WelcomeSection } from "@/components/home/WelcomeSection";
import { NoticeBoard } from "@/components/home/NoticeBoard";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <QuickLinks />
      <WelcomeSection />
      <NoticeBoard />
    </Layout>
  );
};

export default Index;
