import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/lib/auth';
import { useToast } from '@/hooks/use-toast';
import { Github, Facebook, Twitter, Mail } from 'lucide-react';

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
  mode: 'signin' | 'signup';
  onModeChange: (mode: 'signin' | 'signup') => void;
}

export const AuthModal = ({ open, onClose, mode, onModeChange }: AuthModalProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn, signUp, signInWithProvider } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let result;
      if (mode === 'signin') {
        result = await signIn(email, password);
      } else {
        result = await signUp(email, password, fullName);
      }

      if (result.error) {
        toast({
          title: "Eroare",
          description: result.error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: mode === 'signin' ? "Conectare reușită" : "Înregistrare reușită",
          description: mode === 'signin' 
            ? "Bun venit înapoi!" 
            : "Contul tău a fost creat cu succes!",
        });
        onClose();
        setEmail('');
        setPassword('');
        setFullName('');
      }
    } catch (error) {
      toast({
        title: "Eroare",
        description: "A apărut o eroare neașteptată",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSocialSignIn = async (provider: 'google' | 'facebook' | 'twitter' | 'github') => {
    const { error } = await signInWithProvider(provider);
    if (error) {
      toast({
        title: "Eroare",
        description: `Nu s-a putut conecta cu ${provider}`,
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {mode === 'signin' ? 'Conectează-te' : 'Creează cont'}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Social Sign In */}
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              onClick={() => handleSocialSignIn('google')}
              className="w-full"
            >
              <Mail className="h-4 w-4 mr-2" />
              Google
            </Button>
            <Button
              variant="outline"
              onClick={() => handleSocialSignIn('github')}
              className="w-full"
            >
              <Github className="h-4 w-4 mr-2" />
              GitHub
            </Button>
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              onClick={() => handleSocialSignIn('facebook')}
              className="w-full"
            >
              <Facebook className="h-4 w-4 mr-2" />
              Facebook
            </Button>
            <Button
              variant="outline"
              onClick={() => handleSocialSignIn('twitter')}
              className="w-full"
            >
              <Twitter className="h-4 w-4 mr-2" />
              Twitter
            </Button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                sau cu email
              </span>
            </div>
          </div>

          {/* Email/Password Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' && (
              <div className="space-y-2">
                <Label htmlFor="fullName">Nume complet</Label>
                <Input
                  id="fullName"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Numele tău complet"
                  required
                />
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="exemplu@email.com"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Parolă</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Parola ta"
                required
              />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading 
                ? (mode === 'signin' ? 'Se conectează...' : 'Se înregistrează...') 
                : (mode === 'signin' ? 'Conectează-te' : 'Creează cont')
              }
            </Button>
          </form>

          <div className="text-center text-sm">
            <span className="text-muted-foreground">
              {mode === 'signin' ? 'Nu ai cont?' : 'Ai deja cont?'}
            </span>
            <Button
              variant="link"
              onClick={() => onModeChange(mode === 'signin' ? 'signup' : 'signin')}
              className="p-0 ml-1 h-auto"
            >
              {mode === 'signin' ? 'Înregistrează-te' : 'Conectează-te'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};