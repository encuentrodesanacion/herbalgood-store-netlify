import { useState } from "react";
import { MapPin, ArrowRight, Leaf, Flower, Briefcase, Home } from "lucide-react";

type HerbarioProps = {
  onNavigate: (page: string) => void;
};

// Datos de los proyectos realizados
const projects = [
  {
    id: 1,
    title: "Oficinas Tech Center",
    category: "Corporativo",
    location: "Las Condes, Santiago",
    image: "https://images.pexels.com/photos/1957478/pexels-photo-1957478.jpeg", // Oficina con plantas
    plantsUsed: ["Ficus Lyrata", "Sansevieria", "Pothos"],
    description: "Transformamos un espacio frío de concreto en un pulmón verde para 50 empleados."
  },
  {
    id: 2,
    title: "Loft Minimalista",
    category: "Residencial",
    location: "Providencia",
    image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg", // Interior moderno
    plantsUsed: ["Monstera Deliciosa", "Zamioculcas"],
    description: "Diseño biofílico para un departamento con luz norte."
  },
  {
    id: 3,
    title: "Terraza Restaurant 'Verde'",
    category: "Comercial",
    location: "Vitacura",
    image: "https://images.pexels.com/photos/1055068/pexels-photo-1055068.jpeg", // Terraza
    plantsUsed: ["Helechos", "Palmera Areca", "Colgantes"],
    description: "Muro verde vertical y separadores naturales para las mesas."
  },
  {
    id: 4,
    title: "Recepción Clínica Dental",
    category: "Corporativo",
    location: "Ñuñoa",
    image: "https://images.pexels.com/photos/3747468/pexels-photo-3747468.jpeg", // Recepción limpia
    plantsUsed: ["Orquídeas", "Dracena"],
    description: "Un ambiente calmante y estéril con toques de vida orgánica."
  },
  {
    id: 5,
    title: "Rincón de Lectura",
    category: "Residencial",
    location: "La Reina",
    image: "https://images.pexels.com/photos/4503273/pexels-photo-4503273.jpeg", // Casa acogedora
    plantsUsed: ["Calathea", "Ficus Elastica"],
    description: "Rincón tropical de alta humedad para relajación."
  },
  {
    id: 6,
    title: "Cowork Espacio M",
    category: "Corporativo",
    location: "Santiago Centro",
    image: "https://images.pexels.com/photos/1170412/pexels-photo-1170412.jpeg", // Cowork
    plantsUsed: ["Gomero XL", "Suculentas"],
    description: "Plantas de bajo mantenimiento para zonas de alto tráfico."
  },
];

const categories = ["Todos", "Corporativo", "Residencial", "Comercial"];

export default function HerbarioVivo({ onNavigate }: HerbarioProps) {
  const [activeCategory, setActiveCategory] = useState("Todos");

  // Lógica de filtrado
  const filteredProjects = activeCategory === "Todos" 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-natural-cream font-sans text-dark-slate">
      
      {/* Header Herbario */}
      <header className="relative py-24 px-4 text-center overflow-hidden">
        {/* Fondo decorativo sutil */}
        <div className="absolute inset-0 bg-brand-bg opacity-50 z-0"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-rose/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto">
          <span className="text-primary-green font-bold tracking-[0.2em] uppercase text-xs mb-4 block">
            Portafolio de Proyectos
          </span>
          <h1 className="text-5xl md:text-7xl font-bold text-dark-slate mb-6 font-serif">
            Herbario Vivo
          </h1>
          <p className="text-xl text-gray-600 font-light max-w-2xl mx-auto italic">
            "Donde el diseño se encuentra con la naturaleza. Explora cómo hemos transformado espacios grises en ecosistemas vibrantes."
          </p>
        </div>
      </header>

      {/* Sección Principal */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        
        {/* Barra de Filtros */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-8 py-3 rounded-full text-sm font-bold transition-all border-2 ${
                activeCategory === cat
                  ? "bg-dark-slate text-white border-dark-slate shadow-lg transform scale-105"
                  : "bg-white text-gray-500 border-transparent hover:border-brand-rose hover:text-brand-rose"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid de Proyectos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div 
              key={project.id} 
              className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer h-[500px]"
            >
              {/* Imagen de Fondo */}
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              {/* Overlay Gradiente (Siempre visible pero sutil) */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>

              {/* Contenido (Abajo) */}
              <div className="absolute bottom-0 left-0 w-full p-8 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                {/* Categoría Tag */}
                <div className="inline-block bg-primary-green px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-3">
                  {project.category}
                </div>
                
                <h3 className="text-2xl font-bold mb-2 font-serif">{project.title}</h3>
                <div className="flex items-center gap-2 text-gray-300 text-sm mb-4">
                   <MapPin size={14} /> {project.location}
                </div>

                {/* Información Oculta que aparece al Hover */}
                <div className="h-0 group-hover:h-auto overflow-hidden transition-all opacity-0 group-hover:opacity-100 duration-500">
                  <p className="text-sm text-gray-200 mb-4 border-l-2 border-brand-rose pl-3">
                    {project.description}
                  </p>
                  
                  {/* Lista de Plantas (El "Herbario") */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.plantsUsed.map((plant, i) => (
                      <span key={i} className="flex items-center gap-1 text-xs bg-white/20 px-2 py-1 rounded-md backdrop-blur-sm">
                        <Leaf size={10} className="text-brand-rose" /> {plant}
                      </span>
                    ))}
                  </div>

                  <button 
                    onClick={() => onNavigate("contact")}
                    className="w-full bg-white text-dark-slate py-3 rounded-lg font-bold text-sm hover:bg-brand-rose hover:text-white transition-colors flex items-center justify-center gap-2"
                  >
                    Cotizar Proyecto Similar <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA para Empresas */}
        <div className="mt-24 bg-dark-slate rounded-3xl p-12 md:p-20 text-center text-white relative overflow-hidden">
          {/* Elementos decorativos */}
          <Briefcase className="absolute top-10 left-10 text-white/5 w-32 h-32 -rotate-12" />
          <Home className="absolute bottom-10 right-10 text-white/5 w-32 h-32 rotate-12" />

          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 font-serif">¿Tienes un espacio que necesita vida?</h2>
            <p className="text-gray-300 text-lg mb-10">
              Ya sea una oficina corporativa o tu terraza personal, nuestro equipo de paisajistas diseña la propuesta perfecta para ti.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => onNavigate("contact")}
                className="bg-primary-green text-white px-8 py-4 rounded-full font-bold hover:bg-white hover:text-dark-slate transition-all shadow-lg"
              >
                Agendar Visita Técnica
              </button>
              <button 
                 onClick={() => onNavigate("shop")}
                 className="px-8 py-4 rounded-full font-bold border border-white hover:bg-white hover:text-dark-slate transition-all"
              >
                 Ver Plantas Disponibles
              </button>
            </div>
          </div>
        </div>

      </section>
    </div>
  );
}