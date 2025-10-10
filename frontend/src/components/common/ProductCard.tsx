// src/components/common/ProductCard.tsx

import { Star } from "lucide-react";
import type { Product } from "../../data/mockData"; // Usando 'type' para evitar errores de TypeScript modernos

type ProductCardProps = {
  product: Product;
  onNavigate: (page: string, productId?: string) => void;
};

export default function ProductCard({ product, onNavigate }: ProductCardProps) {
  // Función para renderizar estrellas de calificación
  const renderRating = (rating: number) => {
    const fullStars = Math.floor(rating);
    return (
      <div className="flex items-center space-x-0.5">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={16}
            className={
              i < fullStars ? "text-amber-400 fill-current" : "text-gray-300"
            }
          />
        ))}
      </div>
    );
  };

  return (
    <div
      className="group cursor-pointer bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
      onClick={() => onNavigate("product", product.id)}
    >
      <div className="relative overflow-hidden bg-gray-100 aspect-square">
        <img
          src={product.image_url}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {product.is_new_arrival && (
          <span className="absolute top-3 left-3 bg-primary-green text-white text-xs px-3 py-1 rounded-full font-semibold shadow-md">
            Nuevo
          </span>
        )}
        {product.is_best_seller && (
          <span className="absolute top-3 left-3 bg-dark-slate text-white text-xs px-3 py-1 rounded-full font-semibold shadow-md">
            Top Ventas
          </span>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-dark-slate mb-1 group-hover:text-primary-green transition-colors text-lg">
          {product.name}
        </h3>
        {renderRating(product.rating)}
        <p className="text-gray-500 text-sm mb-2 line-clamp-2 mt-1">
          {product.description}
        </p>
        <p className="text-xl font-bold text-primary-green mt-2">
          ${product.price.toFixed(2)}
        </p>
      </div>
    </div>
  );
}
