import { useState } from "react";
import { 
  ShoppingBag, 
  Menu, 
  X, 
  Search, 
  User, 
  Instagram, 
  Mail, 
  Leaf 
} from "lucide-react";

type NavbarProps = {
  onNavigate: (page: string) => void;
  cartItemCount: number;
};

export default function Navbar({ onNavigate, cartItemCount }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Mapeo de botones del menú principal
  const menuItems = [
    { label: "Tienda", action: "shop" },
    { label: "Bitacora de Plantas", action: "rentals" },
    { label: "Herbario Vivo", action: "projects" },
    { label: "Nosotros", action: "about" },
    { label: "Contacto", action: "contact" },
  ];

  return (
    <div className="w-full font-sans bg-white shadow-sm relative z-50">
      
      {/* 1. NIVEL SUPERIOR: Marquesina (Verde) */}
      <div className="bg-primary-green text-white text-[10px] md:text-xs py-2 overflow-hidden whitespace-nowrap border-b border-white/10">
        <div className="inline-block animate-marquee">
          {[...Array(6)].map((_, i) => (
             <span key={i} className="mx-8 font-bold uppercase tracking-widest">
               🛻 Envío Gratis sobre $100.000 en RM 🚛
             </span>
          ))}
        </div>
      </div>

      {/* 2. NIVEL MEDIO: Barra de Información (🌸 ROSA PALO) */}
      <div className="bg-brand-rose text-white py-2 px-4 text-xs md:text-sm font-medium hidden md:block border-b border-white/20">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
           {/* Izquierda: Redes */}
           <div className="flex items-center gap-4">
              <a href="#" className="flex items-center gap-2 hover:text-dark-slate transition-colors">
                <Instagram size={14} /> <span className="font-bold">@pinpilinpausha</span>
              </a>
           </div>
           {/* Derecha: Correo */}
           <div className="flex items-center gap-2 hover:text-dark-slate transition-colors cursor-pointer">
              <Mail size={14} /> 
              <span className="tracking-wide">hola@pinpilinpausha.cl</span>
           </div>
        </div>
      </div>

      {/* 3. NIVEL PRINCIPAL: Navegación (Con Textura) */}
      {/* CORRECCIÓN AQUÍ: Agregué el espacio en 'nav className' y la textura de fondo */}
      <nav 
        className="sticky top-0 py-4 px-4 transition-all bg-cover bg-center shadow-sm"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.96), rgba(255,255,255,0.94)), url('https://images.pexels.com/photos/3394966/pexels-photo-3394966.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')`
        }}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          
          {/* A. LOGO + SUBTÍTULO (Izquierda) */}
          <div 
            className="flex items-center gap-2 cursor-pointer group" 
            onClick={() => onNavigate("home")}
          >
            <div className="bg-primary-green p-1.5 rounded-md text-white group-hover:rotate-12 transition-transform shadow-sm">
               <Leaf size={24} />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-xl md:text-2xl font-bold text-dark-slate tracking-tight group-hover:text-primary-green transition-colors">
                PINPILINPAUSHA
              </span>
              <span className="text-[10px] text-gray-400 uppercase tracking-[0.2em] font-medium">
               Plantas Y Antiguedades
              </span>
            </div>
          </div>

          {/* B. MENÚ DE ESCRITORIO (Centro) */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm font-bold text-gray-600 uppercase tracking-wide">
            {menuItems.map((item) => (
              <button
                key={item.label}
                onClick={() => onNavigate(item.action)}
                className="hover:text-primary-green hover:underline underline-offset-4 decoration-2 transition-all"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* C. ICONOS DE ACCIÓN (Derecha) */}
          <div className="flex items-center gap-4 md:gap-6 text-dark-slate">
            {/* Lupa (Buscar) */}
            <button className="hover:text-primary-green transition-colors hidden sm:block">
              <Search size={20} strokeWidth={2} />
            </button>
         <button 
        onClick={() => onNavigate('account')} // 👈 AGREGA ESTA LÍNEA
        className="hover:text-primary-green transition-colors"
        aria-label="Mi Cuenta"
      >
        <User size={20} strokeWidth={2} />
      </button>
      {/* 👆 FIN DEL CAMBIO 👆 */}

      {/* Botón de Carrito */}
      <button 
        onClick={() => onNavigate('cart')} 
        className="relative hover:text-primary-green transition-colors"
      >
        <ShoppingBag size={20} strokeWidth={2} />
        {cartItemCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-primary-green text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
            {cartItemCount}
          </span>
        )}
      </button>

            {/* Botón Menú Móvil (Hamburguesa) */}
            <button 
              className="lg:hidden text-dark-slate hover:text-primary-green"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* MENÚ MÓVIL DESPLEGABLE */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-white border-t border-gray-100 shadow-xl py-4 flex flex-col z-50 animate-fade-in-down">
            {menuItems.map((item) => (
              <button 
                key={item.label}
                onClick={() => { 
                  onNavigate(item.action); 
                  setIsMenuOpen(false); 
                }} 
                className="text-left px-6 py-3 border-b border-gray-50 text-gray-700 font-medium hover:bg-gray-50 hover:text-primary-green hover:pl-8 transition-all"
              >
                {item.label}
              </button>
            ))}
            <div className="px-6 py-4 flex gap-4 border-t border-gray-100 mt-2">
                <button className="flex items-center gap-2 text-sm text-gray-500"><Search size={16}/> Buscar</button>
                <button className="flex items-center gap-2 text-sm text-gray-500"><User size={16}/> Cuenta</button>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
}