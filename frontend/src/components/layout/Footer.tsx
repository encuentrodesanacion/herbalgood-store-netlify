// src/components/layout/Footer.tsx

import { Facebook, Instagram, Twitter, Mail, Rabbit } from "lucide-react";

type FooterProps = {
  onNavigate: (page: string) => void;
};

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-stone-950 text-white mt-20 font-sans border-t-4 border-green-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          
          {/* Marca y Descripción */}
          <div>
            <h3 className="text-2xl font-bold mb-4 text-green-500 flex items-center gap-2">
              <Rabbit size={28} /> Chileconejitos
            </h3>
            <p className="text-stone-400 text-sm leading-relaxed mb-6">
              Expertos en cunicultura responsable y bienestar animal. Encuentra a tu compañero ideal y todo lo necesario para su cuidado óptimo.
            </p>
          </div>

          {/* Enlaces de Tienda */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-stone-100">Chileconejitos</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <button
                  onClick={() => onNavigate("shop")}
                  className="text-stone-400 hover:text-green-400 transition-colors"
                >
                  Ejemplares Disponibles
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("shop")}
                  className="text-stone-400 hover:text-green-400 transition-colors"
                >
                  Alimento y Heno Premium
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("shop")}
                  className="text-stone-400 hover:text-green-400 transition-colors"
                >
                  Accesorios y Hábitat
                </button>
              </li>
            </ul>
          </div>

          {/* Enlaces de Comunidad */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-stone-100">Comunidad</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <button
                  onClick={() => onNavigate("about")}
                  className="text-stone-400 hover:text-green-400 transition-colors"
                >
                  Nuestro Criadero
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("blog")}
                  className="text-stone-400 hover:text-green-400 transition-colors"
                >
                  Guías y Cuidados
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("testimonios")}
                  className="text-stone-400 hover:text-green-400 transition-colors font-medium"
                >
                  Familias Felices (Reseñas)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("contact")}
                  className="text-stone-400 hover:text-green-400 transition-colors"
                >
                  Contacto y Asesoría
                </button>
              </li>
            </ul>
          </div>

          {/* Redes Sociales */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-stone-100">Conéctate</h4>
            <p className="text-stone-400 text-sm mb-6">
              Síguenos para consejos veterinarios, tips de socialización y actualizaciones de nuevas camadas.
            </p>
            <div className="flex space-x-3 mb-6">
              <a
                href="#"
                className="bg-stone-800 text-stone-300 p-2.5 rounded-full hover:bg-green-600 hover:text-white transition-all shadow-sm"
              >
                <Facebook size={18} />
              </a>
              <a
                href="#"
                className="bg-stone-800 text-stone-300 p-2.5 rounded-full hover:bg-green-600 hover:text-white transition-all shadow-sm"
              >
                <Instagram size={18} />
              </a>
              <a
                href="#"
                className="bg-stone-800 text-stone-300 p-2.5 rounded-full hover:bg-green-600 hover:text-white transition-all shadow-sm"
              >
                <Twitter size={18} />
              </a>
              <a
                href="mailto:info@chileconejitos.cl"
                className="bg-stone-800 text-stone-300 p-2.5 rounded-full hover:bg-green-600 hover:text-white transition-all shadow-sm"
              >
                <Mail size={18} />
              </a>
            </div>
            <div className="inline-block border border-green-500/30 bg-green-500/10 text-green-400 text-xs px-3 py-1.5 rounded-full">
              🐇 Crianza Ética y Responsable
            </div>
          </div>
        </div>

        <div className="border-t border-stone-800 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-stone-500">
          <p>
            &copy; {new Date().getFullYear()} Chileconejitos. Todos los derechos reservados.
          </p>
          <div className="flex gap-4">
            <button className="hover:text-green-400 transition-colors">Términos y Condiciones</button>
            <button className="hover:text-green-400 transition-colors">Política de Privacidad</button>
          </div>
        </div>
      </div>
    </footer>
  );
}