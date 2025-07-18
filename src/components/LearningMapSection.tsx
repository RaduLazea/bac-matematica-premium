import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/lib/auth';
import { supabase } from '@/integrations/supabase/client';
import { Lock, CheckCircle, PlayCircle, BookOpen, Trophy, Target } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Chapter {
  id: string;
  title: string;
  description: string;
  difficulty_level: string;
  order_index: number;
}

interface UserProgress {
  lesson_id: string;
  status: string;
  score?: number;
}

export const LearningMapSection = () => {
  const { user } = useAuth();
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [userProgress, setUserProgress] = useState<UserProgress[]>([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('M1');
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const difficulties = [
    { value: 'M1', label: 'M1 - Matematică', color: 'bg-blue-500' },
    { value: 'M2_stiinta', label: 'M2 - Științe', color: 'bg-green-500' },
    { value: 'M2_tehnologic', label: 'M2 - Tehnologic', color: 'bg-orange-500' },
    { value: 'M2_pedagogic', label: 'M2 - Pedagogic', color: 'bg-purple-500' }
  ];

  useEffect(() => {
    if (user) {
      fetchChapters();
      fetchUserProgress();
    }
  }, [user, selectedDifficulty]);

  const fetchChapters = async () => {
    try {
      const { data, error } = await supabase
        .from('chapters')
        .select('*')
        .eq('difficulty_level', selectedDifficulty)
        .eq('is_active', true)
        .order('order_index');

      if (error) throw error;
      setChapters(data || []);
    } catch (error) {
      console.error('Error fetching chapters:', error);
      toast({
        title: "Eroare",
        description: "Nu s-au putut încărca capitolele",
        variant: "destructive",
      });
    }
  };

  const fetchUserProgress = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', user.id);

      if (error) throw error;
      setUserProgress(data || []);
    } catch (error) {
      console.error('Error fetching user progress:', error);
    } finally {
      setLoading(false);
    }
  };

  const getProgressForChapter = (chapterId: string) => {
    // For now, we'll simulate progress since we don't have lessons yet
    const progressEntries = userProgress.filter(p => p.lesson_id.includes(chapterId));
    if (progressEntries.length === 0) return { status: 'not_started', progress: 0 };
    
    const completed = progressEntries.filter(p => p.status === 'completed').length;
    const total = progressEntries.length;
    
    return {
      status: completed === total ? 'completed' : completed > 0 ? 'in_progress' : 'not_started',
      progress: (completed / total) * 100
    };
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-6 w-6 text-green-500" />;
      case 'in_progress':
        return <PlayCircle className="h-6 w-6 text-blue-500" />;
      case 'locked':
        return <Lock className="h-6 w-6 text-gray-400" />;
      default:
        return <BookOpen className="h-6 w-6 text-gray-400" />;
    }
  };

  const startChapter = async (chapterId: string) => {
    if (!user) return;

    try {
      // For demo purposes, we'll just show a toast
      toast({
        title: "Capitol început!",
        description: "Ai început să înveți acest capitol. Mult succes!",
      });
    } catch (error) {
      console.error('Error starting chapter:', error);
      toast({
        title: "Eroare",
        description: "Nu s-a putut începe capitolul",
        variant: "destructive",
      });
    }
  };

  if (!user) {
    return (
      <section id="mapa" className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Mapa de Învățare</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Pentru a accesa mapa de învățare interactivă, trebuie să te conectezi
            </p>
            <Button size="lg">
              Conectează-te pentru acces
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="mapa" className="py-16 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Mapa de Învățare</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Urmărește-ți progresul în stil DuoLingo! Fiecare capitol are lecții, exerciții și un test final pe care trebuie să-l treci cu peste 80 de puncte.
          </p>
        </div>

        {/* Difficulty Selector */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {difficulties.map((diff) => (
            <Button
              key={diff.value}
              variant={selectedDifficulty === diff.value ? "default" : "outline"}
              onClick={() => setSelectedDifficulty(diff.value)}
              className="mb-2"
            >
              <div className={`w-3 h-3 rounded-full ${diff.color} mr-2`}></div>
              {diff.label}
            </Button>
          ))}
        </div>

        {/* Progress Overview */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="text-center">
            <CardContent className="pt-6">
              <Trophy className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold">
                {userProgress.filter(p => p.status === 'completed').length}
              </div>
              <div className="text-sm text-muted-foreground">Lecții completate</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <Target className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold">
                {Math.round((userProgress.filter(p => p.status === 'completed').length / Math.max(chapters.length * 3, 1)) * 100)}%
              </div>
              <div className="text-sm text-muted-foreground">Progres total</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <BookOpen className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold">{chapters.length}</div>
              <div className="text-sm text-muted-foreground">Capitole disponibile</div>
            </CardContent>
          </Card>
        </div>

        {/* Learning Path */}
        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="mt-2 text-muted-foreground">Se încarcă capitolele...</p>
          </div>
        ) : (
          <div className="space-y-6">
            {chapters.map((chapter, index) => {
              const progress = getProgressForChapter(chapter.id);
              const isLocked = index > 0 && getProgressForChapter(chapters[index - 1].id).status !== 'completed';
              
              return (
                <Card key={chapter.id} className={`${isLocked ? 'opacity-50' : 'hover:shadow-lg'} transition-all`}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        {getStatusIcon(isLocked ? 'locked' : progress.status)}
                        <div>
                          <CardTitle className="text-xl">{chapter.title}</CardTitle>
                          <p className="text-muted-foreground">{chapter.description}</p>
                        </div>
                      </div>
                      <Badge variant="outline">
                        Capitol {chapter.order_index}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {!isLocked && progress.status !== 'not_started' && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progres</span>
                          <span>{Math.round(progress.progress)}%</span>
                        </div>
                        <Progress value={progress.progress} className="h-2" />
                      </div>
                    )}
                    
                    <div className="flex space-x-2">
                      {isLocked ? (
                        <Button disabled className="flex-1">
                          <Lock className="h-4 w-4 mr-2" />
                          Blocat
                        </Button>
                      ) : progress.status === 'completed' ? (
                        <Button variant="outline" className="flex-1">
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Completat
                        </Button>
                      ) : (
                        <Button 
                          className="flex-1"
                          onClick={() => startChapter(chapter.id)}
                        >
                          <PlayCircle className="h-4 w-4 mr-2" />
                          {progress.status === 'in_progress' ? 'Continuă' : 'Începe'}
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        {chapters.length === 0 && !loading && (
          <div className="text-center py-8">
            <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">Nu există capitole disponibile</h3>
            <p className="text-muted-foreground">
              Capitolele pentru {difficulties.find(d => d.value === selectedDifficulty)?.label} vor fi adăugate în curând.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};