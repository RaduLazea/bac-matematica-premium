import { Card } from '@/components/ui/card';
import { GraduationCap, Heart, Target, Users } from 'lucide-react';

export const AboutSection = () => {
  return (
    <section id="despre" className="py-16 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Despre mine</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Sunt absolvent de Automatică și Calculatoare, pasionat de matematică încă de mic și vreau să ajut persoanele care la rândul lor sunt pasionate, dar și persoane care încă nu au găsit în matematică ceva plăcut.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <GraduationCap className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg">Educație solidă</h3>
                  <p className="text-muted-foreground">
                    Absolvent de Facultatea de Automatică și Calculatoare, cu o bază tehnică puternică și pasiune pentru matematică aplicată.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <Heart className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg">Pasiune autentică</h3>
                  <p className="text-muted-foreground">
                    Pasionat de matematică încă din copilărie, îmi place să transform complexitatea în simplitate și să fac matematica accesibilă tuturor.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <Target className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg">Obiectiv clar</h3>
                  <p className="text-muted-foreground">
                    Misiunea mea este să te ajut să obții rezultate excelente la BAC și să descoperi frumusețea matematicii.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <Users className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg">Pentru toată lumea</h3>
                  <p className="text-muted-foreground">
                    Lucrez atât cu elevi care sunt deja pasionați de matematică, cât și cu cei care încă nu au găsit plăcerea în această materie.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Card className="p-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2">M1</div>
              <div className="text-sm text-muted-foreground">Matematică</div>
            </Card>
            <Card className="p-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2">M2</div>
              <div className="text-sm text-muted-foreground">Științe</div>
            </Card>
            <Card className="p-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2">M2</div>
              <div className="text-sm text-muted-foreground">Tehnologic</div>
            </Card>
            <Card className="p-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2">M2</div>
              <div className="text-sm text-muted-foreground">Pedagogic</div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};