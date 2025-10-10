// src/pages/ProductDetail.tsx

import { useParams } from "react-router-dom";
import { Star, ShoppingCart, Truck, Check, Minus, Plus } from "lucide-react";
import { products } from "../data/mockData";
import { useCart } from "../context/CartContext";
import { useState } from "react";

type ProductDetailProps = {
  onNavigate: (page: string, productId?: string) => void;
};

export default function ProductDetail({ onNavigate }: ProductDetailProps) {
  const { id } = useParams<{ id: string }>();
  const product = products.find((p) => p.id === id);
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center min-h-[60vh]">
        <h1 className="text-3xl font-bold text-dark-slate">
          Producto no encontrado
        </h1>
        <p className="text-gray-600 mt-4">
          El ID de producto ({id}) no existe en nuestro catálogo.
        </p>
        <button
          onClick={() => onNavigate("shop")}
          className="mt-6 bg-primary-green text-white px-6 py-3 rounded-full hover:bg-dark-slate transition-colors"
        >
          Volver a la Tienda
        </button>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  // Función para renderizar estrellas de calificación
  const renderRating = (rating: number) => {
    const fullStars = Math.floor(rating);
    return (
      <div className="flex items-center space-x-0.5">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={20}
            className={
              i < fullStars ? "text-amber-500 fill-current" : "text-gray-300"
            }
          />
        ))}
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Columna de Imagen */}
        <div className="relative aspect-square bg-gray-100 rounded-xl overflow-hidden shadow-lg">
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Columna de Detalles */}
        <div>
          <h1 className="text-4xl font-extrabold text-dark-slate mb-2">
            {product.name}
          </h1>
          <div className="flex items-center mb-6 space-x-2">
            {renderRating(product.rating)}
            <span className="text-gray-600 text-sm">
              ({product.rating.toFixed(1)}/5)
            </span>
          </div>

          <p className="text-4xl font-bold text-primary-green mb-6">
            ${product.price.toFixed(2)}
          </p>

          <p className="text-gray-700 leading-relaxed mb-8 border-b pb-6">
            {product.description}
          </p>

          {/* Selector de Cantidad */}
          <div className="flex items-center space-x-4 mb-8">
            <span className="font-semibold text-dark-slate">Cantidad:</span>
            <div className="flex items-center border border-gray-300 rounded-full">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-3 text-dark-slate hover:bg-gray-100 rounded-full"
              >
                <Minus size={18} />
              </button>
              <span className="w-10 text-center font-bold text-lg text-dark-slate">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="p-3 text-dark-slate hover:bg-gray-100 rounded-full"
              >
                <Plus size={18} />
              </button>
            </div>
          </div>

          {/* Botón de Agregar al Carrito */}
          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className={`w-full py-4 rounded-full font-semibold text-lg transition-all transform flex items-center justify-center gap-3 shadow-md
                ${
                  product.stock > 0
                    ? isAdded
                      ? "bg-dark-slate text-white hover:bg-gray-700"
                      : "bg-primary-green text-white hover:bg-emerald-600"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
          >
            {product.stock > 0 ? (
              isAdded ? (
                <>
                  <Check size={20} /> Agregado al Carrito
                </>
              ) : (
                <>
                  <ShoppingCart size={20} /> Agregar al Carrito
                </>
              )
            ) : (
              "Agotado"
            )}
          </button>

          {/* Información Adicional */}
          <div className="mt-8 space-y-4 p-6 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3 text-gray-700">
              <Truck size={20} className="text-primary-green" />
              <span>Envío Gratuito en compras mayores a $50.00</span>
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <Check size={20} className="text-primary-green" />
              <span>Garantía de Satisfacción de 30 días.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
