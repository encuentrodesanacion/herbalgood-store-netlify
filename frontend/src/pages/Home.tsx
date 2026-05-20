import { useState, useEffect } from "react";
import { Star, Rabbit, ShieldCheck, Heart, Leaf, ChevronLeft, ChevronRight, Loader2, Info, ArrowRight } from "lucide-react";
import ProductCard from "../components/common/ProductCard";

type HomeProps = {
  onNavigate: (page: string, productId?: string) => void;
};

export default function Home({ onNavigate }: HomeProps) {
  const [activeTab, setActiveTab] = useState("Mascotas");
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);
  
  const [dbProducts, setDbProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // ==========================================
  // URL BASE DEL BACKEND
  // ==========================================
  const API_URL = 'http://localhost:5000';

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${API_URL}/api/products`);
        if (response.ok) {
          const data = await response.json();
          
          const mappedData = data.map((item: any) => {
            // Obtenemos la ruta de la BD
            let imgPath = item.image_url || item.image;
            let finalImageUrl = "";

            if (imgPath) {
              // Si la ruta ya es un enlace completo (ej. fotos de prueba), la dejamos tal cual
              if (imgPath.startsWith('http')) {
                finalImageUrl = imgPath;
              } else {
                // Si es una ruta local de Multer (ej. uploads/foto.png), le agregamos la URL del backend
                // Quitamos la barra inicial si la tiene para evitar 'http://localhost:5000//uploads...'
                const cleanPath = imgPath.startsWith('/') ? imgPath.slice(1) : imgPath;
                finalImageUrl = `${API_URL}/${cleanPath}`;
              }
            } else {
              // Imagen por defecto si un producto no tiene foto
              finalImageUrl = "https://via.placeholder.com/400x300?text=Sin+Imagen";
            }

            return {
              ...item,
              image: finalImageUrl,
              rating: item.rating || 5, 
              reviews: item.reviews || 8 
            };
          });
          
          setDbProducts(mappedData);
        }
      } catch (error) {
        console.error("Error al cargar los ejemplares:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const tabProducts = dbProducts
    .filter((p) => (p.category === activeTab) || (!p.category && activeTab === 'Mascotas')) 
    .slice(0, 4);

  const heroProducts = dbProducts.filter(p => p.is_featured).slice(0, 5);
  if (heroProducts.length === 0 && dbProducts.length > 0) {
    heroProducts.push(...dbProducts.slice(0, 3));
  }
  
  const currentHeroProduct = heroProducts[currentHeroIndex] || null;

  const nextSlide = () => setCurrentHeroIndex((prev) => (prev + 1) % heroProducts.length);
  const prevSlide = () => setCurrentHeroIndex((prev) => (prev - 1 + heroProducts.length) % heroProducts.length);

  return (
    <div 
      className="min-h-screen font-sans text-stone-800"
      style={{
        background: "linear-gradient(135deg, #F0FDF4 0%, #ffffff 40%, #ffffff 100%)", 
      }}
    >
      
      {/* 1. HEADER - Hero Informativo */}
      <header className="relative py-20 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-bold mb-6">
            <Rabbit size={18} /> Criadero Responsable y Ético
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-stone-900 mb-6 leading-tight">
            Encuentra a tu compañero ideal y aprende a cuidarlo
          </h1>
          <p className="text-lg text-stone-600 mb-8 max-w-2xl mx-auto">
            Somos especialistas en la crianza de conejos de raza. Brindamos asesoría completa, 
            alimentación premium y todo lo que necesitas para una tenencia responsable.
          </p>
        </div>
      </header>

      {/* 2. CATEGORÍAS */}
      <section className="py-12 max-w-7xl mx-auto px-4 relative z-10">
         <div className="bg-white/90 p-8 rounded-3xl shadow-xl backdrop-blur-md">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-stone-800">Nuestros Ejemplares y Suministros</h2>
              <p className="text-stone-500 mb-8">Selecciona una categoría para explorar</p>
              <div className="flex flex-wrap justify-center gap-3 mb-8">
                {['Mascotas', 'Enanos', 'Gigantes', 'Alimento'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveTab(cat)}
                    className={`px-8 py-3 rounded-2xl text-sm font-bold transition-all border-2 ${
                      activeTab === cat 
                        ? "bg-green-600 text-white border-green-600 shadow-md transform -translate-y-1" 
                        : "bg-white text-stone-600 border-stone-100 hover:border-green-300"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-10 text-stone-500">
                <Loader2 className="animate-spin mb-4 text-green-600" size={48} />
                <p>Cargando información de la granja...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {tabProducts.length > 0 ? (
                  tabProducts.map((product) => (
                    <ProductCard key={product.id} product={product} onNavigate={onNavigate} />
                  ))
                ) : (
                  <div className="col-span-full text-center py-10 text-stone-500">
                    Estamos preparando nuevos ejemplares en esta categoría.
                  </div>
                )}
              </div>
            )}
         </div>
      </section>

      {/* 3. CARRUSEL DESTACADO - Raza del Mes */}
      <section className="py-12 relative z-10 px-4">
        <div className="max-w-7xl mx-auto bg-white rounded-[3rem] shadow-2xl overflow-hidden p-8 md:p-16 border border-green-50">
          {isLoading ? (
             <div className="flex justify-center items-center h-[400px]">
               <Loader2 className="animate-spin text-green-500" size={48} />
             </div>
          ) : currentHeroProduct ? (
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="w-full md:w-1/2 relative h-[400px] md:h-[500px] group">
                <div className="absolute top-4 left-4 bg-green-600 text-white px-4 py-1 font-bold text-xs uppercase tracking-widest shadow-lg z-20 rounded-lg">
                  Ejemplar Destacado
                </div>
                <img 
                  key={currentHeroProduct.id}
                  src={currentHeroProduct.image} 
                  alt={currentHeroProduct.name} 
                  className="w-full h-full object-cover rounded-[2rem] shadow-inner transition-all duration-700"
                />
                {heroProducts.length > 1 && (
                  <>
                    <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-stone-800 p-3 rounded-full shadow-lg z-20"><ChevronLeft size={24} /></button>
                    <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-stone-800 p-3 rounded-full shadow-lg z-20"><ChevronRight size={24} /></button>
                  </>
                )}
              </div>

              <div className="w-full md:w-1/2">
                <h2 className="text-4xl md:text-5xl font-bold mb-4 text-stone-900 leading-tight">
                  {currentHeroProduct.name}
                </h2>
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-3xl text-green-700 font-black">
                    ${currentHeroProduct.price.toLocaleString('es-CL')}
                  </span>
                  <div className="flex text-yellow-400">
                    <Star size={20} fill="currentColor" />
                    <span className="ml-2 text-stone-500 font-medium">Línea de Sangre Pura</span>
                  </div>
                </div>
                <p className="text-stone-600 text-lg leading-relaxed mb-8 border-l-4 border-green-200 pl-6 italic">
                  "{currentHeroProduct.description}"
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button onClick={() => onNavigate('product', currentHeroProduct.id)} className="flex-1 bg-stone-900 text-white py-4 px-6 font-bold hover:bg-green-600 transition-all shadow-xl rounded-2xl flex items-center justify-center gap-2">
                    Conocer más sobre esta raza <ArrowRight size={20} />
                  </button>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </section>

      {/* 4. SECCIÓN DIDÁCTICA */}
      <section className="py-20 max-w-7xl mx-auto px-4 text-center relative z-10">
         <div className="bg-white/60 backdrop-blur-md p-12 rounded-[3rem] border border-white/50">
           <span className="text-green-600 font-bold uppercase text-xs tracking-[0.2em] mb-4 block">Aprende con nosotros</span>
           <h2 className="text-4xl font-bold mb-12 text-stone-800">Guía de Cuidado para tu Conejo</h2>
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-auto md:h-[450px]">
              <div className="relative group overflow-hidden h-full rounded-[2.5rem] shadow-2xl">
                 <img src="https://images.pexels.com/photos/4001296/pexels-photo-4001296.jpeg" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt="Habitat" />
                 <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 to-transparent flex flex-col justify-end p-10 text-left">
                    <h3 className="text-white text-2xl font-bold mb-2">Hábitat Ideal</h3>
                    <p className="text-stone-200 text-sm">Descubre cómo preparar el espacio perfecto para su comodidad y seguridad.</p>
                 </div>
              </div>
              <div className="relative group overflow-hidden h-full rounded-[2.5rem] shadow-2xl">
                 <img src="https://images.pexels.com/photos/372166/pexels-photo-372166.jpeg" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt="Alimentación" />
                 <div className="absolute inset-0 bg-gradient-to-t from-green-900/80 to-transparent flex flex-col justify-end p-10 text-left">
                    <h3 className="text-white text-2xl font-bold mb-2">Nutrición y Salud</h3>
                    <p className="text-stone-200 text-sm">Base de heno, vegetales frescos y pellets. La clave para una vida larga.</p>
                 </div>
              </div>
           </div>

           <div className="mt-12">
              <button onClick={() => onNavigate('guia')} className="bg-white border-2 border-stone-800 px-10 py-4 rounded-full font-bold hover:bg-stone-900 hover:text-white transition-all shadow-lg flex items-center gap-2 mx-auto">
                <Info size={20} /> Explorar Guía Didáctica Completa
              </button>
           </div>
         </div>
      </section>

      {/* 5. FOOTER / VALORES */}
      <footer className="bg-stone-950 text-white py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
           <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mb-6 border border-green-500/20">
                <Heart className="text-green-400" size={32} />
              </div>
              <h4 className="text-xl font-bold mb-2">Bienestar Animal</h4>
              <p className="text-stone-400 text-sm">Priorizamos la salud y felicidad de cada conejo antes que la venta.</p>
           </div>
           <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mb-6 border border-green-500/20">
                <Leaf className="text-green-400" size={32} />
              </div>
              <h4 className="text-xl font-bold mb-2">Crianza Natural</h4>
              <p className="text-stone-400 text-sm">Ambientes libres de estrés y alimentación 100% orgánica.</p>
           </div>
           <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mb-6 border border-green-500/20">
                <ShieldCheck className="text-green-400" size={32} />
              </div>
              <h4 className="text-xl font-bold mb-2">Garantía de Salud</h4>
              <p className="text-stone-400 text-sm">Certificados veterinarios y seguimiento post-venta incluido.</p>
           </div>
        </div>
        <div className="text-center mt-16 pt-8 border-t border-white/5 text-stone-500 text-xs">
          © 2026 Rabbit Boutique - Expertos en Cunicultura Responsable
        </div>
      </footer>
    </div>
  );
}