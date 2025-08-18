import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface PasswordResetModalProps {
  open: boolean;
  onClose: () => void;
}

export const PasswordResetModal = ({ open, onClose }: PasswordResetModalProps) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) {
        toast({
          title: "Eroare",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Email trimis!",
          description: "Verificați-vă emailul pentru linkul de resetare a parolei.",
        });
        onClose();
        setEmail('');
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

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Resetează parola</DialogTitle>
        </DialogHeader>

        <form onSubmit={handlePasswordReset} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="reset-email">Adresa de email</Label>
            <Input
              id="reset-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="exemplu@email.com"
              required
            />
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Se trimite...' : 'Trimite link de resetare'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};