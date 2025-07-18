import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Mail, Bell, Gift, Calendar } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    
    // Simulate subscription process
    setTimeout(() => {
      setIsSubscribed(true);
      setLoading(false);
      toast({
        title: "Te-ai abonat cu succes!",
        description: "Vei primi în curând primul nostru newsletter cu noutăți și sfaturi pentru BAC.",
      });
    }, 1000);
  };

  if (isSubscribed) {
    return (
      <section id="newsletter" className="py-16 bg-primary/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <div className="mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="h-8 w-8 text-green-600" />
              </div>
              <h2 className="text-3xl font-bold mb-4">Mulțumim pentru abonare!</h2>
              <p className="text-xl text-muted-foreground">
                Ai fost adăugat la lista noastră de newsletter. Vei primi săptămânal noutăți, sfaturi și anunțuri importante.
              </p>
            </div>
            <Card className="max-w-md mx-auto">
              <CardContent className="pt-6 text-center">
                <Gift className="h-8 w-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Bonus de bun venit!</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Verifică-ți email-ul pentru a primi gratuit colecția noastră de formule esențiale pentru BAC.
                </p>
                <Button variant="outline" size="sm">
                  Verifică email-ul
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="newsletter" className="py-16 bg-primary/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Mă abonez</h2>
            <p className="text-xl text-muted-foreground">
              Primește săptămânal știri, anunțuri și sfaturi pentru pregătirea BAC-ului
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Benefits */}
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold">Ce vei primi:</h3>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Calendar className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">Newsletter săptămânal</h4>
                    <p className="text-sm text-muted-foreground">
                      Fiecare vineri, informații despre materiale noi, sfaturi pentru BAC și anunțuri importante
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Bell className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">Anunțuri exclusive</h4>
                    <p className="text-sm text-muted-foreground">
                      Primul să afli despre oferte speciale, seminarii gratuite și noi materiale
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Gift className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">Bonus gratuit</h4>
                    <p className="text-sm text-muted-foreground">
                      La înregistrare primești gratuit ghidul "Formulele esențiale pentru BAC"
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Subscription Form */}
            <Card>
              <CardHeader>
                <CardTitle className="text-center">Abonează-te acum</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubscribe} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="newsletter-email">Adresa de email</Label>
                    <Input
                      id="newsletter-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="exemplu@email.com"
                      required
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full" 
                    size="lg"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Se abonează...
                      </>
                    ) : (
                      <>
                        <Mail className="h-4 w-4 mr-2" />
                        Abonează-mă
                      </>
                    )}
                  </Button>
                  
                  <p className="text-xs text-muted-foreground text-center">
                    Nu trimitem spam. Te poți dezabona oricând cu un click.
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};