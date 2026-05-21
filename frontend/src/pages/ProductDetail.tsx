// src/pages/ProductDetail.tsx

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Star, MessageCircle, ArrowLeft, Truck, ShieldCheck, Heart, Loader2 } from "lucide-react";

type ProductDetailProps = {
  onNavigate?: (page: string, id?: string) => void;
  productId?: string; // 👈 Agregamos esto por si lo pasas por props en vez de URL
};

export default function ProductDetail({ onNavigate, productId: propProductId }: ProductDetailProps) {
  const { id: urlId } = useParams();
  const navigate = useNavigate();
  
  // Usamos el ID de la URL o el que venga por Props (el que esté disponible)
  const id = urlId || propProductId;
  
  const [activeImg, setActiveImg] = useState(0);
  
  // Estados para la base de datos
  const [product, setProduct] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  // Cargar el producto desde el backend
  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return; // Si no hay ID, no hacemos la consulta

      try {
        setIsLoading(true);
        const response = await fetch(`${API_URL}/api/products/${id}`);
        
        if (response.ok) {
          const data = await response.json();
          
          // Normalizamos la ruta de la imagen igual que en el Home
          let imgPath = data.image_url || data.image;
          let finalImageUrl = "https://via.placeholder.com/600x600?text=Sin+Imagen";

          if (imgPath) {
            if (imgPath.startsWith('http')) {
              finalImageUrl = imgPath;
            } else {
              const cleanPath = imgPath.startsWith('/') ? imgPath.slice(1) : imgPath;
              finalImageUrl = `${API_URL}/${cleanPath}`;
            }
          }

          setProduct({
            ...data,
            image_url: finalImageUrl,
            rating: data.rating || 5, 
          });
        } else {
          setError(true);
        }
      } catch (err) {
        console.error("Error cargando el producto:", err);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [id, API_URL]);

  // 👇 LÓGICA DE COTIZACIÓN POR WHATSAPP
  const handleSolicitarCotizacion = () => {
    // ⚠️ REEMPLAZA ESTE NÚMERO POR EL TUYO (Incluye el 569, sin el '+')
    const telefono = "56912345678"; 
    
    const mensaje = `¡Hola! Me interesa cotizar el siguiente ejemplar/producto que vi en su página web:\n\n*${product.name}*\nPrecio ref: $${product.price?.toLocaleString('es-CL')}\nFormato/Edad: ${product.size_category}\n\n¿Me podrían dar más información sobre el proceso de adopción/compra?`;
    
    const url = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
  };

  // Manejo de navegación hacia atrás
  const handleGoBack = () => {
    if (onNavigate) {
      onNavigate('home');
    } else {
      navigate(-1);
    }
  };

  // Pantalla de carga
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-stone-50">
        <Loader2 className="animate-spin text-green-600 mb-4" size={48} />
        <p className="text-stone-500 font-medium">Buscando información del ejemplar...</p>
      </div>
    );
  }

  // Manejo de error si no existe el producto en la BD
  if (error || !product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-stone-50">
        <h2 className="text-3xl font-bold text-stone-800 mb-4">Ejemplar no encontrado 🐰</h2>
        <p className="text-stone-500 mb-6">Parece que este registro ya no está disponible o fue adoptado.</p>
        <button onClick={handleGoBack} className="text-green-600 font-bold hover:underline">
          Volver al criadero
        </button>
      </div>
    );
  }

  // Galería de imágenes (Usamos la principal de la BD, puedes agregar más si tuvieras una tabla de galería)
  const images = [
    product.image_url,
    // Dejamos un par de imágenes de placeholder bonitas de conejos/accesorios si no hay más
    "https://images.pexels.com/photos/4001296/pexels-photo-4001296.jpeg", 
    "https://images.pexels.com/photos/372166/pexels-photo-372166.jpeg" 
  ];

  return (
    <div className="min-h-screen bg-stone-50 font-sans text-stone-800 py-12 px-4">
      
      {/* Navegación Superior */}
      <div className="max-w-7xl mx-auto mb-8 flex items-center justify-between">
        <button 
          onClick={handleGoBack}
          className="flex items-center gap-2 text-stone-500 hover:text-green-600 transition-colors font-medium"
        >
          <ArrowLeft size={20} /> Volver al catálogo
        </button>
        <span className="hidden md:block text-sm text-stone-400 uppercase tracking-widest font-semibold">
          Tienda / {product.category || 'Catálogo'} / {product.name}
        </span>
      </div>

      <div className="max-w-7xl mx-auto bg-white rounded-3xl shadow-sm border border-stone-100 overflow-hidden p-6 md:p-12">
        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* Galería */}
          <div className="w-full lg:w-1/2">
            <div className="relative overflow-hidden rounded-2xl h-[500px] mb-4 bg-stone-100">
              <img 
                src={images[activeImg]} 
                alt={product.name} 
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
              <button className="absolute top-4 right-4 bg-white/90 p-3 rounded-full shadow-md hover:text-red-500 text-stone-400 transition-colors backdrop-blur-sm">
                <Heart size={20} />
              </button>
              {product.size_category && (
                 <span className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm text-stone-800 text-xs uppercase font-bold px-3 py-1.5 rounded shadow-sm">
                   {product.size_category}
                 </span>
              )}
            </div>
            
            {/* Miniaturas */}
            <div className="flex gap-4 overflow-x-auto pb-2">
              {images.map((img, idx) => (
                <button 
                  key={idx}
                  onClick={() => setActiveImg(idx)}
                  className={`w-24 h-24 rounded-xl overflow-hidden border-2 flex-shrink-0 transition-all ${
                    activeImg === idx ? 'border-green-500 opacity-100' : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`Vista ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Info del Producto */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center">
            <h1 className="text-4xl md:text-5xl font-bold font-serif text-stone-800 mb-4">
              {product.name}
            </h1>
            
            <div className="flex items-center gap-4 mb-6">
              <span className="text-4xl text-green-700 font-black tracking-tight">
                ${product.price?.toLocaleString('es-CL')}
              </span>
              <div className="h-8 w-px bg-stone-200"></div>
              <div className="flex items-center gap-1">
                <Star size={20} className="text-yellow-400 fill-current" />
                <span className="font-bold text-stone-600 text-lg">Línea Pura</span>
              </div>
            </div>

            <p className="text-stone-600 text-lg leading-relaxed mb-8 border-b pb-8 border-stone-100">
              {product.description}
            </p>

            {/* 👇 BOTÓN DE WHATSAPP REEMPLAZANDO AL CARRITO */}
            <div className="mb-10">
              <button 
                onClick={handleSolicitarCotizacion}
                className="w-full bg-[#25D366] text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-[#1da851] transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 flex items-center justify-center gap-3 group"
              >
                <MessageCircle size={26} className="group-hover:scale-110 transition-transform" />
                Cotizar por WhatsApp
              </button>
              <p className="text-center text-xs text-stone-400 mt-3">
                Al hacer clic, se abrirá un chat directo con nuestro equipo de atención.
              </p>
            </div>
            
            {/* Garantías y Confianza adaptadas al criadero */}
            <div className="grid grid-cols-2 gap-4 bg-green-50/50 p-6 rounded-2xl border border-green-100/50">
               <div className="flex items-start gap-4">
                  <div className="bg-green-100 p-2 rounded-full text-green-700 shrink-0">
                    <Truck size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-stone-800 text-sm">Envíos Cuidados</h4>
                    <p className="text-xs text-stone-500 mt-1">Traslado libre de estrés</p>
                  </div>
               </div>
               <div className="flex items-start gap-4">
                  <div className="bg-green-100 p-2 rounded-full text-green-700 shrink-0">
                    <ShieldCheck size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-stone-800 text-sm">Garantía de Salud</h4>
                    <p className="text-xs text-stone-500 mt-1">Evaluación Veterinaria</p>
                  </div>
               </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}