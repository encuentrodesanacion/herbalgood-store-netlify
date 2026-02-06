import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Star, Minus, Plus, ShoppingBag, ArrowLeft, Truck, ShieldCheck, Heart } from "lucide-react";
import { products } from "../data/mockData";
import { useCart } from "../context/CartContext"; // 1. Importamos el contexto

// 2. Corregimos el Type: Eliminamos 'addToCart' de aquí
type ProductDetailProps = {
  onNavigate: (page: string) => void;
};

export default function ProductDetail({ onNavigate }: ProductDetailProps) {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // 3. Usamos el hook aquí dentro en lugar de recibirlo por props
  const { addToCart } = useCart(); 
  
  const [quantity, setQuantity] = useState(1);
  const [activeImg, setActiveImg] = useState(0);

  // Buscamos el producto
  const product = products.find((p) => p.id === id);

  // Manejo de error si no existe
  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-natural-cream">
        <h2 className="text-2xl font-bold text-dark-slate mb-4">Planta no encontrada 🌿</h2>
        <button onClick={() => navigate("/")} className="text-primary-green hover:underline">
          Volver al inicio
        </button>
      </div>
    );
  }

  // Imágenes simuladas para galería
  const images = [
    product.image_url,
    "https://images.pexels.com/photos/796602/pexels-photo-796602.jpeg", 
    "https://images.pexels.com/photos/3094205/pexels-photo-3094205.jpeg" 
  ];

  return (
    <div className="min-h-screen bg-natural-cream font-sans text-dark-slate py-12 px-4">
      
      {/* Navegación Superior */}
      <div className="max-w-7xl mx-auto mb-8 flex items-center justify-between">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-500 hover:text-primary-green transition-colors font-medium"
        >
          <ArrowLeft size={20} /> Volver
        </button>
        <span className="hidden md:block text-sm text-gray-400 uppercase tracking-widest">
          Tienda / {product.size_category ? `Plantas ${product.size_category}` : 'Plantas'} / {product.name}
        </span>
      </div>

      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-sm overflow-hidden p-6 md:p-12">
        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* Galería */}
          <div className="w-full lg:w-1/2">
            <div className="relative overflow-hidden rounded-xl h-[500px] mb-4 bg-gray-100">
              <img 
                src={images[activeImg]} 
                alt={product.name} 
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
              <button className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md hover:text-red-500 transition-colors">
                <Heart size={20} />
              </button>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-2">
              {images.map((img, idx) => (
                <button 
                  key={idx}
                  onClick={() => setActiveImg(idx)}
                  className={`w-24 h-24 rounded-lg overflow-hidden border-2 flex-shrink-0 transition-all ${
                    activeImg === idx ? 'border-primary-green opacity-100' : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center">
            <h1 className="text-4xl md:text-5xl font-bold font-serif text-dark-slate mb-4">
              {product.name}
            </h1>
            
            <div className="flex items-center gap-4 mb-6">
              <span className="text-3xl text-primary-green font-bold">
                ${product.price.toLocaleString('es-CL')}
              </span>
              <div className="h-6 w-px bg-gray-300"></div>
              <div className="flex items-center gap-1">
                <Star size={18} className="text-amber-400 fill-current" />
                <span className="font-bold text-gray-700">{product.rating}</span>
              </div>
            </div>

            <p className="text-gray-600 text-lg leading-relaxed mb-8 border-b pb-8 border-gray-100">
              {product.description}
              <br /><br />
              <span className="text-sm italic text-gray-500">
                Detalles: {product.details}
              </span>
            </p>

            {/* Acciones */}
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <div className="flex items-center bg-gray-100 rounded-full px-4 py-3 w-fit">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-1 hover:text-primary-green transition-colors"
                >
                  <Minus size={18} />
                </button>
                <span className="font-bold w-12 text-center text-lg">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-1 hover:text-primary-green transition-colors"
                >
                  <Plus size={18} />
                </button>
              </div>

              <button 
                onClick={() => addToCart(product, quantity)}
                className="flex-1 bg-dark-slate text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-primary-green transition-all shadow-lg flex items-center justify-center gap-3 group"
              >
                <ShoppingBag size={20} className="group-hover:-translate-y-1 transition-transform" />
                Agregar al Carrito
              </button>
            </div>
            
            {/* Garantías */}
            <div className="grid grid-cols-2 gap-4 bg-[#F9FBF6] p-6 rounded-xl border border-primary-green/10">
               <div className="flex items-start gap-3">
                  <Truck className="text-primary-green shrink-0" />
                  <div>
                    <h4 className="font-bold text-sm">Despacho Rápido</h4>
                    <p className="text-xs text-gray-500">Envíos en RM</p>
                  </div>
               </div>
               <div className="flex items-start gap-3">
                  <ShieldCheck className="text-primary-green shrink-0" />
                  <div>
                    <h4 className="font-bold text-sm">Garantía</h4>
                    <p className="text-xs text-gray-500">Calidad asegurada</p>
                  </div>
               </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}