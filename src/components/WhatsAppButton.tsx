import { MessageCircle } from 'lucide-react';

export default function WhatsAppButton() {
  const handleWhatsAppClick = () => {
    const message = "Bonjour, j'aimerais contacter l'admin de Mëønifïk FF 🔥";
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/261376224442?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <button
      onClick={handleWhatsAppClick}
      className="fixed bottom-6 right-6 w-14 h-14 bg-orange-500 hover:bg-orange-600 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 z-50"
      aria-label="Contacter WhatsApp"
      title="Contacter l'admin"
    >
      <MessageCircle className="w-7 h-7 text-white" />
    </button>
  );
}
