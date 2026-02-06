// src/App.tsx

import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom"; 
import { CartProvider, useCart } from "./context/CartContext";
// 👇 1. IMPORTAR AUTH CONTEXT
import { AuthProvider, useAuth } from "./context/AuthContext";

// Componentes Layout
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

// Páginas
import Home from "./pages/Home";
import Shop from "./pages/Shop"; 
import ProductDetail from "./pages/ProductDetail"; 
import CartPage from "./pages/CartPage";
import NotFound from "./pages/NotFount"; 
import About from "./pages/About"; 
import BitacoraDePlantas from "./pages/BitacoraDePlantas";
import HerbarioVivo from "./pages/HerbarioVivo";
import Hallazgos from "./pages/Hallazgos";
import Contact from "./pages/Contact";

// 👇 2. IMPORTAR PÁGINAS DE CUENTA
import LoginPage from "./pages/LoginPage";
import AccountPage from "./pages/AccountPage";

function AppContent() {
  const navigate = useNavigate(); 
  const { cartItemCount } = useCart();
  // 👇 3. OBTENER ESTADO DE AUTENTICACIÓN
  const { isAuthenticated } = useAuth();

  const onNavigate = (page: string, productId?: string) => {
    switch (page) {
      case "home": navigate("/"); break;
      case "shop": navigate("/shop"); break;
      case "product": if (productId) navigate(`/product/${productId}`); break;
      case "cart": navigate("/cart"); break;
      
      // Rutas personalizadas
      case "projects": navigate("/HerbarioVivo"); break;
      case "hallazgos": navigate("/hallazgos"); break;
      case "rentals": navigate("/BitacoraDePlantas"); break;  
      
      // Páginas informativas
      case "contact": navigate("/contact"); break; 
      case "about": navigate("/about"); break;

      // 👇 4. LÓGICA INTELIGENTE PARA LA CUENTA
      case "account": 
      case "login":
        if (isAuthenticated) {
          navigate("/account"); // Si ya entró, va a su perfil
        } else {
          navigate("/login");   // Si no, va a iniciar sesión
        }
        break;

      default: navigate("/");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar onNavigate={onNavigate} cartItemCount={cartItemCount} />
      
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home onNavigate={onNavigate} />} />
          <Route path="/shop" element={<Shop onNavigate={onNavigate} />} />
          <Route path="/product/:id" element={<ProductDetail onNavigate={onNavigate} />} />
          <Route path="/cart" element={<CartPage onNavigate={onNavigate} />} />
          <Route path="/HerbarioVivo" element={<HerbarioVivo onNavigate={onNavigate} />} />
          <Route path="/contact" element={<Contact onNavigate={onNavigate} />} />
          <Route path="/about" element={<About onNavigate={onNavigate} />} />
          <Route path="/hallazgos" element={<Hallazgos onNavigate={onNavigate} />} />
          <Route path="/BitacoraDePlantas" element={<BitacoraDePlantas onNavigate={onNavigate} />} />
          
          {/* 👇 5. RUTAS DE USUARIO */}
          <Route path="/login" element={<LoginPage onNavigate={onNavigate} />} />
          <Route path="/account" element={<AccountPage onNavigate={onNavigate} />} />

          {/* Rutas 404 */}
          <Route path="*" element={<NotFound onNavigate={onNavigate} />} />
        </Routes>
      </main>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      {/* 👇 6. IMPORTANTE: EL AUTHPROVIDER DEBE ENVOLVER TODO */}
      <AuthProvider>
        <CartProvider>
           <AppContent />
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}