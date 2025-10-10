// src/pages/Contact.tsx

import { Mail, Phone, MapPin, Send } from "lucide-react";

type ContactProps = {
  onNavigate: (page: string) => void;
};

export default function Contact({ onNavigate }: ContactProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Mensaje enviado con éxito. ¡Gracias por contactarnos!");
    // Lógica para enviar el formulario a un API/Backend
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-dark-slate mb-4">
          Hablemos de Bienestar
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          ¿Tienes preguntas sobre nuestros productos, pedidos o buscas una
          colaboración? Escríbenos.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Información de Contacto */}
        <div className="space-y-6 md:col-span-1">
          <ContactInfoCard
            icon={Mail}
            title="Email de Soporte"
            text="soporte@herbopag.com"
            link="mailto:soporte@herbopag.com"
          />
          <ContactInfoCard
            icon={Phone}
            title="Llámanos"
            text="+56 9 1234 5678"
            link="tel:+56912345678"
          />
          <ContactInfoCard
            icon={MapPin}
            title="Oficina Central (Simulada)"
            text="Av. El Bosque Norte 500, Santiago, Chile"
            link="#"
          />
        </div>

        {/* Formulario de Contacto */}
        <div className="md:col-span-2 bg-white p-8 rounded-xl shadow-lg border border-gray-100">
          <h2 className="text-2xl font-bold text-dark-slate mb-6">
            Envíanos un Mensaje
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Nombre Completo
              </label>
              <input
                type="text"
                id="name"
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-primary-green focus:border-primary-green"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-primary-green focus:border-primary-green"
              />
            </div>
            <div>
              <label
                htmlFor="subject"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Asunto
              </label>
              <input
                type="text"
                id="subject"
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-primary-green focus:border-primary-green"
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Mensaje
              </label>
              <textarea
                id="message"
                rows={5}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-primary-green focus:border-primary-green"
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-primary-green text-white px-6 py-3 rounded-full font-semibold hover:bg-dark-slate transition-colors flex items-center gap-2"
            >
              Enviar Mensaje <Send size={20} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

// Componente Auxiliar
const ContactInfoCard = ({
  icon: Icon,
  title,
  text,
  link,
}: {
  icon: any;
  title: string;
  text: string;
  link: string;
}) => (
  <div className="flex items-start p-4 bg-gray-50 rounded-lg border border-gray-200">
    <Icon size={24} className="text-primary-green flex-shrink-0 mt-1" />
    <div className="ml-4">
      <h3 className="font-semibold text-dark-slate">{title}</h3>
      <a
        href={link}
        className="text-gray-600 hover:text-primary-green transition-colors text-sm break-words"
      >
        {text}
      </a>
    </div>
  </div>
);
