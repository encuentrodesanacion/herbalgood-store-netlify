// src/pages/ProductDetail.tsx

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Star, Minus, Plus, ShoppingBag, ArrowLeft, Truck, ShieldCheck, Heart, Loader2 } from "lucide-react";
import { useCart } from "../context/CartContext";

type ProductDetailProps = {
  onNavigate: (page: string) => void;
};

export default function ProductDetail({ onNavigate }: ProductDetailProps) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart(); 
  
  const [quantity, setQuantity] = useState(1);
  const [activeImg, setActiveImg] = useState(0);
  
  // Estados para la base de datos
  const [product, setProduct] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  // Cargar el producto desde el backend
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`http://localhost:5000/api/products/${id}`);
        if (response.ok) {
          const data = await response.json();
          setProduct({
            ...data,
            image_url: data.image_url || data.image, // Normalizamos la imagen
            rating: data.rating || 5, // Mock temporal
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

    if (id) fetchProduct();
  }, [id]);

  // Pantalla de carga
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-stone-50">
        <Loader2 className="animate-spin text-amber-500 mb-4" size={48} />
        <p className="text-stone-500 font-medium">Preparando producto...</p>
      </div>
    );
  }

  // Manejo de error si no existe el producto en la BD
  if (error || !product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-stone-50">
        <h2 className="text-3xl font-bold text-stone-800 mb-4">Producto no encontrado 🍯</h2>
        <p className="text-stone-500 mb-6">Parece que este panal está vacío.</p>
        <button onClick={() => navigate(-1)} className="text-amber-600 font-bold hover:underline">
          Volver a la tienda
        </button>
      </div>
    );
  }

  // Galería: Usamos la imagen de la BD y agregamos un par de relleno (mock) para la demo visual
  const images = [
    product.image_url || "https://images.pexels.com/photos/33260/honey-sweet-syrup-organic.jpg",
    "https://images.pexels.com/photos/796602/pexels-photo-796602.jpeg", 
    "https://images.pexels.com/photos/3094205/pexels-photo-3094205.jpeg" 
  ];

  return (
    <div className="min-h-screen bg-stone-50 font-sans text-stone-800 py-12 px-4">
      
      {/* Navegación Superior */}
      <div className="max-w-7xl mx-auto mb-8 flex items-center justify-between">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-stone-500 hover:text-amber-600 transition-colors font-medium"
        >
          <ArrowLeft size={20} /> Volver
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
                   Formato {product.size_category}
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
                    activeImg === idx ? 'border-amber-500 opacity-100' : 'border-transparent opacity-60 hover:opacity-100'
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
              <span className="text-4xl text-amber-600 font-black tracking-tight">
                ${product.price?.toLocaleString('es-CL')}
              </span>
              <div className="h-8 w-px bg-stone-200"></div>
              <div className="flex items-center gap-1">
                <Star size={20} className="text-amber-400 fill-current" />
                <span className="font-bold text-stone-600 text-lg">{product.rating}</span>
              </div>
            </div>

            <p className="text-stone-600 text-lg leading-relaxed mb-8 border-b pb-8 border-stone-100">
              {product.description}
            </p>

            {/* Acciones de Carrito */}
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <div className="flex items-center bg-stone-100 rounded-full px-4 py-3 w-fit">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 text-stone-500 hover:text-amber-600 transition-colors"
                >
                  <Minus size={20} />
                </button>
                <span className="font-bold w-12 text-center text-xl text-stone-800">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 text-stone-500 hover:text-amber-600 transition-colors"
                >
                  <Plus size={20} />
                </button>
              </div>

              <button 
                onClick={() => addToCart(product, quantity)}
                className="flex-1 bg-stone-900 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-amber-500 transition-colors shadow-xl flex items-center justify-center gap-3 group"
              >
                <ShoppingBag size={22} className="group-hover:-translate-y-1 transition-transform" />
                Agregar al Carrito
              </button>
            </div>
            
            {/* Garantías y Confianza */}
            <div className="grid grid-cols-2 gap-4 bg-amber-50/50 p-6 rounded-2xl border border-amber-100/50">
               <div className="flex items-start gap-4">
                  <div className="bg-amber-100 p-2 rounded-full text-amber-600 shrink-0">
                    <Truck size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-stone-800 text-sm">Despacho Rápido</h4>
                    <p className="text-xs text-stone-500 mt-1">Envíos protegidos</p>
                  </div>
               </div>
               <div className="flex items-start gap-4">
                  <div className="bg-amber-100 p-2 rounded-full text-amber-600 shrink-0">
                    <ShieldCheck size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-stone-800 text-sm">Calidad Premium</h4>
                    <p className="text-xs text-stone-500 mt-1">Extracción 100% natural</p>
                  </div>
               </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}