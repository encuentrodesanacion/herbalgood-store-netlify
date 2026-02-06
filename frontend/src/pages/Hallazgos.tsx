import { useState } from "react";
import { ArrowRight, History, Gem, Clock } from "lucide-react";

type HallazgosProps = {
  onNavigate: (page: string, productId?: string) => void;
};

// Datos simulados de antigüedades
const antiques = [
  {
    id: 1,
    title: "Jarrón Terracota S. XIX",
    era: "1890 ca.",
    material: "Arcilla cocida",
    price: 85000,
    image: "https://images.pexels.com/photos/3631430/pexels-photo-3631430.jpeg",
    description: "Recuperado de una casona en Valparaíso. Perfecto para flores secas.",
    status: "Disponible"
  },
  {
    id: 2,
    title: "Regadera de Bronce",
    era: "1950",
    material: "Bronce patinado",
    price: 45000,
    image: "https://images.pexels.com/photos/7195228/pexels-photo-7195228.jpeg",
    description: "Funcional y decorativa. La pátina del tiempo le da un carácter único.",
    status: "Vendido"
  },
  {
    id: 3,
    title: "Tijeras de Poda Japonesas",
    era: "Vintage",
    material: "Acero Carbono",
    price: 32000,
    image: "https://images.pexels.com/photos/4207909/pexels-photo-4207909.jpeg",
    description: "Herramienta de colección con mango forrado en cuero envejecido.",
    status: "Disponible"
  },
  {
    id: 4,
    title: "Pedestal de Madera Roble",
    era: "1920",
    material: "Roble Americano",
    price: 120000,
    image: "https://images.pexels.com/photos/1090638/pexels-photo-1090638.jpeg",
    description: "Torneado a mano. La altura ideal para lucir un helecho colgante.",
    status: "Disponible"
  }
];

export default function Hallazgos({ onNavigate }: HallazgosProps) {
  
  return (
    <div className="min-h-screen bg-natural-cream font-sans text-dark-slate">
      
      {/* Header Estilo "Curador" */}
      <header className="relative py-24 px-4 text-center bg-white border-b border-stone-200">
        <div className="relative z-10 max-w-4xl mx-auto">
          <span className="text-brand-rose font-bold tracking-[0.3em] uppercase text-xs mb-4 block">
            Colección Privada
          </span>
          <h1 className="text-5xl md:text-7xl font-bold text-dark-slate mb-6 font-serif">
            Hallazgos Únicos
          </h1>
          <p className="text-xl text-gray-500 font-light max-w-2xl mx-auto italic font-serif">
            "Objetos con alma que han viajado a través del tiempo para encontrar un nuevo hogar en tu jardín."
          </p>
        </div>
      </header>

      {/* Grid de Tesoros */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
          
          {antiques.map((item) => (
            <div key={item.id} className="group flex flex-col gap-6">
              {/* Marco de Imagen tipo Cuadro */}
              <div className="relative overflow-hidden aspect-[4/5] bg-stone-100 shadow-lg cursor-pointer">
                 <div className="absolute top-4 left-4 z-10 flex gap-2">
                    {item.status === 'Vendido' ? (
                      <span className="bg-stone-800 text-white px-3 py-1 text-xs font-bold uppercase tracking-widest">Vendido</span>
                    ) : (
                      <span className="bg-white/90 text-dark-slate px-3 py-1 text-xs font-bold uppercase tracking-widest">Pieza Única</span>
                    )}
                 </div>
                 
                 <img 
                   src={item.image} 
                   alt={item.title} 
                   className={`w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 ${item.status === 'Vendido' ? 'grayscale opacity-80' : ''}`}
                 />
                 
                 {/* Overlay al hover */}
                 <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                    <button className="bg-white text-dark-slate px-8 py-3 font-bold uppercase tracking-widest text-xs hover:bg-brand-rose hover:text-white transition-colors">
                      {item.status === 'Vendido' ? 'Ver Similar' : 'Examinar Pieza'}
                    </button>
                 </div>
              </div>

              {/* Ficha Técnica del Objeto */}
              <div className="text-center md:text-left border-t border-stone-300 pt-6">
                 <div className="flex flex-col md:flex-row justify-between items-baseline mb-2">
                    <h3 className="text-2xl font-bold font-serif text-dark-slate">{item.title}</h3>
                    <span className="text-xl font-light text-brand-rose">${item.price.toLocaleString('es-CL')}</span>
                 </div>
                 
                 <div className="flex justify-center md:justify-start gap-6 text-xs text-gray-500 uppercase tracking-wider mb-4">
                    <span className="flex items-center gap-1"><Clock size={12}/> {item.era}</span>
                    <span className="flex items-center gap-1"><Gem size={12}/> {item.material}</span>
                 </div>

                 <p className="text-gray-600 leading-relaxed mb-6 font-light">
                   {item.description}
                 </p>

                 {item.status !== 'Vendido' && (
                   <button 
                     onClick={() => onNavigate('contact')}
                     className="text-dark-slate border-b border-dark-slate pb-1 text-sm font-bold hover:text-brand-rose hover:border-brand-rose transition-colors flex items-center gap-2 mx-auto md:mx-0"
                   >
                     Solicitar Reserva <ArrowRight size={14} />
                   </button>
                 )}
              </div>
            </div>
          ))}

        </div>

        {/* Banner Curador */}
        <div className="mt-32 bg-stone-100 p-12 md:p-20 text-center relative overflow-hidden">
           <History className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-stone-200 w-96 h-96 -rotate-12" />
           <div className="relative z-10 max-w-2xl mx-auto">
             <h2 className="text-3xl font-bold mb-4 font-serif text-dark-slate">¿Buscas algo específico?</h2>
             <p className="text-gray-600 mb-8">
               Nuestros curadores recorren ferias y casonas cada semana. Si buscas una maceta de una época específica o un objeto de decoración en particular, podemos encontrarlo para ti.
             </p>
             <button 
               onClick={() => onNavigate('contact')}
               className="bg-dark-slate text-white px-10 py-4 font-bold hover:bg-brand-rose transition-colors"
             >
               Contactar Curador
             </button>
           </div>
        </div>
      </div>
    </div>
  );
}