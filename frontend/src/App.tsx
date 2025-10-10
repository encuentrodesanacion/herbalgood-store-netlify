// src/App.tsx (Layout Base, Routing y Context)

import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import { CartProvider, useCart } from "./context/CartContext";

// Componentes Layout y Páginas
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import About from "./pages/About";
import CartPage from "./pages/CartPage";
import Checkout from "./pages/Checkout";
import NotFound from "./pages/NotFount"; // Asegúrate que el archivo se llama NotFound.tsx

// Wrapper para inyectar la función onNavigate en los componentes
const AppWrapper: React.FC = () => {
  const navigate = useNavigate();
  const { cartItemCount } = useCart();

  // Función centralizada para la navegación
  const onNavigate = (page: string, productId?: string) => {
    switch (page) {
      case "home":
        navigate("/");
        break;
      case "shop":
        navigate("/shop");
        break;
      case "product":
        if (productId) navigate(`/product/${productId}`);
        break;
      case "blog":
        navigate("/blog");
        break;
      case "about":
        navigate("/about");
        break;
      case "contact":
        navigate("/contact");
        break;
      case "cart":
        navigate("/cart");
        break;
      case "checkout":
        navigate("/checkout"); // Ruta de Cotización
        break;
      default:
        navigate("/");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar onNavigate={onNavigate} cartItemCount={cartItemCount} />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home onNavigate={onNavigate} />} />
          <Route path="/home" element={<Home onNavigate={onNavigate} />} />
          <Route path="/shop" element={<Shop onNavigate={onNavigate} />} />
          <Route
            path="/product/:id"
            element={<ProductDetail onNavigate={onNavigate} />}
          />
          <Route path="/blog" element={<Blog onNavigate={onNavigate} />} />
          <Route path="/about" element={<About onNavigate={onNavigate} />} />
          <Route
            path="/contact"
            element={<Contact onNavigate={onNavigate} />}
          />
          <Route path="/cart" element={<CartPage onNavigate={onNavigate} />} />
          <Route
            path="/checkout"
            element={<Checkout onNavigate={onNavigate} />}
          />{" "}
          {/* Ruta de Cotización */}
          <Route path="*" element={<NotFound onNavigate={onNavigate} />} />
        </Routes>
      </main>
      <Footer onNavigate={onNavigate} />
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <CartProvider>
        <AppWrapper />
      </CartProvider>
    </Router>
  );
}
