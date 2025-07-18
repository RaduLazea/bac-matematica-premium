import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BookOpen, FileText, Calculator, Zap } from 'lucide-react';

export const MaterialsSection = () => {
  const materials = [
    {
      id: 1,
      title: "Matematică M1",
      description: "Materiale complete pentru profilul M1 - toate capitolele necesare pentru BAC",
      icon: BookOpen,
      difficulty: "Mediu",
      chapters: 12,
      exercises: 150,
      color: "bg-blue-500"
    },
    {
      id: 2,
      title: "Matematică M2 - Științe",
      description: "Materiale avansate pentru profilul științe naturale cu accent pe aplicații",
      icon: Calculator,
      difficulty: "Avansat",
      chapters: 15,
      exercises: 200,
      color: "bg-green-500"
    },
    {
      id: 3,
      title: "Matematică M2 - Tehnologic",
      description: "Materiale adaptate pentru profilul tehnologic cu aplicații practice",
      icon: Zap,
      difficulty: "Mediu-Avansat",
      chapters: 14,
      exercises: 180,
      color: "bg-orange-500"
    },
    {
      id: 4,
      title: "Matematică M2 - Pedagogic",
      description: "Materiale pentru profilul pedagogic cu focus pe fundamentele matematicii",
      icon: FileText,
      difficulty: "Mediu",
      chapters: 13,
      exercises: 170,
      color: "bg-purple-500"
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Mediu": return "bg-yellow-100 text-yellow-800";
      case "Avansat": return "bg-red-100 text-red-800";
      case "Mediu-Avansat": return "bg-orange-100 text-orange-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <section id="materiale" className="py-16 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Materiale de învățare</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Toate materialele necesare pentru examenul de BACALAUREAT, structurate pe anii de școală și pe dificultate
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
          {materials.map((material) => {
            const IconComponent = material.icon;
            return (
              <Card key={material.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${material.color} text-white`}>
                        <IconComponent className="h-6 w-6" />
                      </div>
                      <CardTitle className="text-xl">{material.title}</CardTitle>
                    </div>
                    <Badge className={getDifficultyColor(material.difficulty)}>
                      {material.difficulty}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">{material.description}</p>
                  
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>{material.chapters} capitole</span>
                    <span>{material.exercises} exerciții</span>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button className="flex-1" variant="outline">
                      Previzualizare
                    </Button>
                    <Button className="flex-1">
                      Accesează
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Pentru acces complet la toate materialele, este necesar să te autentifici
          </p>
          <Button size="lg">
            Creează cont gratuit
          </Button>
        </div>
      </div>
    </section>
  );
};