// src/components/common/ProductCard.tsx

import { Star } from "lucide-react";

export interface ProductType {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url?: string;
  image?: string; 
  category?: string;
  size_category?: string;
  is_featured?: boolean;
  stock?: number;
  rating?: number; 
  reviews?: number; 
}

type ProductCardProps = {
  product: ProductType;
  onNavigate: (page: string, productId?: string) => void;
};

export default function ProductCard({ product, onNavigate }: ProductCardProps) {
  // Renderizar estrellas de calificación
  const renderRating = (rating: number = 5) => {
    const fullStars = Math.floor(rating);
    return (
      <div className="flex items-center space-x-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={16}
            className={
              i < fullStars ? "text-yellow-400 fill-current" : "text-stone-300"
            }
          />
        ))}
      </div>
    );
  };

  // ==========================================
  // LÓGICA INTELIGENTE DE IMÁGENES
  // ==========================================
  // 1. Tomamos lo que venga de la BD (preferimos image si ya está formateada, sino image_url)
  const rawImage = product.image || product.image_url;
  
  // 2. Imagen por defecto (Un conejito en caso de que no subas foto)
  let finalImageUrl = "https://images.pexels.com/photos/4001296/pexels-photo-4001296.jpeg";

  if (rawImage) {
    if (rawImage.startsWith('http')) {
      // Si ya es un link completo de internet, lo usamos tal cual
      finalImageUrl = rawImage;
    } else {
      // Si es una ruta de multer (ej. uploads/12345.png), le pegamos el backend
      const cleanPath = rawImage.startsWith('/') ? rawImage.slice(1) : rawImage;
      finalImageUrl = `http://localhost:5000/${cleanPath}`;
    }
  }

  return (
    <div
      className="group cursor-pointer bg-white rounded-[2rem] shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-green-50 flex flex-col"
      onClick={() => onNavigate("product", product.id)}
    >
      <div className="relative overflow-hidden bg-green-50 aspect-square p-2">
        <div className="w-full h-full rounded-[1.5rem] overflow-hidden relative">
          <img
            src={finalImageUrl}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
        </div>
        
        {/* Badges / Etiquetas */}
        <div className="absolute top-5 left-5 flex flex-col gap-2 z-10">
          {product.is_featured && (
            <span className="bg-orange-500 text-white text-[10px] px-3 py-1.5 rounded-full font-bold shadow-md uppercase tracking-wider">
              Destacado
            </span>
          )}
        </div>

        {/* Formato / Etapa */}
        {product.size_category && (
           <span className="absolute bottom-5 right-5 bg-white/90 backdrop-blur-sm text-stone-800 text-[10px] uppercase font-bold px-3 py-1.5 rounded-lg shadow-sm">
             {product.size_category}
           </span>
        )}
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <h3 className="font-bold text-stone-800 mb-2 group-hover:text-green-600 transition-colors text-xl line-clamp-1">
          {product.name}
        </h3>
        
        <div className="mb-4">
          {renderRating(product.rating)}
        </div>
        
        {/* <p className="text-stone-500 text-sm mb-6 line-clamp-2 flex-grow">
          {product.description}
        </p> */}
        
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-stone-100">
          <p className="text-2xl font-black text-green-700">
            ${product.price.toLocaleString('es-CL')}
          </p>
          
          <div className="w-10 h-10 rounded-full bg-green-50 text-green-600 flex items-center justify-center group-hover:bg-green-600 group-hover:text-white transition-colors">
            <span className="font-bold text-lg">+</span>
          </div>
        </div>
      </div>
    </div>
  );
}