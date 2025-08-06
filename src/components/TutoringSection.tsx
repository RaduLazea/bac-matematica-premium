import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Monitor, Users, Clock, MapPin, CheckCircle, ShoppingCart } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const TutoringSection = () => {
  const [cart, setCart] = useState<any[]>([]);
  const { toast } = useToast();

  const packages = [
    {
      id: 1,
      title: "Meditații Individuale On-Site",
      price: 100,
      duration: "1 oră",
      type: "individual",
      location: "on-site",
      icon: MapPin,
      features: [
        "Atenție personalizată 100%",
        "Materiale adaptate nevoilor tale",
        "Program flexibil",
        "Deplasare la domiciliu",
        "Tableta pentru explicații vizuale"
      ],
      popular: false
    },
    {
      id: 2,
      title: "Meditații Individuale Online",
      price: 100,
      duration: "1 oră",
      type: "individual", 
      location: "online",
      icon: Monitor,
      features: [
        "Atenție personalizată 100%",
        "Platformă interactivă",
        "Înregistrări ale lecțiilor",
        "Materiale digitale",
        "Tableta pentru explicații vizuale"
      ],
      popular: true
    },
    {
      id: 3,
      title: "Meditații Grup On-Site",
      price: 75,
      duration: "1 oră",
      type: "group",
      location: "on-site", 
      icon: Users,
      features: [
        "Grup de 2-4 elevi",
        "Preț redus per elev",
        "Învățare colaborativă",
        "Materiale pentru toți",
        "Tableta pentru explicații vizuale"
      ],
      popular: false
    },
    {
      id: 4,
      title: "Meditații Grup Online",
      price: 75,
      duration: "1 oră",
      type: "group",
      location: "online",
      icon: Monitor,
      features: [
        "Grup de 2-4 elevi",
        "Preț redus per elev",
        "Sesiuni interactive",
        "Chat în timp real",
        "Tableta pentru explicații vizuale"
      ],
      popular: false
    }
  ];

  const addToCart = (packageItem: any) => {
    setCart([...cart, { ...packageItem, quantity: 1, cartId: Date.now() }]);
    toast({
      title: "Adăugat în coș!",
      description: `${packageItem.title} a fost adăugat în coșul de cumpărături.`,
    });
  };

  const handlePayment = async () => {
    if (cart.length === 0) {
      toast({
        title: "Coșul este gol",
        description: "Adăugați pachete în coș pentru a continua.",
        variant: "destructive"
      });
      return;
    }

    try {
      // Process the first item in cart
      const packageItem = cart[0];
      const packageData = {
        title: packageItem.title,
        type: packageItem.type,
        sessionType: packageItem.location,
        hours: 1, // Default 1 hour
        pricePerHour: packageItem.price
      };
      
      const { supabase } = await import("@/integrations/supabase/client");
      
      const { data, error } = await supabase.functions.invoke('create-payment', {
        body: { packageData }
      });

      if (error) throw error;

      if (data?.url) {
        // Open Stripe checkout in a new tab
        window.open(data.url, '_blank');
      }
    } catch (error) {
      console.error('Payment error:', error);
      toast({
        title: "Eroare la procesarea plății",
        description: "A apărut o eroare. Vă rugăm să încercați din nou.",
        variant: "destructive"
      });
    }
  };

  const getPackageIcon = (iconType: any) => {
    const IconComponent = iconType;
    return <IconComponent className="h-6 w-6" />;
  };

  return (
    <section id="pachete" className="py-16 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Pachete de meditații</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Alege pachetul care ți se potrivește cel mai bine. Toate lecțiile sunt prezentate pe tabletă pentru o experiență de învățare optimă.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6 mb-8">
          {packages.map((pkg) => (
            <Card key={pkg.id} className={`hover:shadow-lg transition-shadow relative ${pkg.popular ? 'ring-2 ring-primary' : ''}`}>
              {pkg.popular && (
                <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground">
                  Cel mai popular
                </Badge>
              )}
              
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-primary/10 rounded-full">
                    {getPackageIcon(pkg.icon)}
                  </div>
                </div>
                <CardTitle className="text-xl mb-2">{pkg.title}</CardTitle>
                <div className="text-3xl font-bold text-primary">
                  {pkg.price} RON
                  <span className="text-base font-normal text-muted-foreground">/{pkg.duration}</span>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="flex justify-center space-x-4 text-sm">
                  <Badge variant="outline">
                    {pkg.type === 'individual' ? 'Individual' : 'Grup (2-4 elevi)'}
                  </Badge>
                  <Badge variant="outline">
                    {pkg.location === 'online' ? 'Online' : 'La domiciliu'}
                  </Badge>
                </div>
                
                <ul className="space-y-2">
                  {pkg.features.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className="w-full" 
                  onClick={() => addToCart(pkg)}
                  variant={pkg.popular ? "default" : "outline"}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Adaugă în coș
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Cart Summary */}
        {cart.length > 0 && (
          <Card className="max-w-md mx-auto">
            <CardHeader>
              <CardTitle className="text-center">Coșul tău ({cart.length} articole)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {cart.map((item) => (
                <div key={item.cartId} className="flex justify-between items-center py-2 border-b">
                  <div>
                    <div className="font-medium text-sm">{item.title}</div>
                    <div className="text-xs text-muted-foreground">{item.duration}</div>
                  </div>
                  <div className="font-bold">{item.price} RON</div>
                </div>
              ))}
              
              <div className="flex justify-between items-center font-bold text-lg pt-2 border-t">
                <span>Total:</span>
                <span>{cart.reduce((sum, item) => sum + item.price, 0)} RON</span>
              </div>
              
              <div className="space-y-2">
                <Button className="w-full" size="lg" onClick={handlePayment}>
                  Plătește cu cardul (Stripe)
                </Button>
                <Button variant="outline" className="w-full" size="lg">
                  Plată ramburs
                </Button>
              </div>
              
              <Button 
                variant="ghost" 
                className="w-full" 
                onClick={() => setCart([])}
              >
                Golește coșul
              </Button>
            </CardContent>
          </Card>
        )}

        <div className="text-center mt-12 space-y-4">
          <h3 className="text-xl font-semibold">De ce să alegi meditațiile mele?</h3>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="text-center">
              <Clock className="h-8 w-8 text-primary mx-auto mb-2" />
              <h4 className="font-medium">Program flexibil</h4>
              <p className="text-sm text-muted-foreground">Alegi tu când vrei să învățăm</p>
            </div>
            <div className="text-center">
              <Monitor className="h-8 w-8 text-primary mx-auto mb-2" />
              <h4 className="font-medium">Tehnologie modernă</h4>
              <p className="text-sm text-muted-foreground">Tableta pentru explicații vizuale clare</p>
            </div>
            <div className="text-center">
              <Users className="h-8 w-8 text-primary mx-auto mb-2" />
              <h4 className="font-medium">Abordare personalizată</h4>
              <p className="text-sm text-muted-foreground">Materiale adaptate stilului tău de învățare</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};