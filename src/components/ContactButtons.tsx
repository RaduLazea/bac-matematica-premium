import { MessageCircle, Instagram } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const ContactButtons = () => {
  const handleWhatsAppClick = () => {
    const phoneNumber = "+40740123456"; // Replace with your actual WhatsApp number
    const message = "Salut! Am o întrebare despre lecțiile de matematică.";
    const whatsappUrl = `https://wa.me/${phoneNumber.replace('+', '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleInstagramClick = () => {
    const instagramUsername = "prof_matematica_oficial"; // Replace with your actual Instagram username
    const instagramUrl = `https://instagram.com/${instagramUsername}`;
    window.open(instagramUrl, '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-40">
      <Button
        onClick={handleWhatsAppClick}
        className="w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 text-white shadow-lg"
        title="Contactează-mă pe WhatsApp"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
      
      <Button
        onClick={handleInstagramClick}
        className="w-14 h-14 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg"
        title="Urmărește-mă pe Instagram"
      >
        <Instagram className="h-6 w-6" />
      </Button>
    </div>
  );
};