import { useState } from "react";
import { ArrowRight, BookOpen, Droplets, Sun, Calendar, Search } from "lucide-react";

type BitacoraProps = {
  onNavigate: (page: string, productId?: string) => void;
};

// Datos simulados de las entradas de la bitácora
const blogPosts = [
  {
    id: 1,
    category: "Cuidados Básicos",
    title: "El arte de regar: Ni mucho, ni poco",
    excerpt: "Aprende a leer las señales de tus plantas. Hojas amarillas vs hojas crujientes: te explicamos la diferencia.",
    date: "12 Oct, 2023",
    image: "https://images.pexels.com/photos/6683569/pexels-photo-6683569.jpeg",
    icon: <Droplets size={20} />
  },
  {
    id: 2,
    category: "Luz y Ubicación",
    title: "¿Dónde pongo mi Ficus Lyrata?",
    excerpt: "La guía definitiva para entender la 'luz indirecta brillante' y evitar que tu Ficus pierda sus hojas.",
    date: "05 Nov, 2023",
    image: "https://images.pexels.com/photos/7018391/pexels-photo-7018391.jpeg",
    icon: <Sun size={20} />
  },
  {
    id: 3,
    category: "Estilo de Vida",
    title: "Plantas que purifican tu oficina",
    excerpt: "Estudios de la NASA confirman qué especies eliminan toxinas y mejoran tu concentración.",
    date: "20 Nov, 2023",
    image: "https://images.pexels.com/photos/3094205/pexels-photo-3094205.jpeg",
    icon: <BookOpen size={20} />
  },
  {
    id: 4,
    category: "Tendencias",
    title: "Decorando con Monstera Deliciosa",
    excerpt: "Cómo integrar la planta más popular de Instagram en espacios minimalistas y modernos.",
    date: "01 Dic, 2023",
    image: "https://images.pexels.com/photos/3125195/pexels-photo-3125195.jpeg",
    icon: <Calendar size={20} />
  }
];

export default function BitacoraDePlantas({ onNavigate }: BitacoraProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-natural-cream font-sans text-dark-slate">
      
      {/* Header de la Bitácora */}
      <header className="relative py-20 px-4 text-center bg-brand-bg overflow-hidden">
        <div className="relative z-10 max-w-4xl mx-auto">
          <span className="text-brand-rose font-bold tracking-widest uppercase text-sm mb-4 block">
            Blog & Guías
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-dark-slate mb-6 font-serif">
            Bitácora de Plantas
          </h1>
          <p className="text-xl text-gray-600 font-light max-w-2xl mx-auto italic">
            "Un espacio dedicado a los secretos, cuidados e historias detrás de nuestra selva urbana."
          </p>
        </div>
      </header>

      {/* Contenido Principal */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        
        {/* Barra de Búsqueda (Decorativa) */}
        <div className="flex justify-center mb-16">
          <div className="relative w-full max-w-md">
            <input 
              type="text" 
              placeholder="Buscar un consejo..." 
              className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-200 focus:outline-none focus:border-primary-green focus:ring-1 focus:ring-primary-green bg-white shadow-sm"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          </div>
        </div>

        {/* Grid de Artículos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {blogPosts.map((post, index) => (
            <div 
              key={post.id}
              className="group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Imagen */}
              <div className="relative h-64 overflow-hidden">
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-primary-green flex items-center gap-2 z-10">
                  {post.icon} {post.category}
                </div>
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* Contenido */}
              <div className="p-8 flex flex-col flex-grow">
                <div className="text-gray-400 text-xs font-bold uppercase tracking-wide mb-3">
                  {post.date}
                </div>
                <h3 className="text-2xl font-bold text-dark-slate mb-4 group-hover:text-primary-green transition-colors font-serif">
                  {post.title}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-6 flex-grow">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center text-primary-green font-bold text-sm uppercase tracking-wide group-hover:underline underline-offset-4">
                  Leer entrada <ArrowRight size={16} className={`ml-2 transition-transform duration-300 ${hoveredIndex === index ? 'translate-x-2' : ''}`} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action Final */}
        <div className="mt-20 bg-brand-rose/20 rounded-3xl p-12 text-center relative overflow-hidden">
           <div className="relative z-10">
             <h2 className="text-3xl font-bold mb-4 text-dark-slate">¿Listo para aplicar lo aprendido?</h2>
             <p className="text-gray-600 mb-8">Explora nuestra colección y encuentra tu próxima compañera verde.</p>
             <button 
               onClick={() => onNavigate('shop')}
               className="bg-dark-slate text-white px-8 py-4 rounded-full font-bold hover:bg-primary-green transition-colors shadow-lg"
             >
               Ir a la Tienda
             </button>
           </div>
        </div>

      </div>
    </div>
  );
}