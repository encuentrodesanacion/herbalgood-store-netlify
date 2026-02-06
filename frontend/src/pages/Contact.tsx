import { useState } from "react";
import { Mail, Phone, MapPin, Clock, Instagram, Send, MessageCircle, ArrowRight } from "lucide-react";

type ContactProps = {
  onNavigate: (page: string) => void;
};

export default function Contact({ onNavigate }: ContactProps) {
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('sending');
    // Simulamos el envío
    setTimeout(() => {
      setFormStatus('success');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-natural-cream font-sans text-dark-slate">
      
      {/* Header Contacto */}
      <header className="relative py-20 px-4 text-center bg-white shadow-sm overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <span className="text-brand-rose font-bold tracking-[0.2em] uppercase text-xs mb-4 block">
            Estamos aquí para ti
          </span>
          <h1 className="text-5xl md:text-6xl font-bold text-dark-slate mb-6 font-serif">
            Hablemos de Plantas
          </h1>
          <p className="text-xl text-gray-600 font-light max-w-2xl mx-auto italic">
            ¿Tienes dudas sobre cuidados, buscas un proyecto a medida o simplemente quieres saludar? Escríbenos.
          </p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* COLUMNA IZQUIERDA: Información */}
          <div className="space-y-10">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-32 h-32 bg-brand-bg rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-110 transition-transform duration-500"></div>
               
               <h3 className="text-2xl font-bold mb-8 font-serif">Visítanos</h3>
               
               <div className="space-y-6">
                 <div className="flex items-start gap-4">
                    <div className="bg-brand-bg p-3 rounded-full text-primary-green shrink-0">
                      <MapPin size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">Showroom & Vivero</h4>
                      <p className="text-gray-600">Av. Nueva Providencia 1234, Of. 601<br/>Providencia, Santiago.</p>
                      <a href="#" className="text-primary-green text-sm font-bold hover:underline mt-1 inline-block">Ver en Google Maps</a>
                    </div>
                 </div>

                 <div className="flex items-start gap-4">
                    <div className="bg-brand-bg p-3 rounded-full text-primary-green shrink-0">
                      <Clock size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">Horarios</h4>
                      <p className="text-gray-600">Lunes a Viernes: 10:00 - 19:00 hrs<br/>Sábados: 10:00 - 14:00 hrs</p>
                    </div>
                 </div>
               </div>
            </div>

            <div className="bg-dark-slate text-white p-8 rounded-3xl shadow-lg relative overflow-hidden">
               <div className="relative z-10">
                 <h3 className="text-2xl font-bold mb-4 font-serif">Contacto Directo</h3>
                 <div className="space-y-4">
                   <a href="mailto:hola@pinpilinpausha.cl" className="flex items-center gap-3 hover:text-brand-rose transition-colors text-lg">
                     <Mail className="text-brand-rose" /> hola@pinpilinpausha.cl
                   </a>
                   <a href="tel:+56912345678" className="flex items-center gap-3 hover:text-brand-rose transition-colors text-lg">
                     <Phone className="text-brand-rose" /> +56 9 1234 5678
                   </a>
                   <a href="#" className="flex items-center gap-3 hover:text-brand-rose transition-colors text-lg">
                     <Instagram className="text-brand-rose" /> @pinpilinpausha
                   </a>
                 </div>
               </div>
               {/* Decoración */}
               <MessageCircle className="absolute -bottom-4 -right-4 text-white/5 w-40 h-40" />
            </div>
          </div>

          {/* COLUMNA DERECHA: Formulario */}
          <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border-t-4 border-brand-rose">
            {formStatus === 'success' ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-10 animate-fade-in-up">
                <div className="w-20 h-20 bg-green-100 text-primary-green rounded-full flex items-center justify-center mb-6">
                  <Send size={40} />
                </div>
                <h3 className="text-3xl font-bold text-dark-slate mb-4">¡Mensaje Enviado!</h3>
                <p className="text-gray-600 mb-8 max-w-md">
                  Gracias por contactarnos. Nuestro equipo (humano, no botánico) te responderá dentro de las próximas 24 horas.
                </p>
                <button 
                  onClick={() => setFormStatus('idle')}
                  className="text-primary-green font-bold hover:underline"
                >
                  Enviar otro mensaje
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h3 className="text-2xl font-bold mb-6 font-serif">Envíanos un mensaje</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 ml-1">Nombre</label>
                    <input required type="text" placeholder="Tu nombre" className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-rose/50 focus:border-brand-rose transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 ml-1">Apellido</label>
                    <input type="text" placeholder="Tu apellido" className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-rose/50 focus:border-brand-rose transition-all" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 ml-1">Email</label>
                  <input required type="email" placeholder="nombre@ejemplo.com" className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-rose/50 focus:border-brand-rose transition-all" />
                </div>

                <div className="space-y-2">
                   <label className="text-sm font-bold text-gray-700 ml-1">Asunto</label>
                   <select className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-rose/50 focus:border-brand-rose transition-all text-gray-600">
                     <option>Consulta General</option>
                     <option>Cotización Corporativa</option>
                     <option>Estado de mi pedido</option>
                     <option>Asesoría sobre cuidados</option>
                   </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 ml-1">Mensaje</label>
                  <textarea required rows={5} placeholder="Cuéntanos, ¿en qué podemos ayudarte?" className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-rose/50 focus:border-brand-rose transition-all resize-none"></textarea>
                </div>

                <button 
                  type="submit" 
                  disabled={formStatus === 'sending'}
                  className="w-full bg-dark-slate text-white py-4 rounded-xl font-bold hover:bg-primary-green transition-all shadow-lg flex items-center justify-center gap-2 group"
                >
                  {formStatus === 'sending' ? (
                    "Enviando..."
                  ) : (
                    <>Enviar Mensaje <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" /></>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-20">
           <h2 className="text-3xl font-bold text-center mb-10 font-serif">Preguntas Frecuentes</h2>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { q: "¿Hacen envíos a regiones?", a: "Por el momento, solo realizamos envíos de plantas vivas dentro de la Región Metropolitana para asegurar su bienestar." },
                { q: "¿Las plantas tienen garantía?", a: "Sí, ofrecemos una garantía de 30 días. Si tu planta no se adapta o llega dañada, la evaluamos y reponemos." },
                { q: "¿Ofrecen servicio de trasplante?", a: "¡Claro! Puedes traer tu macetero o comprar uno en la tienda y nosotros hacemos el trasplante con el sustrato adecuado." }
              ].map((faq, i) => (
                <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:border-brand-rose transition-colors">
                   <h4 className="font-bold text-lg mb-3 text-dark-slate">{faq.q}</h4>
                   <p className="text-gray-600 text-sm leading-relaxed">{faq.a}</p>
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
}