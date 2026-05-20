// src/pages/BlogCunicola.tsx

import { useState, useEffect } from "react";
import { ArrowRight, BookOpen, Search, Rabbit, Leaf, HeartPulse, Carrot, Loader2 } from "lucide-react";

type BitacoraProps = {
  onNavigate: (page: string, productId?: string) => void;
};

// Función helper para asignar íconos visuales basados en el texto de la categoría
const getCategoryIcon = (category: string) => {
  const cat = category?.toLowerCase() || "";
  if (cat.includes("raza") || cat.includes("genética")) return <Rabbit size={20} />;
  if (cat.includes("alimento") || cat.includes("nutrición") || cat.includes("dieta")) return <Carrot size={20} />;
  if (cat.includes("salud") || cat.includes("cuidado") || cat.includes("veterinaria")) return <HeartPulse size={20} />;
  if (cat.includes("hábitat") || cat.includes("entorno") || cat.includes("comportamiento")) return <Leaf size={20} />;
  return <BookOpen size={20} />; // Ícono por defecto
};

export default function BlogCunicola({ onNavigate }: BitacoraProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Estados para conectar con la Base de Datos
  const [posts, setPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Cargar artículos desde el backend
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        // Asumiendo que usarás este endpoint en tu backend para el blog
        const response = await fetch('http://localhost:5000/api/posts');
        if (response.ok) {
          const data = await response.json();
          setPosts(data);
        }
      } catch (error) {
        console.error("Error al cargar las guías:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Filtrado de búsqueda
  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    post.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-green-50/50 font-sans text-stone-800">
      
      {/* Header del Blog */}
      <header className="relative py-20 px-4 text-center bg-green-100/50 overflow-hidden">
        <div className="relative z-10 max-w-4xl mx-auto">
          <span className="text-green-700 font-bold tracking-widest uppercase text-sm mb-4 block">
            Cunicultura Experta
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-stone-900 mb-6">
            Guías y Cuidados
          </h1>
          <p className="text-xl text-stone-600 max-w-2xl mx-auto">
            Un espacio dedicado a explorar las diferentes razas, compartir consejos veterinarios y promover la tenencia responsable de nuestros orejudos.
          </p>
        </div>
      </header>

      {/* Contenido Principal */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        
        {/* Barra de Búsqueda */}
        <div className="flex justify-center mb-16">
          <div className="relative w-full max-w-md">
            <input 
              type="text" 
              placeholder="Buscar razas, alimentación, salud..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl border border-stone-200 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 bg-white shadow-sm transition-all"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" size={20} />
          </div>
        </div>

        {/* Estado de Carga */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 text-stone-500">
            <Loader2 className="animate-spin mb-4 text-green-600" size={48} />
            <p className="font-medium text-lg">Buscando las mejores guías de crianza...</p>
          </div>
        ) : (
          /* Grid de Artículos */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post, index) => (
              <div 
  key={post.id}
  className="group cursor-pointer bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-green-50 flex flex-col"
  onMouseEnter={() => setHoveredIndex(index)}
  onMouseLeave={() => setHoveredIndex(null)}
  onClick={() => onNavigate('post', post.id)} // 👈 ¡ESTA ES LA LÍNEA CLAVE!
>
                  {/* Imagen */}
                  <div className="relative h-64 overflow-hidden bg-stone-100">
                    <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full text-xs font-bold text-green-700 flex items-center gap-2 z-10 shadow-sm">
                      {getCategoryIcon(post.category)} {post.category || "General"}
                    </div>
                    <img 
                      src={post.image_url || post.image || "https://images.pexels.com/photos/3313348/pexels-photo-3313348.jpeg"} 
                      alt={post.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>

                  {/* Contenido */}
                  <div className="p-8 flex flex-col flex-grow">
                    <div className="text-green-600/70 text-xs font-bold uppercase tracking-widest mb-3">
                      {post.created_at ? new Date(post.created_at).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' }) : (post.date || 'Guía Reciente')}
                    </div>
                    <h3 className="text-2xl font-bold text-stone-800 mb-4 group-hover:text-green-600 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-stone-600 leading-relaxed mb-6 flex-grow line-clamp-3">
                      {post.excerpt || post.content?.substring(0, 120) + "..."}
                    </p>
                    
                    <div className="flex items-center text-green-700 font-bold text-sm uppercase tracking-wide group-hover:underline underline-offset-4">
                      Leer artículo completo <ArrowRight size={16} className={`ml-2 transition-transform duration-300 ${hoveredIndex === index ? 'translate-x-2' : ''}`} />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-16 text-stone-500 bg-white rounded-3xl border border-stone-100 shadow-sm">
                <BookOpen className="mx-auto mb-4 text-stone-300" size={48} />
                <h3 className="text-xl font-bold text-stone-700 mb-2">Aún no hay publicaciones</h3>
                <p>Pronto compartiremos consejos veterinarios y guías de razas por aquí.</p>
              </div>
            )}
          </div>
        )}

        {/* Call to Action Final */}
        <div className="mt-20 bg-green-800 rounded-[3rem] p-12 md:p-16 text-center relative overflow-hidden shadow-xl">
           <div className="absolute inset-0 opacity-10 bg-[url('https://images.pexels.com/photos/4001296/pexels-photo-4001296.jpeg')] bg-cover bg-center mix-blend-overlay"></div>
           <div className="relative z-10">
             <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">¿Listo para encontrar a tu compañero ideal?</h2>
             <p className="text-green-100 mb-10 max-w-2xl mx-auto text-lg">
               Aplica todo lo aprendido. Explora nuestra selección de ejemplares de raza pura y encuentra el alimento y accesorios perfectos para su nuevo hogar.
             </p>
             <button 
               onClick={() => onNavigate('shop')}
               className="bg-white text-green-900 px-10 py-4 rounded-full font-bold hover:bg-green-50 hover:scale-105 transition-all shadow-lg flex items-center gap-2 mx-auto"
             >
               Ver Ejemplares Disponibles <ArrowRight size={20} />
             </button>
           </div>
        </div>

      </div>
    </div>
  );
}