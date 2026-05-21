// src/pages/Contact.tsx

import { useState } from "react";
import { Mail, Phone, MapPin, Clock, Instagram, Send, MessageCircle, ArrowRight, Rabbit } from "lucide-react";

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
    <div className="min-h-screen bg-green-50/50 font-sans text-stone-900">
      
      {/* Header Contacto */}
      <header className="relative py-20 px-4 text-center bg-white shadow-sm overflow-hidden border-b border-green-100">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/leaves-pattern.png')]"></div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <span className="text-green-600 font-bold tracking-[0.2em] uppercase text-xs mb-4 block">
            Estamos aquí para ti y tu futuro compañero
          </span>
          <h1 className="text-5xl md:text-6xl font-bold text-stone-900 mb-6 font-serif flex items-center justify-center gap-4">
            Hablemos <Rabbit size={48} className="text-green-600" />
          </h1>
          <p className="text-xl text-stone-600 font-light max-w-2xl mx-auto italic">
            ¿Tienes dudas sobre la llegada de tu orejudo, buscas información sobre próximas camadas o necesitas asesoría sobre cuidados? Escríbenos.
          </p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* COLUMNA IZQUIERDA: Información */}
          <div className="space-y-10">
            <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-stone-100 relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-32 h-32 bg-green-50 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-110 transition-transform duration-500"></div>
               
               <h3 className="text-2xl font-bold mb-8 font-serif text-stone-800">Visita nuestro Criadero</h3>
               
               <div className="space-y-6">
                 <div className="flex items-start gap-4">
                    <div className="bg-green-100 p-3 rounded-full text-green-700 shrink-0">
                      <MapPin size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-stone-800">Instalaciones Chileconejitos</h4>
                      <p className="text-stone-600">Parcela 42, Sector El Remanso<br/>Talagante, Región Metropolitana.</p>
                      <a href="#" className="text-green-600 text-sm font-bold hover:underline mt-1 inline-block">Ver indicaciones en Google Maps</a>
                    </div>
                 </div>

                 <div className="flex items-start gap-4">
                    <div className="bg-green-100 p-3 rounded-full text-green-700 shrink-0">
                      <Clock size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-stone-800">Horarios de Visita</h4>
                      <p className="text-stone-600 mb-1">Para no estresar a nuestros ejemplares, funcionamos exclusivamente mediante agenda previa.</p>
                      <p className="text-stone-500 text-sm font-bold">Martes a Sábado: 10:00 - 17:00 hrs</p>
                    </div>
                 </div>
               </div>
            </div>

            <div className="bg-stone-900 text-white p-8 rounded-[2rem] shadow-lg relative overflow-hidden">
               <div className="relative z-10">
                 <h3 className="text-2xl font-bold mb-4 font-serif">Contacto Directo</h3>
                 <div className="space-y-4 mt-8">
                   <a href="mailto:info@chileconejitos.cl" className="flex items-center gap-4 hover:text-green-400 transition-colors text-lg group">
                     <Mail className="text-green-500 group-hover:scale-110 transition-transform" /> info@chileconejitos.cl
                   </a>
                   <a href="tel:+56912345678" className="flex items-center gap-4 hover:text-green-400 transition-colors text-lg group">
                     <Phone className="text-green-500 group-hover:scale-110 transition-transform" /> +56 9 1234 5678
                   </a>
                   <a href="#" className="flex items-center gap-4 hover:text-green-400 transition-colors text-lg group">
                     <Instagram className="text-green-500 group-hover:scale-110 transition-transform" /> @chileconejito
                   </a>
                 </div>
               </div>
               {/* Decoración */}
               <MessageCircle className="absolute -bottom-4 -right-4 text-white/5 w-40 h-40" />
            </div>
          </div>

          {/* COLUMNA DERECHA: Formulario */}
          <div className="bg-white p-8 md:p-12 rounded-[2rem] shadow-xl border-t-4 border-green-500">
            {formStatus === 'success' ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-10 animate-fade-in-up">
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                  <Send size={40} />
                </div>
                <h3 className="text-3xl font-bold text-stone-900 mb-4">¡Mensaje Enviado!</h3>
                <p className="text-stone-600 mb-8 max-w-md">
                  Gracias por escribirnos. Nuestro equipo (completamente humano, no orejudo) te responderá dentro de las próximas 24 horas.
                </p>
                <button 
                  onClick={() => setFormStatus('idle')}
                  className="text-green-700 font-bold hover:underline"
                >
                  Enviar otro mensaje
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h3 className="text-2xl font-bold mb-6 font-serif text-stone-800">Déjanos tus dudas</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-stone-700 ml-1">Nombre</label>
                    <input required type="text" placeholder="Tu nombre" className="w-full px-4 py-3 rounded-2xl bg-stone-50 border border-stone-200 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500 transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-stone-700 ml-1">Apellido</label>
                    <input type="text" placeholder="Tu apellido" className="w-full px-4 py-3 rounded-2xl bg-stone-50 border border-stone-200 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500 transition-all" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-stone-700 ml-1">Email</label>
                  <input required type="email" placeholder="nombre@ejemplo.com" className="w-full px-4 py-3 rounded-2xl bg-stone-50 border border-stone-200 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500 transition-all" />
                </div>

                <div className="space-y-2">
                   <label className="text-sm font-bold text-stone-700 ml-1">Asunto</label>
                   <select className="w-full px-4 py-3 rounded-2xl bg-stone-50 border border-stone-200 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500 transition-all text-stone-600">
                     <option>Información sobre próximas camadas</option>
                     <option>Asesoría de cuidados previos a la llegada</option>
                     <option>Estado de mi reserva</option>
                     <option>Consultas sobre alimentos y suministros</option>
                     <option>Consulta General</option>
                   </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-stone-700 ml-1">Mensaje</label>
                  <textarea required rows={5} placeholder="Cuéntanos, ¿en qué podemos ayudarte o qué ejemplar buscas?" className="w-full px-4 py-3 rounded-2xl bg-stone-50 border border-stone-200 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500 transition-all resize-none"></textarea>
                </div>

                <button 
                  type="submit" 
                  disabled={formStatus === 'sending'}
                  className="w-full bg-stone-900 text-white py-4 rounded-2xl font-bold hover:bg-green-600 transition-all shadow-lg flex items-center justify-center gap-2 group mt-4"
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
        <div className="mt-24">
           <h2 className="text-3xl font-bold text-center mb-10 font-serif text-stone-800">Preguntas Frecuentes sobre la Adopción</h2>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { q: "¿Hacen envíos a otras regiones?", a: "Para proteger el bienestar y evitar el estrés de nuestros conejos, las entregas se realizan exclusivamente de forma presencial en nuestras instalaciones o mediante transporte especializado dentro de la región." },
                { q: "¿Entregan certificados de salud?", a: "Sí, todos nuestros ejemplares se entregan desparasitados, con su revisión veterinaria de exóticos al día y con una garantía de salud ante enfermedades congénitas." },
                { q: "¿Ofrecen asesoría post-entrega?", a: "¡Por supuesto! Nuestra responsabilidad no termina cuando te llevas a tu conejo. Mantenemos comunicación abierta para apoyarte con su nutrición, adaptación y comportamiento a largo plazo." }
              ].map((faq, i) => (
                <div key={i} className="bg-white p-8 rounded-3xl shadow-sm border border-stone-100 hover:border-green-500/50 hover:shadow-md transition-all">
                   <h4 className="font-bold text-lg mb-4 text-stone-800">{faq.q}</h4>
                   <p className="text-stone-600 text-sm leading-relaxed">{faq.a}</p>
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
}