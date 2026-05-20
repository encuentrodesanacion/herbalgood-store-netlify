// src/pages/Shop.tsx

import { useState, useEffect } from "react";
import { Filter, X, ArrowDownWideNarrow, Loader2 } from "lucide-react";
import ProductCard from "../components/common/ProductCard";

type ShopProps = {
  onNavigate: (page: string, productId?: string) => void;
};

export default function Shop({ onNavigate }: ShopProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  // Estados para los datos reales
  const [products, setProducts] = useState<any[]>([]); // Todos los productos de la BD
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]); // Productos a mostrar
  const [isLoading, setIsLoading] = useState(true);
  
  // Estados para los filtros activos
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortMethod, setSortMethod] = useState("default");

  // Las categorías reales para la boutique de conejos
  const categories = ["Mascotas", "Enanos", "Gigantes", "Alimento", "Accesorios"];

  // 1. CARGAR PRODUCTOS DESDE EL BACKEND AL INICIAR
  useEffect(() => {
  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      // 👇 Agregamos { cache: 'no-store' } aquí
      const response = await fetch('http://localhost:5000/api/products', {
        cache: 'no-store' 
      });
      
      if (response.ok) {
          const data = await response.json();
          // Mapeamos los datos para asegurar que ProductCard los lea correctamente 
          const mappedData = data.map((item: any) => ({
            ...item,
            image: item.image_url || item.image, 
            rating: item.rating || 5, // Mock temporal ya que aún no hay sistema de rating en BD
            reviews: item.reviews || 8 
          }));
          setProducts(mappedData);
        }
      } catch (error) {
        console.error("Error al cargar la tienda:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // 2. APLICAR FILTROS Y ORDENAMIENTO DINÁMICO
  useEffect(() => {
    let result = [...products];

    // Filtrar por categorías seleccionadas (si hay alguna marcada)
    if (selectedCategories.length > 0) {
      // Usamos 'Mascotas' como fallback en caso de que un producto no tenga categoría definida
      result = result.filter(p => selectedCategories.includes(p.category || 'Mascotas'));
    }

    // Ordenar los resultados
    switch (sortMethod) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating-desc":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "name-asc":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        // Por defecto (ej. por fecha de creación o ID)
        break;
    }

    setFilteredProducts(result);
  }, [products, selectedCategories, sortMethod]);

  // Manejador para los checkboxes de categorías
  const handleCategoryToggle = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category) // Lo quita si ya estaba
        : [...prev, category]              // Lo agrega si no estaba
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 font-sans bg-white min-h-screen">
      <h1 className="text-4xl font-bold text-stone-900 mb-8 border-b border-green-100 pb-4 font-serif">
        Ejemplares y Suministros
      </h1>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Filtros (Sidebar) */}
        <div
          className={`md:w-1/4 ${
            isFilterOpen ? "block" : "hidden"
          } md:block fixed md:static top-0 left-0 h-full w-full bg-white md:bg-transparent z-40 p-6 md:p-0 shadow-2xl md:shadow-none overflow-y-auto`}
        >
          <div className="flex justify-between items-center mb-6 md:hidden">
            <h2 className="text-xl font-bold text-stone-800">Filtros</h2>
            <button
              onClick={() => setIsFilterOpen(false)}
              className="text-stone-500 hover:text-green-600 bg-green-50 p-2 rounded-full transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          <div className="space-y-6">
            {/* Filtro por Categoría */}
            <div className="border border-green-100 p-6 rounded-3xl bg-green-50/30">
              <h3 className="font-bold text-stone-800 mb-4 border-b border-green-200/50 pb-3">
                Categoría
              </h3>
              <div className="space-y-3">
                {categories.map((cat) => (
                  <label
                    key={cat}
                    className="flex items-center text-stone-600 cursor-pointer hover:text-green-700 transition-colors font-medium"
                  >
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(cat)}
                      onChange={() => handleCategoryToggle(cat)}
                      className="mr-3 w-5 h-5 rounded border-stone-300 text-green-600 focus:ring-green-500 transition-all"
                    />
                    {cat}
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Botón de Filtro Móvil */}
        <button
          onClick={() => setIsFilterOpen(true)}
          className="md:hidden fixed bottom-6 right-6 bg-green-600 text-white font-bold px-6 py-4 rounded-full shadow-2xl z-50 flex items-center gap-2 hover:bg-green-700 transition-colors"
        >
          <Filter size={20} /> Filtros
        </button>

        {/* Productos (Main Content) */}
        <div className="md:w-3/4">
          {/* Barra de Ordenamiento */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <span className="text-stone-500 text-sm font-medium">
              Mostrando {filteredProducts.length} resultados
            </span>
            <div className="flex items-center">
              <label
                htmlFor="sort"
                className="text-stone-600 flex items-center gap-2 text-sm font-bold mr-3"
              >
                <ArrowDownWideNarrow size={18} className="text-green-600" />
                Ordenar:
              </label>
              <select
                id="sort"
                value={sortMethod}
                onChange={(e) => setSortMethod(e.target.value)}
                className="border border-stone-200 rounded-2xl p-2.5 text-stone-700 focus:ring-2 focus:ring-green-500 outline-none bg-white shadow-sm font-medium cursor-pointer transition-shadow"
              >
                <option value="default">Relevancia</option>
                <option value="price-asc">Precio: Menor a Mayor</option>
                <option value="price-desc">Precio: Mayor a Menor</option>
                <option value="rating-desc">Mejor Valorados</option>
                <option value="name-asc">Nombre (A-Z)</option>
              </select>
            </div>
          </div>

          {/* Grilla de Productos */}
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-32 text-stone-400">
              <Loader2 className="animate-spin mb-4 text-green-500" size={48} />
              <p className="font-medium text-lg">Preparando el catálogo...</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onNavigate={onNavigate}
                  />
                ))}
              </div>

              {filteredProducts.length === 0 && (
                <div className="text-center py-20 bg-green-50/50 rounded-[2rem] border border-green-100 mt-6 shadow-sm">
                  <p className="text-xl text-stone-600 font-medium mb-4">
                    No se encontraron ejemplares o suministros en esta categoría.
                  </p>
                  <button 
                    onClick={() => setSelectedCategories([])}
                    className="bg-white text-green-700 border-2 border-green-200 px-6 py-2 rounded-full font-bold hover:bg-green-50 hover:border-green-300 transition-all shadow-sm"
                  >
                    Mostrar todo
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}