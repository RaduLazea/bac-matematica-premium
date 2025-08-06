import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, ArrowLeft } from 'lucide-react';

export const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time for better UX
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Verificăm plata...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4">
      <Card className="max-w-md w-full text-center">
        <CardHeader>
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <CardTitle className="text-2xl text-green-600">Plată reușită!</CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Mulțumim pentru comandă! Plata a fost procesată cu succes.
          </p>
          
          {sessionId && (
            <div className="bg-muted p-3 rounded-lg">
              <p className="text-sm font-mono text-muted-foreground">
                ID sesiune: {sessionId.substring(0, 20)}...
              </p>
            </div>
          )}
          
          <div className="text-sm text-muted-foreground space-y-2">
            <p>📧 Veți primi un email de confirmare în scurt timp</p>
            <p>📞 Vă voi contacta pentru programarea primei lecții</p>
          </div>
          
          <div className="space-y-2 pt-4">
            <Button asChild className="w-full">
              <Link to="/">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Înapoi la pagina principală
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};