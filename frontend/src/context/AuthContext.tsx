import { createContext, useContext, useState, useEffect, ReactNode } from "react";

// ⚠️ Asegúrate de que esta URL coincida con el puerto de tu Backend (index.js)
const API_URL = "http://localhost:5000/api/auth";

// Tipos de datos
type User = {
  id: string;
  name: string;
  email: string;
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 1. EFECTO: Revisar si ya hay sesión guardada al cargar la página
  useEffect(() => {
    const checkUserLoggedIn = () => {
      const storedUser = localStorage.getItem("user");
      const token = localStorage.getItem("token");

      if (storedUser && token) {
        // Si existen datos, restauramos la sesión automáticamente
        setUser(JSON.parse(storedUser));
      }
      setLoading(false);
    };

    checkUserLoggedIn();
  }, []);

  // 2. FUNCIÓN: Iniciar Sesión
  const login = async (email: string, password: string) => {
    setError(null);
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.msg || "Error al iniciar sesión");
      }

      // Guardar en el navegador (para que no se salga al recargar)
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      
      // Actualizar estado de React
      setUser(data.user);
    } catch (err: any) {
      setError(err.message);
      throw err; // Relanzamos el error para que LoginPage lo detecte
    }
  };

  // 3. FUNCIÓN: Registrarse
  const register = async (name: string, email: string, password: string) => {
    setError(null);
    try {
      const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.msg || "Error al registrarse");
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      
      setUser(data.user);
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  // 4. FUNCIÓN: Cerrar Sesión
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        isAuthenticated: !!user, // Es true si user existe, false si es null
        loading, 
        error, 
        login, 
        register, 
        logout 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Hook personalizado para usar el contexto fácilmente
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth debe usarse dentro de un AuthProvider");
  return context;
};