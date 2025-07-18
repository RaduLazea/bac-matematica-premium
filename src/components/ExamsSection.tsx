import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, Download, Calendar, Star } from 'lucide-react';

export const ExamsSection = () => {
  const examVariants = [
    {
      id: 1,
      title: "Variante BAC 2024",
      year: "2024",
      difficulty: "M1",
      variants: 15,
      hasSolutions: true,
      isNew: true
    },
    {
      id: 2,
      title: "Variante BAC 2024",
      year: "2024",
      difficulty: "M2 Științe",
      variants: 12,
      hasSolutions: true,
      isNew: true
    },
    {
      id: 3,
      title: "Variante BAC 2024",
      year: "2024",
      difficulty: "M2 Tehnologic",
      variants: 10,
      hasSolutions: true,
      isNew: true
    },
    {
      id: 4,
      title: "Variante BAC 2024",
      year: "2024",
      difficulty: "M2 Pedagogic",
      variants: 8,
      hasSolutions: true,
      isNew: true
    },
    {
      id: 5,
      title: "Variante BAC 2023",
      year: "2023",
      difficulty: "M1",
      variants: 20,
      hasSolutions: true,
      isNew: false
    },
    {
      id: 6,
      title: "Variante BAC 2023",
      year: "2023",
      difficulty: "M2 Științe",
      variants: 18,
      hasSolutions: true,
      isNew: false
    },
    {
      id: 7,
      title: "Variante BAC 2022",
      year: "2022",
      difficulty: "M1",
      variants: 25,
      hasSolutions: true,
      isNew: false
    },
    {
      id: 8,
      title: "Variante BAC 2022",
      year: "2022",
      difficulty: "M2 Științe",
      variants: 22,
      hasSolutions: true,
      isNew: false
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "M1": return "bg-blue-100 text-blue-800";
      case "M2 Științe": return "bg-green-100 text-green-800";
      case "M2 Tehnologic": return "bg-orange-100 text-orange-800";
      case "M2 Pedagogic": return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <section id="variante" className="py-16 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Variante BAC cu bareme</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Colecție completă de variante BAC cu baremele acestora în format PDF, structurate pe dificultate și anul în care a fost propusă varianta
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {examVariants.map((variant) => (
            <Card key={variant.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <FileText className="h-5 w-5 text-primary" />
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">{variant.year}</span>
                  </div>
                  {variant.isNew && (
                    <Badge className="bg-red-100 text-red-800">
                      <Star className="h-3 w-3 mr-1" />
                      Nou
                    </Badge>
                  )}
                </div>
                <CardTitle className="text-lg">{variant.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <Badge className={getDifficultyColor(variant.difficulty)}>
                    {variant.difficulty}
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    {variant.variants} variante
                  </span>
                </div>
                
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Cu bareme incluse</span>
                </div>
                
                <div className="space-y-2">
                  <Button className="w-full" variant="outline">
                    <FileText className="h-4 w-4 mr-2" />
                    Previzualizare
                  </Button>
                  <Button className="w-full">
                    <Download className="h-4 w-4 mr-2" />
                    Descarcă PDF
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Toate variantele sunt disponibile gratuit pentru utilizatorii înregistrați
          </p>
          <Button size="lg">
            Înregistrează-te pentru acces complet
          </Button>
        </div>
      </div>
    </section>
  );
};