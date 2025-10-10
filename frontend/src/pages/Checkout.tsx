// src/pages/Checkout.tsx (REFRACTORIZADO A SOLICITUD DE COTIZACIÓN)

import { useState } from "react";
import { Send, ShoppingCart, CheckCircle, Loader2 } from "lucide-react";
import { useCart } from "../context/CartContext";

type CheckoutProps = {
  onNavigate: (page: string) => void;
};

// Componente auxiliar para mostrar el resumen del pedido
const OrderSummary = () => {
  const { cart } = useCart();
  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="bg-gray-100 p-6 rounded-xl border border-gray-200 shadow-inner sticky top-20">
      <h3 className="text-xl font-bold text-dark-slate mb-4 border-b pb-2">
        Productos Solicitados
      </h3>
      <div className="space-y-3 text-gray-700">
        {cart.map((item) => (
          <div key={item.id} className="flex justify-between text-sm">
            <span>
              {item.name} (x{item.quantity})
            </span>
            <span className="font-semibold">
              ${(item.price * item.quantity).toFixed(2)}
            </span>
          </div>
        ))}
      </div>
      <div className="flex justify-between font-bold text-xl pt-4 border-t border-gray-300 mt-4 text-dark-slate">
        <span>Subtotal Estimado:</span>
        <span>${subtotal.toFixed(2)}</span>
      </div>
      <p className="text-xs text-gray-500 mt-2 italic">
        *El precio final será confirmado en la cotización oficial.
      </p>
    </div>
  );
};

export default function Checkout({ onNavigate }: CheckoutProps) {
  const { cart, clearCart } = useCart();
  const [isSent, setIsSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });

  if (cart.length === 0 && !isSent) {
    // ... (Contenido de carrito vacío)
    return (
      <div className="max-w-xl mx-auto py-20 text-center min-h-[60vh]">
        <ShoppingCart size={64} className="mx-auto text-gray-300 mb-6" />
        <h1 className="text-3xl text-dark-slate">Tu solicitud está vacía.</h1>
        <button
          onClick={() => onNavigate("shop")}
          className="mt-4 text-primary-green underline"
        >
          Volver a la Tienda
        </button>
      </div>
    );
  }

  // Genera el mensaje de cotización estructurado
  const generateQuotationMessage = () => {
    let message = `Estimado equipo HerbalGood,\n\nSe solicita una cotización formal para el siguiente pedido:\n\n`;

    cart.forEach((item) => {
      message += `- ${item.name} x ${
        item.quantity
      } unidades. (Precio estimado unitario: $${item.price.toFixed(2)})\n`;
    });

    const subtotal = cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    message += `\nSubtotal Estimado: $${subtotal.toFixed(2)}`;
    message += `\n\n--- Datos de Contacto del Cliente ---\n`;
    message += `Nombre: ${formData.name}\n`;
    message += `Email: ${formData.email}\n`;
    message += `Teléfono: ${formData.phone}\n`;
    message += `\nPor favor, pónganse en contacto para confirmar los detalles y el envío. ¡Gracias!`;

    return message;
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSendQuotation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    const finalMessage = generateQuotationMessage();

    // --- DATOS ESTRUCTURADOS PARA EL BACKEND ---
    const payload = {
      client: {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        quotation_message: finalMessage, // El mensaje se guarda en la tabla 'requests'
      },
      items: cart.map((item) => ({
        // Los items se guardan en la tabla 'items'
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
    };
    // ------------------------------------------

    try {
      const response = await fetch("/.netlify/functions/submit_quotation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload), // Enviamos el nuevo objeto 'payload'
      });

      if (!response.ok) {
        throw new Error("Error al enviar la cotización al servidor.");
      }

      // Proceso exitoso
      await response.json();
      setIsSent(true);
      clearCart();
    } catch (error) {
      console.error("Fallo al enviar la solicitud:", error);
      alert(
        "Hubo un error al procesar su solicitud. Por favor, intente de nuevo."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- Contenido de la Solicitud ---

  const QuotationForm = (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-dark-slate flex items-center gap-2">
        <Send size={24} className="text-primary-green" /> Solicitar Cotización
      </h2>

      <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
        <p className="text-gray-700 mb-4">
          Por favor, ingrese sus datos para que un agente de HerbalGood pueda
          contactarlo y enviarle la cotización formal de su pedido.
        </p>

        <form onSubmit={handleSendQuotation} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nombre Completo
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleFormChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-primary-green focus:border-primary-green"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Correo Electrónico
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleFormChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-primary-green focus:border-primary-green"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Teléfono (WhatsApp)
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleFormChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-primary-green focus:border-primary-green"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary-green text-white py-3 rounded-full font-semibold hover:bg-dark-slate transition-colors shadow-lg flex items-center justify-center gap-2 mt-6"
          >
            {isSubmitting ? (
              <Loader2 size={20} className="animate-spin" />
            ) : (
              <Send size={20} />
            )}
            {isSubmitting ? "Enviando..." : "Enviar Solicitud de Cotización"}
          </button>
        </form>
      </div>
    </div>
  );

  const ConfirmationMessage = (
    <div className="text-center py-10">
      <CheckCircle size={80} className="text-primary-green mx-auto mb-6" />
      <h2 className="text-3xl font-bold text-dark-slate mb-4">
        ¡Solicitud Enviada con Éxito!
      </h2>
      <p className="text-xl text-gray-700 mb-6">
        Gracias por su interés. Un agente de HerbalGood se contactará con usted
        por email o teléfono para enviarle la cotización formal de su pedido.
      </p>
      <button
        onClick={() => onNavigate("home")}
        className="bg-dark-slate text-white px-8 py-3 rounded-full font-semibold hover:bg-primary-green transition-colors shadow-lg"
      >
        Volver al Inicio
      </button>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-dark-slate mb-8">
        {isSent ? "Confirmación" : "Solicitud de Cotización"}
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mt-10">
        <div className="lg:col-span-2">
          {isSent ? ConfirmationMessage : QuotationForm}
        </div>

        {/* Resumen del Pedido */}
        <div className="lg:col-span-1">
          <OrderSummary />
        </div>
      </div>
    </div>
  );
}
