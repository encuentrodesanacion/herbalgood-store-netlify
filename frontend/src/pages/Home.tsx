import { useState } from "react";
import { Star, ArrowRight, Truck, ShieldCheck, Leaf, Briefcase, ChevronLeft, ChevronRight } from "lucide-react";
import { products } from "../data/mockData";
import ProductCard from "../components/common/ProductCard";

type HomeProps = {
  onNavigate: (page: string, productId?: string) => void;
};

export default function Home({ onNavigate }: HomeProps) {
  const [activeTab, setActiveTab] = useState("XL");
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);

  // Lógica de Filtros y Carrusel (Igual que antes)
  const tabProducts = products
    .filter((p) => (p.size_category === activeTab) || (!p.size_category && activeTab === 'XL')) 
    .slice(0, 4);

  const heroProducts = products.filter(p => p.is_featured).slice(0, 5);
  if (heroProducts.length === 0) heroProducts.push(...products.slice(0, 3));
  const currentHeroProduct = heroProducts[currentHeroIndex];

  const nextSlide = () => setCurrentHeroIndex((prev) => (prev + 1) % heroProducts.length);
  const prevSlide = () => setCurrentHeroIndex((prev) => (prev - 1 + heroProducts.length) % heroProducts.length);

  return (
    <div 
      className="min-h-screen font-sans text-dark-slate"
      style={{
        background: "linear-gradient(135deg, #D4A5A5 20%, #B2D8B2 200%, #B2D8B2 10%,  #D4A5A5 50%)",
      }}
    >
      
  

      {/* 2. HEADER REFACTORIZADO (Estilo "Elige una opción") */}
      <header className="relative py-16 px-4">
        {/* Fondo blanco suave para que las tarjetas resalten sobre el verde/rosa */}
        <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-0"></div>

        <div className="relative z-10 max-w-7xl mx-auto">
          
          {/* Título Principal de la Marca */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-bold text-dark-slate mb-2 tracking-tight uppercase">
              PINPILINPAUSHA
            </h1>
            <p className="text-xl text-gray-500 font-light italic">
              Naturaleza que transforma tus espacios
            </p>
          </div>

          {/* -------------------------------------------------- */}
          {/* NUEVA SECCIÓN DE TARJETAS (Réplica exacta imagen) */}
          {/* -------------------------------------------------- */}
          <div className="max-w-6xl mx-auto">
            {/* Título de la sección */}
            <h2 className="text-center text-3xl md:text-4xl font-bold text-dark-slate mb-12 tracking-tight">
              Elige una opción para comenzar
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
              {[
                 { title: "Blog: Bitacora de Plantas", img: "https://images.pexels.com/photos/796602/pexels-photo-796602.jpeg", action: "rentals" },
                 { title: "Objetos con Historia", img: "https://images.pexels.com/photos/3094205/pexels-photo-3094205.jpeg", action: "hallazgos" },
                 { title: "Portafolio de Proyectos", img: "https://images.pexels.com/photos/1957478/pexels-photo-1957478.jpeg", action: "projects" }
              ].map((card, i) => (
                <div 
                  key={i} 
                  onClick={() => onNavigate(card.action)}
                  className="group cursor-pointer flex flex-col gap-5"
                >
                  {/* IMAGEN: Redondeada, cuadrada/vertical y limpia (sin texto encima) */}
                  <div className="overflow-hidden rounded-[2rem] shadow-sm aspect-[4/5] w-full bg-gray-100">
                    <img 
                      src={card.img} 
                      alt={card.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                    />
                  </div>

                  {/* CONTENIDO ABAJO: Título y Botón Pill */}
                  <div className="flex flex-col items-start px-2">
                    <h3 className="text-lg font-bold text-dark-slate mb-3 group-hover:text-primary-green transition-colors">
                      {card.title}
                    </h3>
                    
                    <button className="border border-gray-400 text-dark-slate px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wide hover:bg-dark-slate hover:text-white hover:border-dark-slate transition-all flex items-center gap-2 group-hover:pl-8">
                      Ver más <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* 3. Resto de secciones (Pestañas, Hero Carrusel, etc.) */}
      <section className="py-20 max-w-7xl mx-auto px-4 relative z-10">
         <div className="bg-white/90 p-8 rounded-3xl shadow-sm backdrop-blur-md">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-6">Nuestras Plantas Destacadas</h2>
              <div className="flex flex-wrap justify-center gap-2 mb-8">
                {['S', 'M', 'L', 'XL'].map((size) => (
                  <button
                    key={size}
                    onClick={() => setActiveTab(size)}
                    className={`px-8 py-3 rounded-full text-sm font-semibold transition-all border ${
                      activeTab === size 
                        ? "bg-dark-slate text-white border-dark-slate shadow-lg" 
                        : "bg-white text-gray-600 border-gray-200 hover:border-dark-slate"
                    }`}
                  >
                    Plantas {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {tabProducts.map((product) => (
                <ProductCard key={product.id} product={product} onNavigate={onNavigate} />
              ))}
            </div>
            
            <div className="text-center mt-12">
               <button onClick={() => onNavigate('shop')} className="text-primary-green font-bold hover:underline underline-offset-4">
                 Ver todo el catálogo →
               </button>
            </div>
         </div>
      </section>

      {/* 4. Carrusel Top Ventas */}
      <section className="py-12 relative z-10 px-4">
        <div className="max-w-7xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden p-8 md:p-12">
          <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
            <div className="w-full md:w-1/2 relative h-[400px] md:h-[600px] group">
              <div className="absolute top-4 left-4 bg-white text-brand-rose px-4 py-1 font-bold text-xs uppercase tracking-widest shadow-sm z-20 border-l-4 border-brand-rose">
                Top Ventas #{currentHeroIndex + 1}
              </div>
              <img 
                key={currentHeroProduct.id}
                src={currentHeroProduct.image_url} 
                alt={currentHeroProduct.name} 
                className="w-full h-full object-cover rounded-2xl shadow-sm transition-all duration-500"
              />
              <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-dark-slate p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-20"><ChevronLeft size={24} /></button>
              <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-dark-slate p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-20"><ChevronRight size={24} /></button>
            </div>

            <div className="w-full md:w-1/2">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 font-serif text-dark-slate">
                {currentHeroProduct.name}
              </h2>
              <div className="flex items-center gap-4 mb-6">
                <span className="text-3xl text-primary-green font-bold">
                  ${currentHeroProduct.price.toLocaleString('es-CL')}
                </span>
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={18} fill={i < Math.floor(currentHeroProduct.rating) ? "currentColor" : "none"} className={i >= Math.floor(currentHeroProduct.rating) ? "text-gray-300" : ""} />
                  ))}
                </div>
              </div>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">{currentHeroProduct.description}</p>
              <div className="flex gap-4">
                <button onClick={() => onNavigate('product', currentHeroProduct.id)} className="flex-1 bg-dark-slate text-white py-4 font-bold hover:bg-primary-green transition-colors shadow-lg rounded-xl">
                  Añadir al Carrito
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Proyectos */}
      <section className="py-20 max-w-7xl mx-auto px-4 text-center relative z-10">
         <div className="bg-white/80 backdrop-blur-md p-10 rounded-3xl">
           <span className="text-brand-rose font-bold uppercase text-xs tracking-widest mb-2 block">Transformamos Espacios</span>
           <h2 className="text-3xl font-bold mb-12">Proyectos de Decoración</h2>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-96">
              <div className="relative group overflow-hidden h-full rounded-2xl">
                 <img src="https://images.pexels.com/photos/1957477/pexels-photo-1957477.jpeg" className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700" alt="Antes" />
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/90 px-6 py-2 font-bold backdrop-blur-sm rounded-full">ANTES</div>
              </div>
              <div className="relative group overflow-hidden h-full rounded-2xl">
                 <img src="https://images.pexels.com/photos/7018391/pexels-photo-7018391.jpeg" className="w-full h-full object-cover scale-105" alt="Después" />
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary-green text-white px-6 py-2 font-bold shadow-lg rounded-full">DESPUÉS</div>
              </div>
           </div>
           <div className="mt-8">
              <button onClick={() => onNavigate('projects')} className="border-b-2 border-dark-slate pb-1 font-bold hover:text-primary-green hover:border-primary-green transition-colors">Ver Galería</button>
           </div>
         </div>
      </section>

      {/* 6. Footer */}
      <section className="bg-dark-slate text-white py-16 relative z-10">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
           <div><Leaf className="mx-auto mb-4 text-brand-rose" size={40} /><h4 className="text-xl font-bold mb-2">Pasión Verde</h4></div>
           <div><Briefcase className="mx-auto mb-4 text-brand-rose" size={40} /><h4 className="text-xl font-bold mb-2">Expertos Corporativos</h4></div>
           <div><ShieldCheck className="mx-auto mb-4 text-brand-rose" size={40} /><h4 className="text-xl font-bold mb-2">Compra Segura</h4></div>
        </div>
      </section>
    </div>
  );
}