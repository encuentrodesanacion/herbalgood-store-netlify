import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Package, User, LogOut, MapPin, CreditCard, Plus, Trash2, Edit2, Save } from "lucide-react";
import { products } from "../data/mockData"; 

type AccountProps = {
  onNavigate: (page: string) => void;
};

export default function AccountPage({ onNavigate }: AccountProps) {
  const { user, logout } = useAuth();
  
  // 1. ESTADO PARA CONTROLAR LA PESTAÑA ACTIVA
  const [activeTab, setActiveTab] = useState<'orders' | 'profile' | 'addresses' | 'payments'>('orders');

  const handleLogout = () => {
    logout();
    onNavigate("home");
  };

  // --- SUB-COMPONENTES (SECCIONES) ---

  // A. Historial de Pedidos (Lo que ya tenías)
  const MyOrders = () => {
    const mockOrders = [
      { id: "#PED-9921", date: "12 Oct 2023", status: "Entregado", total: 125000, items: [products[0]] },
      { id: "#PED-8810", date: "05 Sep 2023", status: "En camino", total: 45990, items: [products[2]] }
    ];

    return (
      <div className="space-y-6 animate-fade-in">
        <h2 className="text-2xl font-bold font-serif mb-6">Historial de Pedidos</h2>
        {mockOrders.map((order) => (
          <div key={order.id} className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between gap-6 items-center hover:shadow-md transition-shadow">
            <div className="flex-1 w-full">
              <div className="flex justify-between mb-4">
                <span className="font-bold text-lg">{order.id}</span>
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${order.status === 'Entregado' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>{order.status}</span>
              </div>
              <p className="text-gray-500 text-sm mb-4">Realizado el {order.date}</p>
              <div className="flex gap-4">
                {order.items.map((item, i) => (
                  <div key={i} className="w-16 h-16 rounded-xl overflow-hidden border border-gray-200">
                    <img src={item.image_url} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </div>
            <div className="text-right w-full md:w-auto border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0 md:pl-8">
              <span className="block text-gray-400 text-xs uppercase tracking-widest mb-1">Total</span>
              <span className="block text-2xl font-bold text-dark-slate mb-4">${order.total.toLocaleString("es-CL")}</span>
              <button className="bg-dark-slate text-white px-6 py-2 rounded-lg text-sm font-bold hover:bg-primary-green transition-colors">Ver Detalles</button>
            </div>
          </div>
        ))}
      </div>
    );
  };

  // B. Datos Personales
  const PersonalData = () => (
    <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 animate-fade-in max-w-2xl">
      <h2 className="text-2xl font-bold font-serif mb-6">Mis Datos Personales</h2>
      <form className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase text-gray-500">Nombre Completo</label>
            <input type="text" defaultValue={user?.name} className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:border-brand-rose" />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase text-gray-500">Teléfono</label>
            <input type="tel" placeholder="+56 9 1234 5678" className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:border-brand-rose" />
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase text-gray-500">Correo Electrónico</label>
          <input type="email" defaultValue={user?.email} disabled className="w-full p-3 bg-gray-100 rounded-xl border border-gray-200 text-gray-500 cursor-not-allowed" />
          <p className="text-xs text-gray-400">El correo no se puede cambiar.</p>
        </div>
        <button type="button" className="bg-dark-slate text-white px-8 py-3 rounded-xl font-bold hover:bg-brand-rose transition-colors flex items-center gap-2">
           <Save size={18}/> Guardar Cambios
        </button>
      </form>
    </div>
  );

  // C. Direcciones
  const Addresses = () => (
    <div className="space-y-6 animate-fade-in">
       <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold font-serif">Mis Direcciones</h2>
          <button className="text-primary-green font-bold flex items-center gap-2 hover:underline">
             <Plus size={18} /> Agregar Nueva
          </button>
       </div>
       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Tarjeta de Dirección Ejemplo */}
          <div className="bg-white p-6 rounded-3xl border border-gray-200 relative group hover:border-brand-rose transition-colors">
             <div className="flex items-start gap-4">
                <div className="bg-brand-bg p-3 rounded-full text-primary-green">
                   <MapPin size={24} />
                </div>
                <div>
                   <h4 className="font-bold text-lg text-dark-slate">Casa Principal</h4>
                   <p className="text-gray-600 text-sm mt-1">Av. Providencia 1234, Depto 601</p>
                   <p className="text-gray-600 text-sm">Providencia, Región Metropolitana</p>
                </div>
             </div>
             <div className="mt-6 flex gap-3">
                <button className="text-gray-400 hover:text-dark-slate flex items-center gap-1 text-xs font-bold uppercase"><Edit2 size={14}/> Editar</button>
                <button className="text-gray-400 hover:text-red-500 flex items-center gap-1 text-xs font-bold uppercase"><Trash2 size={14}/> Eliminar</button>
             </div>
          </div>
       </div>
    </div>
  );

  // D. Métodos de Pago
  const PaymentMethods = () => (
    <div className="space-y-6 animate-fade-in">
       <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold font-serif">Métodos de Pago</h2>
          <button className="text-primary-green font-bold flex items-center gap-2 hover:underline">
             <Plus size={18} /> Agregar Tarjeta
          </button>
       </div>
       <div className="bg-gradient-to-br from-dark-slate to-gray-800 text-white p-8 rounded-3xl w-full md:w-96 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
          <div className="relative z-10">
             <CreditCard size={32} className="mb-6 opacity-80" />
             <div className="text-2xl tracking-widest font-mono mb-4">•••• •••• •••• 4242</div>
             <div className="flex justify-between items-end">
                <div>
                   <div className="text-xs opacity-60 uppercase">Titular</div>
                   <div className="font-bold uppercase tracking-wider">{user?.name || "NOMBRE USUARIO"}</div>
                </div>
                <div className="text-right">
                   <div className="text-xs opacity-60 uppercase">Expira</div>
                   <div className="font-bold">12/25</div>
                </div>
             </div>
          </div>
       </div>
    </div>
  );

  if (!user) return null;

  return (
    <div className="min-h-screen bg-natural-cream font-sans text-dark-slate py-12 px-4">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Perfil */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6 border-b border-gray-200 pb-8">
          <div>
            <span className="text-brand-rose font-bold uppercase tracking-widest text-xs">Mi Cuenta</span>
            <h1 className="text-4xl font-serif font-bold mt-2">Hola, {user.name}</h1>
            <p className="text-gray-500 mt-2">
              Correo asociado: <span className="font-medium text-dark-slate">{user.email}</span>
            </p>
          </div>
          <button onClick={handleLogout} className="flex items-center gap-2 text-red-500 font-bold hover:bg-red-50 px-6 py-3 rounded-full transition-colors border border-transparent hover:border-red-200">
            <LogOut size={18} /> Cerrar Sesión
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* 2. SIDEBAR INTERACTIVO */}
          <div className="lg:col-span-1 space-y-4">
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 sticky top-24">
               <nav className="space-y-2">
                 {/* Botón Pedidos */}
                 <button 
                   onClick={() => setActiveTab('orders')}
                   className={`w-full text-left px-4 py-3 rounded-xl font-bold flex items-center gap-3 transition-all ${activeTab === 'orders' ? 'bg-brand-bg text-primary-green border border-primary-green/20' : 'text-gray-600 hover:bg-gray-50'}`}
                 >
                   <Package size={20}/> Mis Pedidos
                 </button>

                 {/* Botón Datos Personales */}
                 <button 
                   onClick={() => setActiveTab('profile')}
                   className={`w-full text-left px-4 py-3 rounded-xl font-bold flex items-center gap-3 transition-all ${activeTab === 'profile' ? 'bg-brand-bg text-primary-green border border-primary-green/20' : 'text-gray-600 hover:bg-gray-50'}`}
                 >
                   <User size={20}/> Datos Personales
                 </button>

                 {/* Botón Direcciones */}
                 <button 
                   onClick={() => setActiveTab('addresses')}
                   className={`w-full text-left px-4 py-3 rounded-xl font-bold flex items-center gap-3 transition-all ${activeTab === 'addresses' ? 'bg-brand-bg text-primary-green border border-primary-green/20' : 'text-gray-600 hover:bg-gray-50'}`}
                 >
                   <MapPin size={20}/> Direcciones
                 </button>

                 {/* Botón Pagos */}
                 <button 
                   onClick={() => setActiveTab('payments')}
                   className={`w-full text-left px-4 py-3 rounded-xl font-bold flex items-center gap-3 transition-all ${activeTab === 'payments' ? 'bg-brand-bg text-primary-green border border-primary-green/20' : 'text-gray-600 hover:bg-gray-50'}`}
                 >
                   <CreditCard size={20}/> Métodos de Pago
                 </button>
               </nav>
            </div>
          </div>

          {/* 3. CONTENIDO DINÁMICO */}
          <div className="lg:col-span-3 space-y-6">
             {activeTab === 'orders' && <MyOrders />}
             {activeTab === 'profile' && <PersonalData />}
             {activeTab === 'addresses' && <Addresses />}
             {activeTab === 'payments' && <PaymentMethods />}
          </div>

        </div>
      </div>
    </div>
  );
}