// src/pages/AdminTestimonials.tsx

import { useState, useEffect } from "react";
import { Loader2, Trash2, Star, Upload, MessageSquareHeart, Users } from "lucide-react";

export default function AdminTestimonials() {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    author_name: "",
    content: "",
    rating: 5,
    image: null as File | null,
  });

 const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  const fetchTestimonials = async () => {
    try {
      const response = await fetch(`${API_URL}/api/testimonials`);
      if (response.ok) {
        const data = await response.json();
        setTestimonials(data);
      }
    } catch (error) {
      console.error("Error al cargar testimonios:", error);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const data = new FormData();
    data.append("author_name", formData.author_name);
    data.append("content", formData.content);
    data.append("rating", String(formData.rating));
    
    if (formData.image) {
      data.append("image", formData.image);
    }

    try {
      const response = await fetch(`${API_URL}/api/testimonials`, {
        method: "POST",
        body: data,
      });

      if (response.ok) {
        // Limpiar el formulario si se envió con éxito
        setFormData({ author_name: "", content: "", rating: 5, image: null });
        // Recargar la lista de testimonios
        fetchTestimonials();
      } else {
        alert("Hubo un problema al guardar la experiencia de la familia.");
      }
    } catch (error) {
      console.error("Error al enviar:", error);
      alert("Error de conexión al servidor.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("¿Estás seguro de eliminar esta reseña?")) return;
    
    try {
      const response = await fetch(`${API_URL}/api/testimonials/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setTestimonials(testimonials.filter((t) => t.id !== id));
      } else {
        alert("Error al eliminar la reseña.");
      }
    } catch (error) {
      console.error("Error al eliminar:", error);
    }
  };

  return (
    <div className="animate-fade-in font-sans">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-stone-800 flex items-center gap-3">
            <MessageSquareHeart className="text-green-600" size={32} />
            Familias Felices
          </h1>
          <p className="text-stone-500 mt-1">Gestiona las reseñas y experiencias de los adoptantes.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* COLUMNA IZQUIERDA: Formulario para nuevo testimonio */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-stone-200 sticky top-6">
            <h2 className="text-xl font-bold text-stone-800 mb-6 border-b border-green-100 pb-3 flex items-center gap-2">
              <Users size={20} className="text-green-600"/>
              Nueva Reseña
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-bold uppercase text-stone-500 mb-1">Nombre de la Familia / Adoptante</label>
                <input 
                  type="text" 
                  required 
                  value={formData.author_name} 
                  onChange={(e) => setFormData({...formData, author_name: e.target.value})}
                  className="w-full border border-stone-200 rounded-2xl p-3 bg-stone-50 focus:ring-2 focus:ring-green-500 outline-none transition-all" 
                  placeholder="Ej: Familia Soto"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-stone-500 mb-1">Valoración</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setFormData({...formData, rating: star})}
                      className="focus:outline-none transition-transform hover:scale-110"
                    >
                      <Star 
                        size={28} 
                        fill={star <= formData.rating ? "#16a34a" : "none"} // green-600
                        color={star <= formData.rating ? "#16a34a" : "#d6d3d1"} // stone-300
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-stone-500 mb-1">Experiencia</label>
                <textarea 
                  required 
                  rows={4} 
                  value={formData.content} 
                  onChange={(e) => setFormData({...formData, content: e.target.value})}
                  className="w-full border border-stone-200 rounded-2xl p-3 bg-stone-50 resize-none focus:ring-2 focus:ring-green-500 outline-none transition-all" 
                  placeholder="Escribe lo que la familia comentó sobre su orejudo..."
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-stone-500 mb-1">Foto del Conejo / Familia (Opcional)</label>
                <div className="relative border-2 border-dashed border-stone-300 rounded-2xl p-4 text-center hover:bg-green-50 hover:border-green-400 transition-colors cursor-pointer bg-stone-50">
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={(e) => setFormData({...formData, image: e.target.files ? e.target.files[0] : null})}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                  />
                  <Upload className="mx-auto text-stone-400 mb-2" size={24} />
                  <span className="text-sm text-stone-600 font-medium">
                    {formData.image ? formData.image.name : "Sube una imagen (JPG, PNG)"}
                  </span>
                </div>
              </div>

              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full bg-stone-900 text-white py-3.5 rounded-2xl font-bold hover:bg-green-600 transition-colors shadow-lg flex items-center justify-center gap-2 mt-4"
              >
                {isLoading ? <Loader2 className="animate-spin" size={20} /> : "Publicar Reseña"}
              </button>
            </form>
          </div>
        </div>

        {/* COLUMNA DERECHA: Lista de Testimonios */}
        <div className="lg:col-span-2 space-y-4">
          {testimonials.length === 0 ? (
            <div className="bg-white p-12 rounded-3xl border border-stone-200 text-center flex flex-col items-center shadow-sm">
               <MessageSquareHeart size={48} className="text-stone-300 mb-4" />
               <h3 className="text-xl font-bold text-stone-700 mb-2">Aún no hay reseñas</h3>
               <p className="text-stone-500">Registra el primer testimonio usando el formulario.</p>
            </div>
          ) : (
            testimonials.map((testimonio) => (
              <div key={testimonio.id} className="bg-white p-6 rounded-3xl shadow-sm border border-stone-200 flex flex-col sm:flex-row gap-6 relative group hover:border-green-200 transition-colors">
                
                {/* Botón Eliminar (Aparece en hover en desktop) */}
                <button 
                  onClick={() => handleDelete(testimonio.id)}
                  className="absolute top-4 right-4 text-stone-300 hover:text-red-500 hover:bg-red-50 p-2 rounded-full transition-all sm:opacity-0 sm:group-hover:opacity-100"
                  title="Eliminar testimonio"
                >
                  <Trash2 size={20} />
                </button>

                {/* Avatar / Imagen */}
                <div className="w-20 h-20 sm:w-24 sm:h-24 shrink-0 rounded-full bg-green-100 overflow-hidden border-4 border-green-50 shadow-inner flex items-center justify-center text-green-600">
                  {testimonio.image_url ? (
                    <img 
                      src={`${API_URL}/${testimonio.image_url}`} 
                      alt={testimonio.author_name} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Users size={32} />
                  )}
                </div>

                {/* Contenido */}
                <div className="flex-1">
                  <h3 className="font-bold text-lg text-stone-800">{testimonio.author_name}</h3>
                  <div className="flex gap-1 my-2">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        size={16} 
                        fill={i < testimonio.rating ? "#16a34a" : "none"} 
                        color={i < testimonio.rating ? "#16a34a" : "#d6d3d1"} 
                      />
                    ))}
                  </div>
                  <p className="text-stone-600 italic text-sm sm:text-base leading-relaxed pr-8">
                    "{testimonio.content}"
                  </p>
                  <span className="text-xs text-stone-400 mt-3 block font-medium uppercase tracking-wider">
                    {testimonio.created_at ? new Date(testimonio.created_at).toLocaleDateString('es-ES') : 'Recientemente'}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}