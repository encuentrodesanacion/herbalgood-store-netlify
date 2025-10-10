// src/components/layout/Navbar.tsx (Refactorizado)

import { useState } from "react";
import { ShoppingCart, Menu, X, Search, User } from "lucide-react";

type NavbarProps = {
  onNavigate: (page: string) => void;
  cartItemCount: number;
};

export default function Navbar({ onNavigate, cartItemCount }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isShopOpen, setIsShopOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <button
              onClick={() => onNavigate("home")}
              // Logo con acento verde
              className="text-2xl font-bold text-primary-green hover:text-dark-slate transition-colors"
            >
              Herbalgood
            </button>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {/* Navegación Principal */}
            {["home", "shop", "blog", "about", "contact"].map((page) => (
              <button
                key={page}
                onClick={() => onNavigate(page)}
                className="text-dark-slate hover:text-primary-green transition-colors font-medium capitalize"
              >
                {page === "home" ? "Home" : page === "shop" ? "Shop" : page}
              </button>
            ))}

            {/* Submenú de Shop (Desplegable) */}
            <div className="relative group">
              {isShopOpen && (
                <div
                  onMouseEnter={() => setIsShopOpen(true)}
                  onMouseLeave={() => setIsShopOpen(false)}
                  className="absolute left-0 mt-2 w-56 bg-white rounded-lg shadow-xl py-2 z-50 border border-gray-100"
                ></div>
              )}
            </div>
          </div>

          {/* Íconos de Acción */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => onNavigate("cart")}
              className="relative text-dark-slate hover:text-primary-green transition-colors"
            >
              <ShoppingCart size={20} />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary-green text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {cartItemCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-dark-slate hover:text-primary-green"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Menú Móvil */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <div className="flex flex-col space-y-3">
              {["home", "shop", "blog", "about", "contact"].map((page) => (
                <button
                  key={`mobile-${page}`}
                  onClick={() => {
                    onNavigate(page);
                    setIsMenuOpen(false);
                  }}
                  className="text-dark-slate hover:text-primary-green transition-colors text-left font-medium px-4 py-1 capitalize"
                >
                  {page === "home" ? "Home" : page === "shop" ? "Shop" : page}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
