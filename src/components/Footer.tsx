import { BookOpen, Mail, Phone, MapPin, Facebook, Instagram, Youtube } from 'lucide-react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted/30 border-t">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold">Prof. Matematică</span>
            </div>
            <p className="text-muted-foreground">
              Transformăm dificultățile în succese și facem matematica accesibilă pentru toți elevii care vor să reușească la BAC.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
              <Instagram className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
              <Youtube className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Navigare rapidă</h3>
            <ul className="space-y-2">
              <li>
                <button className="text-muted-foreground hover:text-primary transition-colors">
                  Despre mine
                </button>
              </li>
              <li>
                <button className="text-muted-foreground hover:text-primary transition-colors">
                  Materiale BAC
                </button>
              </li>
              <li>
                <button className="text-muted-foreground hover:text-primary transition-colors">
                  Variante și bareme
                </button>
              </li>
              <li>
                <button className="text-muted-foreground hover:text-primary transition-colors">
                  Pachete meditații
                </button>
              </li>
              <li>
                <button className="text-muted-foreground hover:text-primary transition-colors">
                  Mapa de învățare
                </button>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold mb-4">Servicii</h3>
            <ul className="space-y-2">
              <li className="text-muted-foreground">Meditații individuale online</li>
              <li className="text-muted-foreground">Meditații individuale la domiciliu</li>
              <li className="text-muted-foreground">Meditații în grup online</li>
              <li className="text-muted-foreground">Meditații în grup la domiciliu</li>
              <li className="text-muted-foreground">Materiale educaționale</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">contact@profmatematica.ro</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">+40 123 456 789</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">București, România</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">
            © {currentYear} Prof. Matematică. Toate drepturile rezervate.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <button className="text-muted-foreground hover:text-primary text-sm transition-colors">
              Termeni și condiții
            </button>
            <button className="text-muted-foreground hover:text-primary text-sm transition-colors">
              Politica de confidențialitate
            </button>
            <button className="text-muted-foreground hover:text-primary text-sm transition-colors">
              GDPR
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};