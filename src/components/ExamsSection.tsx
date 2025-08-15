import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, Download, Calendar, Star } from 'lucide-react';
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const ExamsSection = () => {
  const [examFiles, setExamFiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExamFiles = async () => {
      try {
        const { data, error } = await supabase
          .from('exam_files')
          .select('*')
          .order('year', { ascending: false });

        if (error) throw error;
        setExamFiles(data || []);
      } catch (error) {
        console.error('Error fetching exam files:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchExamFiles();
  }, []);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "M1": return "bg-blue-100 text-blue-800";
      case "M2 Științe": return "bg-green-100 text-green-800";
      case "M2 Tehnologic": return "bg-orange-100 text-orange-800";
      case "M2 Pedagogic": return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const handlePreview = (filePath: string) => {
    window.open(filePath, '_blank');
  };

  const handleDownload = (filePath: string, title: string) => {
    const link = document.createElement('a');
    link.href = filePath;
    link.download = `${title}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getExamsByDifficulty = (difficulty: string) => {
    return examFiles.filter(exam => exam.difficulty === difficulty);
  };

  if (loading) {
    return (
      <section id="variante" className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-xl text-muted-foreground">Se încarcă variantele...</p>
          </div>
        </div>
      </section>
    );
  }

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
          {['M1', 'M2 Științe', 'M2 Tehnologic', 'M2 Pedagogic'].map((difficulty) => {
            const examsForDifficulty = getExamsByDifficulty(difficulty);
            
            if (examsForDifficulty.length === 0) return null;

            return examsForDifficulty.map((exam) => (
              <Card key={exam.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <FileText className="h-5 w-5 text-primary" />
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">{exam.year}</span>
                    </div>
                    {exam.year === '2024' && (
                      <Badge className="bg-red-100 text-red-800">
                        <Star className="h-3 w-3 mr-1" />
                        Nou
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-lg">{exam.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Badge className={getDifficultyColor(exam.difficulty)}>
                      {exam.difficulty}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      Variante oficiale
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Cu bareme incluse</span>
                  </div>
                  
                  <div className="space-y-2">
                    <Button 
                      className="w-full" 
                      variant="outline"
                      onClick={() => handlePreview(exam.file_path)}
                    >
                      <FileText className="h-4 w-4 mr-2" />
                      Previzualizare
                    </Button>
                    <Button 
                      className="w-full"
                      onClick={() => handleDownload(exam.file_path, exam.title)}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Descarcă PDF
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ));
          })}
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