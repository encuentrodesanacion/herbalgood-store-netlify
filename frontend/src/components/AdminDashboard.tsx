// src/pages/AdminDashboard.tsx
import React, { useState, useEffect } from "react";
import { Package, BookOpen, Plus, Edit2, Trash2, LogOut, Loader2, FileText, Rabbit, Heart, Star, CheckCircle, Lock } from "lucide-react";

// --- INTERFACES ---
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  size_category: string;
  category: string;
  is_featured: boolean;
  image_url: string;
}

export interface Post {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  image_url: string;
  is_featured: boolean;
  created_at?: string;
}

export interface Testimonial {
  id: number;
  author_name: string;
  content: string;
  rating: number;
  image_url: string;
  status: string;
  createdAt?: string;
}

export default function AdminDashboard() {
  // 👇 ESTADOS DE AUTENTICACIÓN
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!localStorage.getItem("adminToken"));
  const [loginUser, setLoginUser] = useState("");
  const [loginPass, setLoginPass] = useState("");
  const [loginError, setLoginError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // --- ESTADOS DE PRODUCTOS ---
  const [activeTab, setActiveTab] = useState("productos");
  const [products, setProducts] = useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [newProduct, setNewProduct] = useState({
    name: '', price: 0, size_category: 'Joven', description: '', category: 'Mascotas', is_featured: false
  });
  const [productFile, setProductFile] = useState<File | null>(null);

  // --- ESTADOS DE LA BITÁCORA (POSTS) ---
  const [posts, setPosts] = useState<Post[]>([]);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [editingPostId, setEditingPostId] = useState<string | null>(null);
  const [newPost, setNewPost] = useState({
    title: '', excerpt: '', content: '', category: 'Razas y Genética', is_featured: false
  });
  const [postFile, setPostFile] = useState<File | null>(null);

  // --- ESTADOS DE TESTIMONIOS ---
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loadingTestimonials, setLoadingTestimonials] = useState(true);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  // Solo cargar datos si el usuario está autenticado
  useEffect(() => {
    if (isAuthenticated) {
      if (activeTab === "productos") fetchProducts();
      if (activeTab === "bitacora") fetchPosts();
      if (activeTab === "testimonios") fetchTestimonials();
    }
  }, [activeTab, isAuthenticated]);

  // ==========================================
  //         LÓGICA DE LOGIN Y LOGOUT
  // ==========================================
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setLoginError("");

    try {
      const response = await fetch(`${API_URL}/api/auth/admin-login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: loginUser, password: loginPass })
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem("adminToken", data.token);
        setIsAuthenticated(true);
      } else {
        setLoginError("Usuario o contraseña incorrectos");
      }
    } catch (error) {
      setLoginError("Error de conexión con el servidor");
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    setIsAuthenticated(false);
    setLoginUser("");
    setLoginPass("");
  };

  // ==========================================
  //         LÓGICA DE PRODUCTOS
  // ==========================================
  const fetchProducts = async () => {
    try {
      setLoadingProducts(true);
      const response = await fetch(`${API_URL}/api/products`);
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error cargando inventario:", error);
    } finally {
      setLoadingProducts(false);
    }
  };

  const handleNewProductClick = () => {
    setEditingProductId(null);
    setNewProduct({ name: '', price: 0, size_category: 'Joven', category: 'Mascotas', description: '', is_featured: false });
    setProductFile(null); 
    setIsProductModalOpen(true);
  };

  const handleEditProductClick = (product: Product) => {
    setEditingProductId(product.id);
    setNewProduct({ ...product });
    setProductFile(null); 
    setIsProductModalOpen(true);
  };

  const handleSubmitProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', newProduct.name);
    formData.append('price', String(newProduct.price));
    formData.append('size_category', newProduct.size_category);
    formData.append('description', newProduct.description);
    formData.append('category', newProduct.category);
    formData.append('is_featured', String(newProduct.is_featured));
    if (productFile) formData.append('image', productFile);

    try {
      const url = editingProductId ? `${API_URL}/api/products/${editingProductId}` : `${API_URL}/api/products`;
      const response = await fetch(url, {
        method: editingProductId ? 'PUT' : 'POST',
        body: formData 
      });
      if (response.ok) {
        setIsProductModalOpen(false);
        fetchProducts();
      } else alert("Error al guardar el registro.");
    } catch (error) {
      alert("Error de conexión al guardar.");
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!window.confirm("¿Eliminar este registro del inventario?")) return;
    try {
      const response = await fetch(`${API_URL}/api/products/${id}`, { method: 'DELETE' });
      if (response.ok) setProducts(products.filter(p => p.id !== id));
    } catch (error) {
      alert("Error al eliminar the registro.");
    }
  };

  // ==========================================
  //         LÓGICA DE LA BITÁCORA (BLOG)
  // ==========================================
  const fetchPosts = async () => {
    try {
      setLoadingPosts(true);
      const response = await fetch(`${API_URL}/api/posts`);
      if (response.ok) {
        const data = await response.json();
        setPosts(data);
      }
    } catch (error) {
      console.error("Error cargando guías:", error);
    } finally {
      setLoadingPosts(false);
    }
  };

  const handleNewPostClick = () => {
    setEditingPostId(null);
    setNewPost({ title: '', excerpt: '', content: '', category: 'Razas y Genética', is_featured: false });
    setPostFile(null); 
    setIsPostModalOpen(true);
  };

  const handleEditPostClick = (post: Post) => {
    setEditingPostId(post.id);
    setNewPost({ 
      title: post.title, 
      excerpt: post.excerpt || '', 
      content: post.content || '', 
      category: post.category || 'General',
      is_featured: post.is_featured === true || String(post.is_featured) === 'true'
    });
    setPostFile(null); 
    setIsPostModalOpen(true);
  };

  const handleSubmitPost = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', newPost.title);
    formData.append('excerpt', newPost.excerpt);
    formData.append('content', newPost.content);
    formData.append('category', newPost.category);
    formData.append('is_featured', String(newPost.is_featured));
    if (postFile) formData.append('image', postFile);

    try {
      const url = editingPostId ? `${API_URL}/api/posts/${editingPostId}` : `${API_URL}/api/posts`;
      const response = await fetch(url, {
        method: editingPostId ? 'PUT' : 'POST',
        body: formData 
      });
      if (response.ok) {
        setIsPostModalOpen(false);
        fetchPosts();
      } else alert("Error al guardar la publicación.");
    } catch (error) {
      alert("Error de conexión al guardar la publicación.");
    }
  };

  const handleDeletePost = async (id: string) => {
    if (!window.confirm("¿Estás seguro de eliminar esta guía?")) return;
    try {
      const response = await fetch(`${API_URL}/api/posts/${id}`, { method: 'DELETE' });
      if (response.ok) setPosts(posts.filter(p => p.id !== id));
    } catch (error) {
      alert("Error al eliminar la guía.");
    }
  };

  // ==========================================
  //         LÓGICA DE TESTIMONIOS
  // ==========================================
  const fetchTestimonials = async () => {
    try {
      setLoadingTestimonials(true);
      const response = await fetch(`${API_URL}/api/testimonials/admin-list`);
      if (response.ok) {
        const data = await response.json();
        setTestimonials(data);
      }
    } catch (error) {
      console.error("Error cargando testimonios:", error);
    } finally {
      setLoadingTestimonials(false);
    }
  };

  const handleApproveTestimonial = async (id: number) => {
    try {
      const response = await fetch(`${API_URL}/api/testimonials/approve/${id}`, {
        method: 'PUT'
      });
      if (response.ok) {
        setTestimonials(testimonials.map(t => t.id === id ? { ...t, status: 'approved' } : t));
      } else {
        alert("No se pudo aprobar el testimonio.");
      }
    } catch (error) {
      alert("Error de conexión al intentar aprobar.");
    }
  };

  const handleDeleteTestimonial = async (id: number) => {
    if (!window.confirm("¿Eliminar este testimonio? Esta acción no se puede deshacer.")) return;
    try {
      const response = await fetch(`${API_URL}/api/testimonials/${id}`, { method: 'DELETE' });
      if (response.ok) setTestimonials(testimonials.filter(t => t.id !== id));
    } catch (error) {
      alert("Error al eliminar el testimonio.");
    }
  };

  // 👇 RENDERIZADO CONDICIONAL: PANTALLA DE LOGIN
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-stone-950 flex items-center justify-center p-4 font-sans selection:bg-green-500 selection:text-white">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none"></div>
        
        <div className="bg-white rounded-[2.5rem] p-10 w-full max-w-md shadow-2xl relative z-10 animate-in fade-in zoom-in-95 duration-500">
          <div className="flex flex-col items-center mb-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4 text-green-600 shadow-inner">
              <Lock size={40} />
            </div>
            <h1 className="text-3xl font-bold text-stone-900 font-serif">Panel Maestro</h1>
            <p className="text-stone-500 text-sm mt-2 text-center">Acceso restringido solo para personal autorizado de Chileconejitos.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            {loginError && (
              <div className="bg-red-50 text-red-600 text-sm font-bold p-4 rounded-2xl text-center border border-red-100">
                {loginError}
              </div>
            )}
            
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">Usuario</label>
              <input 
                type="text" 
                required 
                value={loginUser}
                onChange={(e) => setLoginUser(e.target.value)}
                className="w-full bg-stone-50 border border-stone-200 p-4 rounded-2xl focus:ring-2 focus:ring-green-500 outline-none transition-all" 
                placeholder="Ingresa tu usuario"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">Contraseña</label>
              <input 
                type="password" 
                required 
                value={loginPass}
                onChange={(e) => setLoginPass(e.target.value)}
                className="w-full bg-stone-50 border border-stone-200 p-4 rounded-2xl focus:ring-2 focus:ring-green-500 outline-none transition-all" 
                placeholder="••••••••"
              />
            </div>

            <button 
              type="submit" 
              disabled={isLoggingIn}
              className="w-full bg-green-600 text-white font-bold py-4 rounded-2xl hover:bg-green-700 transition-colors shadow-lg flex items-center justify-center gap-2 mt-4"
            >
              {isLoggingIn ? <Loader2 className="animate-spin" size={20} /> : "Ingresar al Panel"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // 👇 RENDERIZADO DEL PANEL PRINCIPAL (Si está autenticado)
  return (
    <div className="min-h-screen bg-stone-50 flex font-sans text-stone-800">
      
      {/* SIDEBAR */}
      <aside className="w-64 bg-stone-950 text-green-50 flex flex-col shadow-xl z-10 shrink-0">
        <div className="p-6 border-b border-white/10">
          <h2 className="text-2xl font-bold text-green-500 tracking-tight flex items-center gap-2">
            <Rabbit size={24} /> Chileconejitos
          </h2>
          <span className="text-xs text-stone-400 uppercase tracking-widest mt-1 block">Panel Maestro</span>
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-2">
          <button onClick={() => setActiveTab("productos")} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === "productos" ? "bg-green-600 text-white font-bold shadow-md" : "hover:bg-stone-800 text-stone-300"}`}>
            <Package size={20} /> Inventario
          </button>
          <button onClick={() => setActiveTab("bitacora")} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === "bitacora" ? "bg-green-600 text-white font-bold shadow-md" : "hover:bg-stone-800 text-stone-300"}`}>
            <BookOpen size={20} /> Guías y Cuidados
          </button>
          <button onClick={() => setActiveTab("testimonios")} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === "testimonios" ? "bg-green-600 text-white font-bold shadow-md" : "hover:bg-stone-800 text-stone-300"}`}>
            <Heart size={20} /> Testimonios
          </button>
        </nav>

        <div className="p-4 border-t border-white/10">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 text-stone-400 hover:text-white hover:bg-red-500/20 rounded-xl transition-all font-medium"
          >
            <LogOut size={18} /> Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* ÁREA PRINCIPAL */}
      <main className="flex-1 p-8 overflow-y-auto">
        
        {/* PESTAÑA: PRODUCTOS */}
        {activeTab === "productos" && (
          <div className="animate-fade-in">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-3xl font-bold text-stone-800">Inventario del Criadero</h1>
                <p className="text-stone-500 mt-1">Conectado a PostgreSQL mediante Sequelize.</p>
              </div>
              <button onClick={handleNewProductClick} className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-xl flex items-center gap-2 transition-all shadow-md">
                <Plus size={20} /> Nuevo Registro
              </button>
            </div>

            {loadingProducts ? (
              <div className="flex flex-col items-center justify-center h-64 text-stone-400">
                <Loader2 className="animate-spin mb-2 text-green-600" size={40} />
                <p>Consultando registros...</p>
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-stone-100 text-stone-600 text-sm uppercase tracking-wider">
                      <th className="p-4 font-semibold">Ejemplar / Producto</th>
                      <th className="p-4 font-semibold">Detalle (Edad/Formato)</th>
                      <th className="p-4 font-semibold">Categoría</th>
                      <th className="p-4 font-semibold">Precio</th>
                      <th className="p-4 font-semibold text-right">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {products.length > 0 ? products.map((product) => (
                      <tr key={product.id} className="hover:bg-green-50/50 transition-colors">
                        <td className="p-4 flex items-center gap-3">
                          <div className="w-10 h-10 rounded-md bg-stone-100 overflow-hidden shrink-0">
                             <img src={product.image_url ? (product.image_url.startsWith('http') ? product.image_url : `${API_URL}/${product.image_url}`) : "https://images.pexels.com/photos/3313348/pexels-photo-3313348.jpeg"} alt={product.name} className="w-full h-full object-cover" />
                          </div>
                          <span className="font-medium text-stone-800">{product.name}</span>
                        </td>
                        <td className="p-4 text-stone-600">{product.size_category}</td>
                        <td className="p-4 text-stone-600">{product.category || 'Mascotas'}</td>
                        <td className="p-4 text-stone-600 font-medium">${product.price.toLocaleString('es-CL')}</td>
                        <td className="p-4 flex justify-end gap-2">
                          <button onClick={() => handleEditProductClick(product)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"><Edit2 size={18} /></button>
                          <button onClick={() => handleDeleteProduct(product.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg"><Trash2 size={18} /></button>
                        </td>
                      </tr>
                    )) : (
                      <tr><td colSpan={5} className="p-12 text-center text-stone-400">No hay registros. ¡Añade tu primer ejemplar o suministro!</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* PESTAÑA: GUÍAS Y CUIDADOS */}
        {activeTab === "bitacora" && (
          <div className="animate-fade-in">
             <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-3xl font-bold text-stone-800">Guías y Cuidados</h1>
                <p className="text-stone-500 mt-1">Gestiona las guías y escoge cuáles destacar en la página principal.</p>
              </div>
              <button onClick={handleNewPostClick} className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-xl flex items-center gap-2 transition-all shadow-md">
                <Plus size={20} /> Nueva Guía
              </button>
            </div>

            {loadingPosts ? (
              <div className="flex flex-col items-center justify-center h-64 text-stone-400">
                <Loader2 className="animate-spin mb-2 text-green-600" size={40} />
                <p>Cargando publicaciones...</p>
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-stone-100 text-stone-600 text-sm uppercase tracking-wider">
                      <th className="p-4 font-semibold">Publicación</th>
                      <th className="p-4 font-semibold">Categoría</th>
                      <th className="p-4 font-semibold">Destacado (Home)</th>
                      <th className="p-4 font-semibold text-right">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {posts.length > 0 ? posts.map((post) => (
                      <tr key={post.id} className="hover:bg-green-50/50 transition-colors">
                        <td className="p-4 flex items-center gap-3">
                          <div className="w-10 h-10 rounded-md bg-stone-100 overflow-hidden shrink-0 flex items-center justify-center text-stone-400">
                             {post.image_url ? (
                               <img src={post.image_url.startsWith('http') ? post.image_url : `${API_URL}/${post.image_url}`} alt={post.title} className="w-full h-full object-cover" />
                             ) : (
                               <FileText size={20} />
                             )}
                          </div>
                          <div>
                            <span className="font-bold text-stone-800 block line-clamp-1">{post.title}</span>
                            <span className="text-xs text-stone-500 line-clamp-1">{post.excerpt}</span>
                          </div>
                        </td>
                        <td className="p-4 text-stone-600">
                          <span className="bg-green-100 text-green-800 px-2 py-1 rounded-md text-xs font-bold">
                            {post.category || 'General'}
                          </span>
                        </td>
                        <td className="p-4">
                          {post.is_featured ? (
                            <span className="flex items-center gap-1 text-xs font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded-md border border-amber-200 w-fit">
                              <Star size={12} fill="currentColor" /> Portada
                            </span>
                          ) : (
                            <span className="text-xs text-stone-400">-</span>
                          )}
                        </td>
                        <td className="p-4">
                          <div className="flex justify-end gap-2">
                            <button onClick={() => handleEditPostClick(post)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"><Edit2 size={18} /></button>
                            <button onClick={() => handleDeletePost(post.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg"><Trash2 size={18} /></button>
                          </div>
                        </td>
                      </tr>
                    )) : (
                      <tr>
                        <td colSpan={4} className="p-12 text-center text-stone-400 flex flex-col items-center">
                          <BookOpen size={48} className="mb-3 text-stone-300"/>
                          <p>Aún no has escrito guías para tu comunidad.</p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* PESTAÑA: TESTIMONIOS */}
        {activeTab === "testimonios" && (
          <div className="animate-fade-in">
             <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-3xl font-bold text-stone-800">Gestión de Reseñas</h1>
                <p className="text-stone-500 mt-1">Modera las experiencias compartidas por la comunidad.</p>
              </div>
            </div>

            {loadingTestimonials ? (
              <div className="flex flex-col items-center justify-center h-64 text-stone-400">
                <Loader2 className="animate-spin mb-2 text-green-600" size={40} />
                <p>Cargando testimonios...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {testimonials.length > 0 ? testimonials.map((t) => (
                  <div key={t.id} className={`bg-white p-6 rounded-3xl shadow-sm border relative flex flex-col justify-between hover:shadow-md transition-shadow ${t.status === 'pending' ? 'border-amber-200 bg-amber-50/10' : 'border-stone-100'}`}>
                    
                    <div>
                      <div className="absolute top-4 right-14">
                        {t.status === 'pending' ? (
                          <span className="bg-amber-100 text-amber-800 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full">Pendiente</span>
                        ) : (
                          <span className="bg-green-100 text-green-800 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full">Publicado</span>
                        )}
                      </div>

                      <button 
                        onClick={() => handleDeleteTestimonial(t.id)}
                        className="absolute top-2 right-2 text-stone-400 hover:bg-red-50 hover:text-red-600 p-2 rounded-full transition-colors"
                        title="Eliminar / Rechazar testimonio"
                      >
                        <Trash2 size={18} />
                      </button>
                      
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-full bg-stone-100 overflow-hidden shrink-0 border border-stone-200">
                          <img 
                            src={t.image_url ? (t.image_url.startsWith('http') ? t.image_url : `${API_URL}/${t.image_url}`) : "https://via.placeholder.com/50"} 
                            className="w-full h-full object-cover" 
                            alt={t.author_name}
                          />
                        </div>
                        <div>
                          <h3 className="font-bold text-stone-800">{t.author_name}</h3>
                          <div className="flex text-yellow-400">
                            {[...Array(t.rating || 5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                          </div>
                        </div>
                      </div>
                      
                      <p className="text-stone-600 italic text-sm mb-6">"{t.content}"</p>
                    </div>

                    {t.status === 'pending' && (
                      <button
                        onClick={() => handleApproveTestimonial(t.id)}
                        className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors shadow-sm mt-auto"
                      >
                        <CheckCircle size={14} /> Aprobar y Publicar
                      </button>
                    )}
                  </div>
                )) : (
                  <div className="col-span-full py-12 text-center text-stone-400 flex flex-col items-center bg-white rounded-3xl border border-stone-100 border-dashed">
                    <Heart size={48} className="mb-3 text-stone-300"/>
                    <p>Aún no hay testimonios registrados.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

      </main>

      {/* =========================================
          MODAL DE PRODUCTOS
      ========================================= */}
      {isProductModalOpen && (
        <div className="fixed inset-0 bg-stone-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in fade-in duration-200">
            <div className="bg-green-600 p-6 text-white flex justify-between items-center">
              <h2 className="text-xl font-bold">{editingProductId ? "Editar Registro" : "Agregar Nuevo Registro"}</h2>
            </div>
            
            <form onSubmit={handleSubmitProduct} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
              <div>
                <label className="block text-xs font-bold uppercase text-stone-500 mb-1">Nombre (Ejemplar o Producto)</label>
                <input type="text" required value={newProduct.name} className="w-full border border-stone-200 rounded-xl p-3 bg-stone-50 focus:ring-2 focus:ring-green-500 outline-none" onChange={(e) => setNewProduct({...newProduct, name: e.target.value})} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-stone-500 mb-1">Precio (CLP)</label>
                  <input type="number" required value={newProduct.price} className="w-full border border-stone-200 rounded-xl p-3 bg-stone-50 focus:ring-2 focus:ring-green-500 outline-none" onChange={(e) => setNewProduct({...newProduct, price: parseInt(e.target.value)})} />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-stone-500 mb-1">Edad o Formato</label>
                  <select value={newProduct.size_category} className="w-full border border-stone-200 rounded-xl p-3 bg-stone-50 focus:ring-2 focus:ring-green-500 outline-none" onChange={(e) => setNewProduct({...newProduct, size_category: e.target.value})}>
                    <option value="Gazapo (Bebé)">Gazapo (Bebé)</option>
                    <option value="Joven">Joven</option>
                    <option value="Adulto">Adulto</option>
                    <option value="Bolsa 500g">Bolsa 500g (Alimento)</option>
                    <option value="Bolsa 1kg">Bolsa 1kg (Alimento)</option>
                    <option value="Pack / Unidad">Pack / Unidad (Accesorios)</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-stone-500 mb-1">Descripción</label>
                <textarea rows={2} value={newProduct.description} className="w-full border border-stone-200 rounded-xl p-3 bg-stone-50 resize-none focus:ring-2 focus:ring-green-500 outline-none" onChange={(e) => setNewProduct({...newProduct, description: e.target.value})} />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-stone-500 mb-1">Categoría Principal</label>
                <select value={newProduct.category} className="w-full border border-stone-200 rounded-xl p-3 bg-stone-50 focus:ring-2 focus:ring-green-500 outline-none" onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}>
                  <option value="Mascotas">Mascotas</option>
                  <option value="Enanos">Enanos</option>
                  <option value="Gigantes">Gigantes</option>
                  <option value="Alimento">Alimento y Heno</option>
                  <option value="Accesorios">Accesorios y Hábitat</option>
                </select>
              </div>
              
              <div className="flex items-center gap-2 mt-2">
                <input 
                  type="checkbox" 
                  id="is_featured_product" 
                  checked={newProduct.is_featured} 
                  onChange={(e) => setNewProduct({...newProduct, is_featured: e.target.checked})} 
                  className="w-4 h-4 text-green-600 rounded border-stone-300 focus:ring-green-500" 
                />
                <label htmlFor="is_featured_product" className="text-sm font-bold text-stone-600 cursor-pointer">Destacar en la página de inicio</label>
              </div>
              
              <div>
                <label className="block text-xs font-bold uppercase text-stone-500 mb-1 mt-2">Imagen (JPG, PNG)</label>
                <input 
                  type="file" 
                  accept="image/*"
                  className="w-full border border-stone-200 rounded-xl p-2 bg-stone-50 cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-100 file:text-green-800 hover:file:bg-green-200" 
                  onChange={(e) => setProductFile(e.target.files ? e.target.files[0] : null)} 
                />
              </div>

              <div className="flex gap-3 mt-6 pt-4 border-t border-stone-100">
                <button type="button" onClick={() => setIsProductModalOpen(false)} className="flex-1 py-3 text-stone-500 font-bold hover:bg-stone-100 rounded-xl">Cancelar</button>
                <button type="submit" className="flex-1 py-3 bg-stone-900 text-white font-bold rounded-xl hover:bg-green-600 shadow-lg">Guardar Registro</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================================
          MODAL DE BITÁCORA (POSTS)
      ========================================= */}
      {isPostModalOpen && (
        <div className="fixed inset-0 bg-stone-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-3xl overflow-hidden animate-in fade-in duration-200">
            <div className="bg-green-600 p-6 text-white flex justify-between items-center">
              <h2 className="text-xl font-bold">{editingPostId ? "Editar Guía" : "Crear Nueva Guía"}</h2>
            </div>
            
            <form onSubmit={handleSubmitPost} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2">
                  <label className="block text-xs font-bold uppercase text-stone-500 mb-1">Título de la Guía</label>
                  <input type="text" required value={newPost.title} className="w-full border border-stone-200 rounded-xl p-3 bg-stone-50 focus:ring-2 focus:ring-green-500 outline-none" onChange={(e) => setNewPost({...newPost, title: e.target.value})} />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-stone-500 mb-1">Categoría</label>
                  <select value={newPost.category} className="w-full border border-stone-200 rounded-xl p-3 bg-stone-50 focus:ring-2 focus:ring-green-500 outline-none" onChange={(e) => setNewPost({...newPost, category: e.target.value})}>
                    <option value="Razas y Genética">Razas y Genética</option>
                    <option value="Nutrición y Dieta">Nutrición y Dieta</option>
                    <option value="Salud y Veterinaria">Salud y Veterinaria</option>
                    <option value="Hábitat y Entorno">Hábitat y Entorno</option>
                    <option value="General">General</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-stone-500 mb-1">Resumen Corto</label>
                <textarea required maxLength={150} rows={2} value={newPost.excerpt} className="w-full border border-stone-200 rounded-xl p-3 bg-stone-50 resize-none focus:ring-2 focus:ring-green-500 outline-none" onChange={(e) => setNewPost({...newPost, excerpt: e.target.value})} />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-stone-500 mb-1">Contenido Principal</label>
                <textarea required rows={8} value={newPost.content} className="w-full border border-stone-200 rounded-xl p-3 bg-stone-50 resize-y focus:ring-2 focus:ring-green-500 outline-none" onChange={(e) => setNewPost({...newPost, content: e.target.value})} />
              </div>

              <div className="flex items-center gap-2 mt-2 bg-amber-50 p-3 rounded-xl border border-amber-100">
                <input 
                  type="checkbox" 
                  id="is_featured_post" 
                  checked={newPost.is_featured} 
                  onChange={(e) => setNewPost({...newPost, is_featured: e.target.checked})} 
                  className="w-5 h-5 text-amber-600 rounded border-amber-300 focus:ring-amber-500" 
                />
                <label htmlFor="is_featured_post" className="text-sm font-bold text-amber-800 cursor-pointer flex items-center gap-1.5">
                  <Star size={16} fill="currentColor" /> Destacar en la sección "Aprende con Nosotros" (Inicio)
                </label>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-stone-500 mb-1">Imagen de Cabecera (JPG, PNG)</label>
                <input 
                  type="file" 
                  accept="image/*"
                  className="w-full border border-stone-200 rounded-xl p-2 bg-stone-50 cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-100 file:text-green-800 hover:file:bg-green-200" 
                  onChange={(e) => setPostFile(e.target.files ? e.target.files[0] : null)}
                />
                 {editingPostId && <p className="text-xs text-stone-400 mt-1">Deja esto en blanco si no quieres cambiar la imagen actual.</p>}
              </div>

              <div className="flex gap-3 mt-8 pt-4 border-t border-stone-100">
                <button type="button" onClick={() => setIsPostModalOpen(false)} className="flex-1 py-3 text-stone-500 font-bold hover:bg-stone-100 rounded-xl">Cancelar</button>
                <button type="submit" className="flex-1 py-3 bg-stone-900 text-white font-bold rounded-xl hover:bg-green-600 shadow-lg">{editingPostId ? "Actualizar Guía" : "Publicar Guía"}</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}