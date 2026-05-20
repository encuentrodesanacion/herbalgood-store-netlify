// src/pages/About.tsx

import { Heart, Users, Leaf } from "lucide-react";

type AboutProps = {
  onNavigate: (page: string) => void;
};

export default function About({ onNavigate }: AboutProps) {
  return (
    <div className="min-h-screen bg-green-50/50 font-sans text-stone-900">
      
      {/* 1. HERO SECTION: La Esencia */}
      <header className="relative py-24 px-4 text-center bg-white overflow-hidden">
        {/* Textura de fondo sutil de hojas (opcional visual) */}
        <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/leaves-pattern.png')]"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto">
          <span className="text-green-700 font-bold tracking-[0.3em] uppercase text-xs mb-6 block animate-fade-in">
            Nuestra Filosofía
          </span>
          <h1 className="text-5xl md:text-7xl font-bold text-stone-900 mb-8 font-serif leading-tight">
            Más que criar, <br/>
            <span className="text-green-600 italic">fomentamos el bienestar.</span>
          </h1>
          <p className="text-xl text-stone-600 font-light max-w-2xl mx-auto leading-relaxed">
            En Chile Conejitos creemos que cada orejudo merece una vida plena. No solo somos criadores, somos promotores de la tenencia responsable y el respeto profundo por los animales.
          </p>
        </div>
      </header>

      {/* 2. NUESTRA HISTORIA (Layout Imagen/Texto) */}
      <section className="py-20 max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-16">
           
           {/* Imagen Artística */}
           <div className="w-full md:w-1/2 relative">
              <div className="absolute top-4 -left-4 w-full h-full border-2 border-green-400 rounded-[2.5rem] z-0"></div>
              <div className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-2xl h-[500px]">
                 <img 
                   src="https://images.pexels.com/photos/4588052/pexels-photo-4588052.jpeg" 
                   alt="Cuidadora sosteniendo un conejo" 
                   className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                 />
              </div>
           </div>

           {/* Texto Narrativo */}
           <div className="w-full md:w-1/2">
              <h2 className="text-3xl font-bold mb-6 font-serif text-stone-800">De una vocación a un criadero ético</h2>
              <p className="text-stone-600 mb-6 leading-relaxed">
                Todo comenzó hace 10 años con nuestra primera coneja, Luna. Lo que empezó como fascinación por el carácter afable de estos pequeños animales, se transformó en una profunda dedicación por estudiar su genética, nutrición y comportamiento.
              </p>
              <p className="text-stone-600 mb-8 leading-relaxed">
                Hoy, <strong>Rabbit Boutique</strong> es un refugio para quienes buscan un compañero sano y equilibrado. No solo entregamos conejos; criamos con respeto, priorizando líneas de sangre puras y un entorno libre de estrés para que se integren perfectamente a tu familia.
              </p>
              
              <div className="flex gap-8 border-t border-green-200 pt-8">
                 <div>
                    <span className="block text-4xl font-bold text-green-700 mb-1 font-serif">10+</span>
                    <span className="text-xs uppercase tracking-widest text-stone-500">Años de Experiencia</span>
                 </div>
                 <div>
                    <span className="block text-4xl font-bold text-green-700 mb-1 font-serif">500+</span>
                    <span className="text-xs uppercase tracking-widest text-stone-500">Familias Felices</span>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* 3. MANIFIESTO / VALORES (Grid de Tarjetas) */}
      <section className="bg-white py-20 border-y border-green-100">
         <div className="max-w-7xl mx-auto px-4 text-center">
            <span className="text-green-600 font-bold tracking-widest uppercase text-xs mb-3 block">Nuestros Pilares</span>
            <h2 className="text-3xl font-bold mb-16 font-serif text-stone-800">Por qué confiar en nosotros</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
               {[
                 {
                   icon: <Heart size={32} />,
                   title: "Crianza Ética",
                   desc: "Respetamos los tiempos naturales. Nuestras madres tienen amplios periodos de descanso, camadas reducidas y espacios que simulan su hábitat natural."
                 },
                 {
                   icon: <Leaf size={32} />,
                   title: "Bienestar Integral",
                   desc: "Garantizamos alimentación premium a base de heno orgánico, revisiones veterinarias exhaustivas y un entorno enriquecido física y mentalmente."
                 },
                 {
                   icon: <Users size={32} />,
                   title: "Asesoría Continua",
                   desc: "No desaparecemos tras la adopción. Fomentamos la educación cunicular y estamos siempre disponibles para guiar a las nuevas familias."
                 }
               ].map((item, i) => (
                 <div key={i} className="group p-8 rounded-3xl bg-green-50/50 hover:bg-green-100/80 transition-colors duration-300 border border-green-50">
                    <div className="w-16 h-16 mx-auto bg-white rounded-full flex items-center justify-center text-green-600 mb-6 shadow-sm group-hover:scale-110 transition-transform">
                      {item.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-4 text-stone-800">{item.title}</h3>
                    <p className="text-stone-600 text-sm leading-relaxed">{item.desc}</p>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* 4. EL EQUIPO (Toque Humano) */}
      <section className="py-20 max-w-7xl mx-auto px-4">
         <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 font-serif text-stone-800">Nuestros Sponsor</h2>
            <p className="text-stone-500 max-w-xl mx-auto">Profesionales apasionados dedicados a la salud, genética y felicidad de cada ejemplar.</p>
         </div>

         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
            {[
              { name: "Animal Care", role: "", img: "https://images.pexels.com/photos/1766604/pexels-photo-1766604.jpeg" },
              { name: "CasasConejos", role: "Casas para Conejos", img: "https://images.pexels.com/photos/7356064/pexels-photo-7356064.jpeg" },
              { name: "MyBoxBonny", role: "Membresia para Conejos de Mascota", img: "https://images.pexels.com/photos/1054415/pexels-photo-1054415.jpeg" },
              { name: "Tikinazo", role: "Merchandising para humanos y Conejos", img: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg" },
                { name: "Pletuditos", role: "Accesorios varios para Mascotas", img: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg" }
            ].map((member, i) => (
               <div key={i} className="text-center group">
                  <div className="w-48 h-48 mx-auto rounded-full overflow-hidden mb-6 border-4 border-white shadow-xl relative">
                     <div className="absolute inset-0 bg-green-600/20 opacity-0 group-hover:opacity-100 transition-opacity z-10"></div>
                     <img src={member.img} alt={member.name} className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500" />
                  </div>
                  <h4 className="text-xl font-bold text-stone-800">{member.name}</h4>
                  <p className="text-green-700 text-sm font-bold uppercase tracking-wide mt-1">{member.role}</p>
               </div>
            ))}
         </div>
      </section>

      {/* 5. CTA FINAL (Banner Visual) */}
      <section className="relative py-24 text-center text-white overflow-hidden mt-10">
         <div className="absolute inset-0 bg-green-900">
            <img src="https://images.pexels.com/photos/3313348/pexels-photo-3313348.jpeg" className="w-full h-full object-cover opacity-30 mix-blend-overlay" alt="Conejo en la naturaleza" />
         </div>
         <div className="relative z-10 max-w-3xl mx-auto px-4">
            <h2 className="text-3xl md:text-5xl font-bold mb-8 font-serif">Únete a nuestra comunidad</h2>
            <p className="text-lg text-green-100 mb-10">
               Suscríbete a nuestro boletín y recibe guías de cuidado veterinario, novedades de nuestras próximas camadas y un 10% de descuento en alimento premium.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
               <input type="email" placeholder="Tu correo electrónico" className="flex-1 px-6 py-4 rounded-full text-stone-900 focus:outline-none focus:ring-4 focus:ring-green-500/50 shadow-lg" />
               <button className="bg-white text-green-900 px-8 py-4 rounded-full font-bold hover:bg-green-50 transition-colors shadow-lg">
                  Suscribirme
               </button>
            </div>
         </div>
      </section>

    </div>
  );
}