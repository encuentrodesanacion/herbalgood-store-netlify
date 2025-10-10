// src/pages/Shop.tsx

import { useState } from "react";
import { Filter, X, ArrowDownWideNarrow } from "lucide-react";
import ProductCard from "../components/common/ProductCard";
import { products } from "../data/mockData";
import { getProducts } from "../services/apiService";
import type { Product } from "../data/mockData";

type ShopProps = {
  onNavigate: (page: string, productId?: string) => void;
};

export default function Shop({ onNavigate }: ShopProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [currentProducts, setCurrentProducts] = useState<Product[]>(products);

  // Lógica de filtrado y ordenamiento (mock)
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const sortValue = e.target.value;
    let sorted = [...currentProducts];

    switch (sortValue) {
      case "price-asc":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "rating-desc":
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      case "name-asc":
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        // Por defecto: mantén el orden mock (o por ID)
        sorted = products;
        break;
    }
    setCurrentProducts(sorted);
  };

  // Simulación de Filtros (solo UI)
  const categories = ["Tés", "Suplementos", "Belleza", "Kits", "Café"];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-dark-slate mb-8 border-b pb-4">
        Catálogo de Productos
      </h1>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Filtros (Sidebar) */}
        <div
          className={`md:w-1/4 ${
            isFilterOpen ? "block" : "hidden"
          } md:block fixed md:static top-0 left-0 h-full w-full bg-white md:bg-transparent z-40 p-6 md:p-0 shadow-xl md:shadow-none`}
        >
          <div className="flex justify-between items-center mb-6 md:hidden">
            <h2 className="text-xl font-semibold text-dark-slate">Filtros</h2>
            <button
              onClick={() => setIsFilterOpen(false)}
              className="text-dark-slate"
            >
              <X size={24} />
            </button>
          </div>

          <div className="space-y-6">
            {/* Filtro por Categoría */}
            <div className="border p-4 rounded-lg bg-gray-50">
              <h3 className="font-semibold text-dark-slate mb-3 border-b pb-2">
                Categoría
              </h3>
              <div className="space-y-2">
                {categories.map((cat) => (
                  <label
                    key={cat}
                    className="flex items-center text-gray-700 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      className="mr-2 accent-primary-green"
                    />
                    {cat}
                  </label>
                ))}
              </div>
            </div>

            {/* Filtro por Precio */}
            <div className="border p-4 rounded-lg bg-gray-50">
              <h3 className="font-semibold text-dark-slate mb-3 border-b pb-2">
                Rango de Precio
              </h3>
              <input
                type="range"
                min="0"
                max="100"
                value="50"
                readOnly
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-green"
              />
              <div className="flex justify-between text-sm text-gray-600 mt-1">
                <span>$0</span>
                <span>$50</span>
                <span>$100+</span>
              </div>
            </div>
          </div>
        </div>

        {/* Botón de Filtro Móvil */}
        <button
          onClick={() => setIsFilterOpen(true)}
          className="md:hidden fixed bottom-4 right-4 bg-primary-green text-white p-3 rounded-full shadow-lg z-50 flex items-center gap-2"
        >
          <Filter size={20} /> Filtros
        </button>

        {/* Productos (Main Content) */}
        <div className="md:w-3/4">
          {/* Barra de Ordenamiento */}
          <div className="flex justify-end items-center mb-6">
            <label
              htmlFor="sort"
              className="text-gray-700 flex items-center gap-2"
            >
              <ArrowDownWideNarrow size={18} className="text-primary-green" />
              Ordenar por:
            </label>
            <select
              id="sort"
              onChange={handleSortChange}
              className="ml-2 border border-gray-300 rounded-md p-2 text-dark-slate focus:ring-primary-green focus:border-primary-green"
            >
              <option value="default">Relevancia</option>
              <option value="price-asc">Precio: Menor a Mayor</option>
              <option value="price-desc">Precio: Mayor a Menor</option>
              <option value="rating-desc">Mejor Valorados</option>
              <option value="name-asc">Nombre (A-Z)</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onNavigate={onNavigate}
              />
            ))}
          </div>

          {currentProducts.length === 0 && (
            <p className="text-center text-xl text-gray-500 py-10">
              No se encontraron productos con estos criterios.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
