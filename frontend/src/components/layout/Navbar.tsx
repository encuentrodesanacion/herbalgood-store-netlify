// src/components/layout/Navbar.tsx (o la ruta donde lo tengas)

import { useState } from "react";
import { 
  ShoppingBag, 
  Menu, 
  X, 
  Search, 
  User, 
  Instagram, 
  Mail
} from "lucide-react";

// ¡IMPORTANTE! Agrega la extensión de tu archivo de imagen aquí (.png, .svg, .jpg)
import logo from "../../assets/fotoos.jpeg"; 

type NavbarProps = {
  onNavigate: (page: string) => void;
  cartItemCount: number;
};

export default function Navbar({ onNavigate, cartItemCount }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Mapeo de botones del menú principal (Temática Cunicultura)
  // Actualicé las acciones ('shop', 'blog') basándome en lo que usamos en Home.tsx
  const menuItems = [
    { label: "Ejemplares y Suministros", action: "shop" },
    { label: "Testimonios", action: "testimonials" },
    { label: "Guías y Cuidados", action: "blog" },
    { label: "Nuestro Criadero", action: "about" },
    { label: "Contacto", action: "contact" },
  ];

  return (
    <div className="w-full font-sans bg-white shadow-sm relative z-50">
      
      {/* 1. NIVEL SUPERIOR: Marquesina (Verde Naturaleza) */}
      <div className="bg-green-600 text-white text-[10px] md:text-xs py-2 overflow-hidden whitespace-nowrap border-b border-green-700/20">
        <div className="inline-block animate-marquee">
          {[...Array(6)].map((_, i) => (
             <span key={i} className="mx-8 font-bold uppercase tracking-widest">
               🐇 Envío Gratis sobre $50.000 en todo el país 🥕
             </span>
          ))}
        </div>
      </div>

      {/* 2. NIVEL MEDIO: Barra de Información (Tono Tierra Oscuro) */}
      <div className="bg-stone-900 text-green-50 py-2 px-4 text-xs md:text-sm font-medium hidden md:block border-b border-white/10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
           {/* Izquierda: Redes */}
           <div className="flex items-center gap-4">
              <a href="#" className="flex items-center gap-2 hover:text-green-400 transition-colors">
                <Instagram size={14} /> <span className="font-bold">@Chileconejitos</span>
              </a>
           </div>
           {/* Derecha: Correo */}
           <div className="flex items-center gap-2 hover:text-green-400 transition-colors cursor-pointer">
              <Mail size={14} /> 
              <span className="tracking-wide">Ruben@Chileconejitos.cl</span>
           </div>
        </div>
      </div>

      {/* 3. NIVEL PRINCIPAL: Navegación (Textura de Naturaleza/Hojas) */}
      <nav 
        className="sticky top-0 py-4 px-4 transition-all bg-cover bg-center shadow-sm"
        style={{
          // Fondo sutil de hojas con un overlay blanco/verdoso muy transparente
          backgroundImage: `linear-gradient(rgba(240, 253, 244, 0.96), rgba(255, 255, 255, 0.98)), url('https://images.pexels.com/photos/1072824/pexels-photo-1072824.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')`
        }}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          
          {/* A. LOGO + SUBTÍTULO (Izquierda) */}
          <div 
            className="flex items-center gap-3 cursor-pointer group" 
            onClick={() => onNavigate("home")}
          >
            {/* Contenedor del Logo */}
            <div className="group-hover:-translate-y-1 transition-transform shadow-sm flex items-center justify-center">
               <img 
                 src={logo} 
                 alt="Logo Rabbit Boutique" 
                 className="h-10 w-auto object-contain" 
                 // Si no tienes logo temporalmente, puedes usar un div de fallback
                 onError={(e) => {
                   (e.target as HTMLImageElement).style.display = 'none';
                 }}
               />
            </div>
            
            <div className="flex flex-col leading-none">
              <span className="text-xl md:text-2xl font-bold text-stone-800 tracking-tight group-hover:text-green-600 transition-colors">
               ChileConejitos
              </span>
              <span className="text-[10px] text-green-700/80 uppercase tracking-[0.2em] font-medium mt-1">
                Cunicultura Responsable
              </span>
            </div>
          </div>

          {/* B. MENÚ DE ESCRITORIO (Centro) */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm font-bold text-stone-600 uppercase tracking-wide">
            {menuItems.map((item) => (
              <button
                key={item.label}
                onClick={() => onNavigate(item.action)}
                className="hover:text-green-600 hover:underline underline-offset-4 decoration-2 transition-all"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* C. ICONOS DE ACCIÓN (Derecha) */}
          <div className="flex items-center gap-4 md:gap-6 text-stone-800">
            {/* Lupa (Buscar) */}
            <button className="hover:text-green-600 transition-colors hidden sm:block">
              <Search size={20} strokeWidth={2} />
            </button>
            
            <button 
              onClick={() => onNavigate('account')}
              className="hover:text-green-600 transition-colors"
              aria-label="Mi Cuenta"
            >
              <User size={20} strokeWidth={2} />
            </button>

            {/* Botón de Carrito */}
            <button 
              onClick={() => onNavigate('cart')} 
              className="relative hover:text-green-600 transition-colors"
            >
              <ShoppingBag size={20} strokeWidth={2} />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-green-600 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full shadow-sm">
                  {cartItemCount}
                </span>
              )}
            </button>

            {/* Botón Menú Móvil (Hamburguesa) */}
            <button 
              className="lg:hidden text-stone-800 hover:text-green-600"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* MENÚ MÓVIL DESPLEGABLE */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-white border-t border-green-50 shadow-xl py-4 flex flex-col z-50 animate-fade-in-down">
            {menuItems.map((item) => (
              <button 
                key={item.label}
                onClick={() => { 
                  onNavigate(item.action); 
                  setIsMenuOpen(false); 
                }} 
                className="text-left px-6 py-3 border-b border-green-50/50 text-stone-700 font-medium hover:bg-green-50 hover:text-green-600 hover:pl-8 transition-all"
              >
                {item.label}
              </button>
            ))}
            <div className="px-6 py-4 flex gap-4 border-t border-green-100 mt-2">
                <button className="flex items-center gap-2 text-sm text-stone-500 hover:text-green-600"><Search size={16}/> Buscar</button>
                <button className="flex items-center gap-2 text-sm text-stone-500 hover:text-green-600" onClick={() => { onNavigate('account'); setIsMenuOpen(false); }}><User size={16}/> Cuenta</button>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
}