import { Heart, Users, Sprout, Globe, Coffee, Award } from "lucide-react";

type AboutProps = {
  onNavigate: (page: string) => void;
};

export default function About({ onNavigate }: AboutProps) {
  return (
    <div className="min-h-screen bg-natural-cream font-sans text-dark-slate">
      
      {/* 1. HERO SECTION: La Esencia */}
      <header className="relative py-24 px-4 text-center bg-white overflow-hidden">
        {/* Textura de fondo sutil */}
        <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/concrete-wall.png')]"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto">
          <span className="text-brand-rose font-bold tracking-[0.3em] uppercase text-xs mb-6 block animate-fade-in">
            Nuestra Raíz
          </span>
          <h1 className="text-5xl md:text-7xl font-bold text-dark-slate mb-8 font-serif leading-tight">
            Más que plantas, <br/>
            <span className="text-primary-green italic">cultivamos vida.</span>
          </h1>
          <p className="text-xl text-gray-600 font-light max-w-2xl mx-auto leading-relaxed">
            En Pinpilinpausha creemos que cada hoja cuenta una historia y que la naturaleza no es un adorno, sino una necesidad vital para el bienestar humano.
          </p>
        </div>
      </header>

      {/* 2. NUESTRA HISTORIA (Layout Imagen/Texto) */}
      <section className="py-20 max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-16">
           
           {/* Imagen Artística */}
           <div className="w-full md:w-1/2 relative">
              <div className="absolute top-4 -left-4 w-full h-full border-2 border-brand-rose rounded-3xl z-0"></div>
              <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl h-[500px]">
                 <img 
                   src="https://images.pexels.com/photos/4503269/pexels-photo-4503269.jpeg" 
                   alt="Fundadora cuidando plantas" 
                   className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                 />
              </div>
           </div>

           {/* Texto Narrativo */}
           <div className="w-full md:w-1/2">
              <h2 className="text-3xl font-bold mb-6 font-serif">De un pequeño balcón a una selva urbana</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Todo comenzó hace 10 años en un pequeño departamento en Santiago Centro. Lo que empezó como un intento por rescatar un Gomero moribundo, se transformó en una obsesión por entender el lenguaje silencioso de las plantas.
              </p>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Hoy, <strong>Pinpilinpausha</strong> (que significa "mariposa" en euskera, simbolizando la transformación) es un refugio para quienes buscan reconectar con la naturaleza en medio del caos de la ciudad. No solo vendemos plantas; entregamos compañeros de vida seleccionados a mano.
              </p>
              
              <div className="flex gap-8 border-t border-gray-200 pt-8">
                 <div>
                    <span className="block text-4xl font-bold text-brand-rose mb-1 font-serif">10+</span>
                    <span className="text-xs uppercase tracking-widest text-gray-500">Años de Experiencia</span>
                 </div>
                 <div>
                    <span className="block text-4xl font-bold text-brand-rose mb-1 font-serif">5k+</span>
                    <span className="text-xs uppercase tracking-widest text-gray-500">Hogares Verdes</span>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* 3. MANIFIESTO / VALORES (Grid de Tarjetas) */}
      <section className="bg-white py-20 border-y border-gray-100">
         <div className="max-w-7xl mx-auto px-4 text-center">
            <span className="text-primary-green font-bold tracking-widest uppercase text-xs mb-3 block">Filosofía</span>
            <h2 className="text-3xl font-bold mb-16 font-serif">Por qué elegirnos</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
               {[
                 {
                   icon: <Heart size={32} />,
                   title: "Curaduría con Amor",
                   desc: "No vendemos nada que no pondríamos en nuestra propia casa. Cada planta es inspeccionada raíz por raíz."
                 },
                 {
                   icon: <Sprout size={32} />,
                   title: "Sostenibilidad Real",
                   desc: "Trabajamos con viveros locales, reducimos el plástico en nuestros empaques y promovemos el cultivo responsable."
                 },
                 {
                   icon: <Users size={32} />,
                   title: "Comunidad y Apoyo",
                   desc: "La venta es solo el comienzo. Te acompañamos con guías, consejos y soporte para que tu planta prospere."
                 }
               ].map((item, i) => (
                 <div key={i} className="group p-8 rounded-2xl bg-brand-bg/30 hover:bg-brand-rose/10 transition-colors duration-300">
                    <div className="w-16 h-16 mx-auto bg-white rounded-full flex items-center justify-center text-brand-rose mb-6 shadow-sm group-hover:scale-110 transition-transform">
                      {item.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-4 text-dark-slate">{item.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* 4. EL EQUIPO (Toque Humano) */}
      <section className="py-20 max-w-7xl mx-auto px-4">
         <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 font-serif">Mentes Maestras</h2>
            <p className="text-gray-500 max-w-xl mx-auto">El equipo detrás de cada envío, cada trasplante y cada consejo.</p>
         </div>

         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: "Sofía", role: "Fundadora & Paisajista", img: "https://images.pexels.com/photos/3775534/pexels-photo-3775534.jpeg" },
              { name: "Carlos", role: "Jefe de Vivero", img: "https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg" },
              { name: "Elena", role: "Diseño de Interiores", img: "https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg" },
              { name: "Tomás", role: "Logística y Cuidados", img: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg" }
            ].map((member, i) => (
               <div key={i} className="text-center group">
                  <div className="w-48 h-48 mx-auto rounded-full overflow-hidden mb-6 border-4 border-white shadow-lg relative">
                     <div className="absolute inset-0 bg-primary-green/20 opacity-0 group-hover:opacity-100 transition-opacity z-10"></div>
                     <img src={member.img} alt={member.name} className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500" />
                  </div>
                  <h4 className="text-xl font-bold text-dark-slate">{member.name}</h4>
                  <p className="text-brand-rose text-sm font-medium uppercase tracking-wide">{member.role}</p>
               </div>
            ))}
         </div>
      </section>

      {/* 5. CTA FINAL (Banner Visual) */}
      <section className="relative py-24 text-center text-white overflow-hidden">
         <div className="absolute inset-0 bg-dark-slate">
            <img src="https://images.pexels.com/photos/796602/pexels-photo-796602.jpeg" className="w-full h-full object-cover opacity-30" alt="Fondo" />
         </div>
         <div className="relative z-10 max-w-3xl mx-auto px-4">
            <h2 className="text-3xl md:text-5xl font-bold mb-8 font-serif">Únete a nuestra comunidad verde</h2>
            <p className="text-lg text-gray-300 mb-10">
               Suscríbete a nuestro newsletter y recibe consejos semanales, acceso a preventas exclusivas y un 10% de descuento en tu primera compra.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
               <input type="email" placeholder="Tu correo electrónico" className="flex-1 px-6 py-4 rounded-full text-dark-slate focus:outline-none" />
               <button className="bg-primary-green text-white px-8 py-4 rounded-full font-bold hover:bg-brand-rose transition-colors">
                  Suscribirme
               </button>
            </div>
         </div>
      </section>

    </div>
  );
}