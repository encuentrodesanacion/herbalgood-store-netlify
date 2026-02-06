import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Leaf, ArrowRight, Loader } from "lucide-react";

type LoginProps = {
  onNavigate: (page: string) => void;
};

export default function LoginPage({ onNavigate }: LoginProps) {
  const { login, register, error } = useAuth(); // Usamos las funciones reales del contexto
  
  // Estado para alternar entre Login y Registro
  const [isRegister, setIsRegister] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Estados del formulario
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [localError, setLocalError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError("");
    setIsLoading(true);

    try {
      if (isRegister) {
        // Registro
        await register(name, email, password);
      } else {
        // Login
        await login(email, password);
      }
      // Si todo sale bien, el AuthContext actualiza el usuario y redirigimos
      onNavigate("account");
    } catch (err: any) {
      // Si falla, mostramos el error
      setLocalError(err.message || "Ocurrió un error inesperado");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-natural-cream flex items-center justify-center px-4 py-20">
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden max-w-4xl w-full flex flex-col md:flex-row">
        
        {/* Lado Izquierdo: Imagen Decorativa */}
        <div className="w-full md:w-1/2 bg-dark-slate relative hidden md:block">
           <img 
             src="https://images.pexels.com/photos/796602/pexels-photo-796602.jpeg" 
             className="w-full h-full object-cover opacity-60" 
             alt="Login Background" 
           />
           <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-12 text-center z-10">
             <Leaf size={48} className="text-brand-rose mb-6" />
             <h2 className="text-4xl font-serif font-bold mb-4">Bienvenido</h2>
             <p className="font-light text-gray-200">
               Tu jardín digital te está esperando. Accede para ver tus pedidos y favoritos.
             </p>
           </div>
        </div>

        {/* Lado Derecho: Formulario */}
        <div className="w-full md:w-1/2 p-12 flex flex-col justify-center">
           <div className="text-center mb-8">
             <h2 className="text-3xl font-bold text-dark-slate font-serif mb-2">
               {isRegister ? "Crear Cuenta" : "Iniciar Sesión"}
             </h2>
             <p className="text-gray-500 text-sm">
               {isRegister ? "¿Ya eres parte de la comunidad?" : "¿Aún no tienes cuenta?"} {" "}
               <button 
                 onClick={() => {
                    setIsRegister(!isRegister);
                    setLocalError(""); // Limpiar errores al cambiar
                 }}
                 className="text-primary-green font-bold hover:underline"
               >
                 {isRegister ? "Ingresa aquí" : "Regístrate gratis"}
               </button>
             </p>
           </div>

           {/* Mensaje de Error */}
           {(error || localError) && (
             <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl mb-6 text-sm text-center">
                {localError || error}
             </div>
           )}

           <form onSubmit={handleSubmit} className="space-y-5">
             {isRegister && (
               <div className="space-y-2">
                 <label className="text-xs font-bold uppercase tracking-wider text-gray-500 ml-1">Nombre</label>
                 <input 
                   type="text" 
                   value={name}
                   onChange={(e) => setName(e.target.value)}
                   className="w-full p-4 bg-gray-50 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-rose focus:outline-none transition-all" 
                   placeholder="Tu nombre completo" 
                   required 
                 />
               </div>
             )}
             
             <div className="space-y-2">
               <label className="text-xs font-bold uppercase tracking-wider text-gray-500 ml-1">Email</label>
               <input 
                 type="email" 
                 value={email}
                 onChange={(e) => setEmail(e.target.value)}
                 className="w-full p-4 bg-gray-50 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-rose focus:outline-none transition-all" 
                 placeholder="hola@ejemplo.com" 
                 required 
               />
             </div>
             
             <div className="space-y-2">
               <label className="text-xs font-bold uppercase tracking-wider text-gray-500 ml-1">Contraseña</label>
               <input 
                 type="password" 
                 value={password}
                 onChange={(e) => setPassword(e.target.value)}
                 className="w-full p-4 bg-gray-50 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-rose focus:outline-none transition-all" 
                 placeholder="••••••••" 
                 required 
               />
             </div>

             <button 
               type="submit" 
               disabled={isLoading}
               className="w-full bg-dark-slate text-white py-4 rounded-xl font-bold hover:bg-primary-green transition-all shadow-lg flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
             >
               {isLoading ? (
                 <><Loader size={18} className="animate-spin" /> Cargando...</>
               ) : (
                 <>
                   {isRegister ? "Registrarme" : "Ingresar"} 
                   <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                 </>
               )}
             </button>
           </form>
        </div>

      </div>
    </div>
  );
}