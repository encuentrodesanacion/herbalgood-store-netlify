// src/pages/CartPage.tsx

import { Trash2, ShoppingCart, Minus, Plus, X } from "lucide-react";
import { useCart } from "../context/CartContext";

type CartPageProps = {
  onNavigate: (page: string, productId?: string) => void;
};

export default function CartPage({ onNavigate }: CartPageProps) {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();
  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  if (cart.length === 0) {
    // ... (Contenido de carrito vacío)
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center min-h-[60vh]">
        <ShoppingCart size={64} className="mx-auto text-gray-300 mb-6" />
        <h1 className="text-3xl font-bold text-dark-slate mb-4">
          Tu Solicitud de Cotización Está Vacía
        </h1>
        <p className="text-gray-600 mb-8">
          Parece que aún no has agregado productos. ¡Explora nuestras
          colecciones!
        </p>
        <button
          onClick={() => onNavigate("shop")}
          className="bg-primary-green text-white px-8 py-4 rounded-full font-semibold hover:bg-dark-slate transition-colors shadow-lg"
        >
          Ir a la Tienda
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-dark-slate mb-8 border-b pb-4">
        Productos para Cotizar ({cart.length} items)
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Columna de Items del Carrito (Cantidad) */}
        <div className="lg:col-span-2 space-y-6">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center bg-white p-4 rounded-xl shadow-md border border-gray-100"
            >
              {/* ... (Imagen y nombre del producto) ... */}
              <div className="w-24 h-24 overflow-hidden rounded-lg mr-4 border">
                <img
                  src={item.image_url}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-grow">
                <h2
                  className="text-lg font-semibold text-dark-slate hover:text-primary-green transition-colors cursor-pointer"
                  onClick={() => onNavigate("product", item.id)}
                >
                  {item.name}
                </h2>
                <p className="text-primary-green font-bold text-xl mt-1">
                  ${item.price.toFixed(2)}
                </p>
                <p className="text-sm text-gray-500">
                  Precio unitario estimado
                </p>
              </div>

              {/* Control de Cantidad */}
              <div className="flex items-center space-x-2 mx-4">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="p-1 text-dark-slate hover:bg-gray-100 rounded-full disabled:opacity-50"
                  disabled={item.quantity <= 1}
                >
                  <Minus size={18} />
                </button>
                <span className="w-8 text-center font-medium">
                  {item.quantity}
                </span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="p-1 text-dark-slate hover:bg-gray-100 rounded-full"
                >
                  <Plus size={18} />
                </button>
              </div>

              <div className="font-bold text-dark-slate w-20 text-right hidden sm:block">
                ${(item.price * item.quantity).toFixed(2)}
              </div>

              <button
                onClick={() => removeFromCart(item.id)}
                className="ml-4 p-2 text-gray-500 hover:text-red-600 transition-colors rounded-full hover:bg-red-50"
              >
                <X size={20} />
              </button>
            </div>
          ))}

          <button
            onClick={clearCart}
            className="text-red-600 hover:text-red-800 flex items-center gap-1 mt-4 transition-colors"
          >
            <Trash2 size={18} /> Vaciar Solicitud
          </button>
        </div>

        {/* Columna de Resumen de Cotización */}
        <div className="lg:col-span-1 bg-gray-50 p-6 rounded-xl shadow-inner h-fit sticky top-20 border border-gray-100">
          <h2 className="text-2xl font-bold text-dark-slate mb-6 border-b pb-3">
            Resumen de la Solicitud
          </h2>
          <div className="space-y-3 text-gray-700">
            <div className="flex justify-between font-bold text-xl pt-4 text-dark-slate">
              <span>Subtotal Estimado</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
          </div>
          <button
            onClick={() => onNavigate("checkout")}
            className="w-full bg-primary-green text-white py-3 rounded-full font-semibold mt-8 hover:bg-dark-slate transition-colors shadow-lg"
          >
            Solicitar Cotización
          </button>
          <p className="text-xs text-gray-500 text-center mt-2">
            * Un agente se contactará para confirmar su solicitud.
          </p>
        </div>
      </div>
    </div>
  );
}
