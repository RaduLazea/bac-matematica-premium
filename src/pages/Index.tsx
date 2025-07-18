import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { AboutSection } from '@/components/AboutSection';
import { MaterialsSection } from '@/components/MaterialsSection';
import { ExamsSection } from '@/components/ExamsSection';
import { TutoringSection } from '@/components/TutoringSection';
import { LearningMapSection } from '@/components/LearningMapSection';
import { NewsletterSection } from '@/components/NewsletterSection';
import { Footer } from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <AboutSection />
      <MaterialsSection />
      <ExamsSection />
      <TutoringSection />
      <LearningMapSection />
      <NewsletterSection />
      <Footer />
    </div>
  );
};

export default Index;
