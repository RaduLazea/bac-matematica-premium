import { Button } from '@/components/ui/button';
import { BookOpen, Users, Trophy, Clock } from 'lucide-react';

export const HeroSection = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="pt-20 pb-16 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Matematica devine simplă
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8">
            Absolvent de Automatică și Calculatoare, pasionat de matematică și dornic să te ajut să descoperi frumusețea acestei științe
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              size="lg" 
              onClick={() => scrollToSection('pachete')}
              className="text-lg px-8 py-6"
            >
              Începe Meditațiile
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => scrollToSection('despre')}
              className="text-lg px-8 py-6"
            >
              Despre mine
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="flex justify-center mb-2">
                <BookOpen className="h-8 w-8 text-primary" />
              </div>
              <div className="text-2xl font-bold text-foreground">100+</div>
              <div className="text-sm text-muted-foreground">Materiale BAC</div>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-2">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <div className="text-2xl font-bold text-foreground">200+</div>
              <div className="text-sm text-muted-foreground">Elevi pregătiți</div>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-2">
                <Trophy className="h-8 w-8 text-primary" />
              </div>
              <div className="text-2xl font-bold text-foreground">95%</div>
              <div className="text-sm text-muted-foreground">Rată de promovare</div>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-2">
                <Clock className="h-8 w-8 text-primary" />
              </div>
              <div className="text-2xl font-bold text-foreground">5+</div>
              <div className="text-sm text-muted-foreground">Ani experiență</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};