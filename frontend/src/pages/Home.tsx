// src/pages/Home.tsx (Refactorizado)

import { Star, ArrowRight } from "lucide-react";
import { products, testimonials } from "../data/mockData";
import ProductCard from "../components/common/ProductCard";

type HomeProps = {
  onNavigate: (page: string, productId?: string) => void;
};

export default function Home({ onNavigate }: HomeProps) {
  const featuredProducts = products.filter((p) => p.is_featured);
  const bestSellers = products.filter((p) => p.is_best_seller).slice(0, 4);
  const newArrivals = products.filter((p) => p.is_new_arrival);
  const featuredTestimonials = testimonials
    .filter((t) => t.is_featured)
    .slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* Sección Hero */}
      <section
        className="relative h-[600px] bg-cover bg-center flex items-center"
        style={{
          backgroundImage:
            "linear-gradient(rgba(31, 41, 55, 0.5), rgba(31, 41, 55, 0.7)), url(https://images.pexels.com/photos/3738386/pexels-photo-3738386.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
            Bienestar Natural
            <br />
            <span className="text-primary-green">para tu Vida Diaria</span>
          </h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto leading-relaxed opacity-90">
            Descubre nuestra colección de productos naturales, orgánicos y de
            alta calidad para cuidar tu salud y belleza de forma integral.
          </p>
          <button
            onClick={() => onNavigate("shop")}
            className="bg-primary-green text-white px-8 py-4 rounded-full font-semibold hover:bg-dark-slate transition-all transform hover:scale-105 inline-flex items-center gap-2 shadow-xl"
          >
            Explora la Tienda <ArrowRight size={20} />
          </button>
        </div>
      </section>

      {/* Productos Destacados */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-dark-slate mb-4">
              Nuestros Favoritos
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Productos seleccionados por su popularidad y resultados.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onNavigate={onNavigate}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="py-16 bg-light-green">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-dark-slate mb-4">
              Los Más Vendidos
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              La elección de nuestra comunidad.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {bestSellers.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onNavigate={onNavigate}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonios */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-dark-slate mb-4">
              Historias Reales
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Lo que dicen nuestros clientes sobre su experiencia Herbalgood.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredTestimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-white rounded-xl p-6 shadow-md border-t-4 border-primary-green"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      className="text-amber-500 fill-current"
                    />
                  ))}
                </div>
                <p className="text-gray-700 italic mb-4 leading-relaxed">
                  "{testimonial.comment}"
                </p>
                <p className="font-semibold text-dark-slate">
                  — {testimonial.customer_name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-primary-green text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Mantente al Día con Herbalgood
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Suscríbete para recibir ofertas exclusivas, consejos de bienestar y
            novedades sobre nuestros productos.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Ingresa tu email"
              className="flex-1 px-6 py-4 rounded-full text-dark-slate focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button className="bg-dark-slate text-white px-8 py-4 rounded-full font-semibold hover:bg-gray-700 transition-colors shadow-lg">
              Suscribirme
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
