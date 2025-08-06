import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { XCircle, ArrowLeft, RotateCcw } from 'lucide-react';

export const PaymentCancelled = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4">
      <Card className="max-w-md w-full text-center">
        <CardHeader>
          <div className="mx-auto w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
            <XCircle className="w-8 h-8 text-orange-600" />
          </div>
          <CardTitle className="text-2xl text-orange-600">Plată anulată</CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Plata a fost anulată. Nu s-a efectuat nicio tranzacție.
          </p>
          
          <div className="text-sm text-muted-foreground space-y-2">
            <p>💡 Puteți încerca din nou oricând</p>
            <p>📞 Pentru întrebări, mă puteți contacta direct</p>
          </div>
          
          <div className="space-y-2 pt-4">
            <Button asChild className="w-full">
              <Link to="/#pachete">
                <RotateCcw className="w-4 h-4 mr-2" />
                Încearcă din nou
              </Link>
            </Button>
            
            <Button asChild variant="outline" className="w-full">
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