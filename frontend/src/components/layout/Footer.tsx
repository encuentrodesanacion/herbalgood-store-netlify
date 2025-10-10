// src/components/layout/Footer.tsx (Refactorizado)

import { Facebook, Instagram, Twitter, Mail } from "lucide-react";

type FooterProps = {
  onNavigate: (page: string) => void;
};

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-dark-slate text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 text-primary-green">
              Herbalgood
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Tu fuente de productos naturales y orgánicos para el bienestar
              holístico. Calidad, pureza y resultados garantizados.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Shop</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => onNavigate("shop")}
                  className="text-gray-400 hover:text-primary-green transition-colors"
                >
                  Todos los Productos
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("shop")}
                  className="text-gray-400 hover:text-primary-green transition-colors"
                >
                  Más Vendidos
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("shop")}
                  className="text-gray-400 hover:text-primary-green transition-colors"
                >
                  Nuevas Llegadas
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Compañía</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => onNavigate("about")}
                  className="text-gray-400 hover:text-primary-green transition-colors"
                >
                  Sobre Nosotros
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("contact")}
                  className="text-gray-400 hover:text-primary-green transition-colors"
                >
                  Contacto
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("blog")}
                  className="text-gray-400 hover:text-primary-green transition-colors"
                >
                  Nuestro Blog
                </button>
              </li>
              <li>
                <button className="text-gray-400 hover:text-primary-green transition-colors">
                  Política de Privacidad
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Conéctate</h4>
            <p className="text-gray-400 text-sm mb-4">
              Síguenos para tips de bienestar y ofertas exclusivas.
            </p>
            <div className="flex space-x-3 mb-4">
              <a
                href="#"
                className="bg-gray-800 p-2 rounded-full hover:bg-primary-green transition-colors"
              >
                <Facebook size={18} />
              </a>
              <a
                href="#"
                className="bg-gray-800 p-2 rounded-full hover:bg-primary-green transition-colors"
              >
                <Instagram size={18} />
              </a>
              <a
                href="#"
                className="bg-gray-800 p-2 rounded-full hover:bg-primary-green transition-colors"
              >
                <Twitter size={18} />
              </a>
              <a
                href="#"
                className="bg-gray-800 p-2 rounded-full hover:bg-primary-green transition-colors"
              >
                <Mail size={18} />
              </a>
            </div>
            <p className="text-gray-400 text-xs mt-6">
              🌱 Hecho con ingredientes naturales.
            </p>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} Herbalgood Store. Todos los
            derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
