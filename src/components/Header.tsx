import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/auth';
import { AuthModal } from './AuthModal';
import { Menu, X, BookOpen, User, ShoppingCart, Map } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const Header = () => {
  const { user, signOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const { toast } = useToast();

  const handleSignOut = async () => {
    await signOut();
    toast({
      title: "Te-ai deconectat cu succes",
      description: "Sperăm să te vedem din nou curând!",
    });
  };

  const openSignIn = () => {
    setAuthMode('signin');
    setShowAuthModal(true);
  };

  const openSignUp = () => {
    setAuthMode('signup');
    setShowAuthModal(true);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className="fixed top-0 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold text-foreground">Prof. Matematică</span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              <button 
                onClick={() => scrollToSection('despre')}
                className="text-foreground hover:text-primary transition-colors"
              >
                Despre mine
              </button>
              <button 
                onClick={() => scrollToSection('materiale')}
                className="text-foreground hover:text-primary transition-colors"
              >
                Materiale
              </button>
              <button 
                onClick={() => scrollToSection('variante')}
                className="text-foreground hover:text-primary transition-colors"
              >
                Variante BAC
              </button>
              <button 
                onClick={() => scrollToSection('pachete')}
                className="text-foreground hover:text-primary transition-colors"
              >
                Pachete Meditații
              </button>
              {user && (
                <button 
                  onClick={() => scrollToSection('mapa')}
                  className="text-foreground hover:text-primary transition-colors flex items-center gap-2"
                >
                  <Map className="h-4 w-4" />
                  Mapa de Învățare
                </button>
              )}
              <button 
                onClick={() => scrollToSection('newsletter')}
                className="text-foreground hover:text-primary transition-colors"
              >
                Newsletter
              </button>
            </nav>

            {/* User Menu */}
            <div className="hidden lg:flex items-center space-x-4">
              {user ? (
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4" />
                    <span className="text-sm">{user.email}</span>
                  </div>
                  <Button variant="outline" size="sm">
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Coș (0)
                  </Button>
                  <Button onClick={handleSignOut} variant="ghost" size="sm">
                    Ieșire
                  </Button>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Button onClick={openSignIn} variant="ghost" size="sm">
                    Conectează-te
                  </Button>
                  <Button onClick={openSignUp} size="sm">
                    Înregistrează-te
                  </Button>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="lg:hidden py-4 border-t">
              <nav className="flex flex-col space-y-4">
                <button 
                  onClick={() => scrollToSection('despre')}
                  className="text-left text-foreground hover:text-primary transition-colors"
                >
                  Despre mine
                </button>
                <button 
                  onClick={() => scrollToSection('materiale')}
                  className="text-left text-foreground hover:text-primary transition-colors"
                >
                  Materiale
                </button>
                <button 
                  onClick={() => scrollToSection('variante')}
                  className="text-left text-foreground hover:text-primary transition-colors"
                >
                  Variante BAC
                </button>
                <button 
                  onClick={() => scrollToSection('pachete')}
                  className="text-left text-foreground hover:text-primary transition-colors"
                >
                  Pachete Meditații
                </button>
                {user && (
                  <button 
                    onClick={() => scrollToSection('mapa')}
                    className="text-left text-foreground hover:text-primary transition-colors flex items-center gap-2"
                  >
                    <Map className="h-4 w-4" />
                    Mapa de Învățare
                  </button>
                )}
                <button 
                  onClick={() => scrollToSection('newsletter')}
                  className="text-left text-foreground hover:text-primary transition-colors"
                >
                  Newsletter
                </button>
                
                {user ? (
                  <div className="pt-4 border-t">
                    <div className="flex items-center space-x-2 mb-4">
                      <User className="h-4 w-4" />
                      <span className="text-sm">{user.email}</span>
                    </div>
                    <div className="space-y-2">
                      <Button variant="outline" size="sm" className="w-full">
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Coș (0)
                      </Button>
                      <Button onClick={handleSignOut} variant="ghost" size="sm" className="w-full">
                        Ieșire
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="pt-4 border-t space-y-2">
                    <Button onClick={openSignIn} variant="ghost" size="sm" className="w-full">
                      Conectează-te
                    </Button>
                    <Button onClick={openSignUp} size="sm" className="w-full">
                      Înregistrează-te
                    </Button>
                  </div>
                )}
              </nav>
            </div>
          )}
        </div>
      </header>

      <AuthModal 
        open={showAuthModal} 
        onClose={() => setShowAuthModal(false)}
        mode={authMode}
        onModeChange={setAuthMode}
      />
    </>
  );
};