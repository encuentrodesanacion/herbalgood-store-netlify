import { useState, useEffect } from "react";
import { Star, Loader2, Quote, MessageSquareHeart, Users, Plus, X, Upload, Send } from "lucide-react";

type TestimoniosPageProps = {
  onNavigate: (page: string, productId?: string) => void;
};

export default function TestimoniosPage({ onNavigate }: TestimoniosPageProps) {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [formData, setFormData] = useState({
    author_name: "",
    content: "",
    rating: 5,
    image: null as File | null,
  });

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  const fetchTestimonials = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${API_URL}/api/testimonials`);
      if (response.ok) {
        const data = await response.json();
        setTestimonials(data);
      }
    } catch (error) {
      console.error("Error al cargar los testimonios:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

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
        setSubmitSuccess(true);
        setFormData({ author_name: "", content: "", rating: 5, image: null });
        
        // Ya no llamamos a fetchTestimonials() inmediatamente aquí porque el post está pendiente y no aparecerá
        
        setTimeout(() => {
          setSubmitSuccess(false);
          setIsFormOpen(false);
        }, 4000);
      } else {
        alert("Hubo un problema al enviar tu reseña. Por favor, intenta de nuevo.");
      }
    } catch (error) {
      console.error("Error al enviar:", error);
      alert("Error de conexión al servidor.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-green-50/50 font-sans text-stone-900 pb-20">
      <header className="relative py-20 px-4 text-center bg-white shadow-sm overflow-hidden border-b border-green-100 mb-16">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/leaves-pattern.png')]"></div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <span className="text-green-600 font-bold tracking-[0.2em] uppercase text-xs mb-4 block">
            Comunidad Chile Conejitos
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-stone-900 mb-6 font-serif flex items-center justify-center gap-4">
            Familias Felices <MessageSquareHeart className="text-green-600" size={40} />
          </h1>
          <p className="text-lg text-stone-600 font-light max-w-2xl mx-auto mb-8">
            La mayor recompensa de nuestra crianza ética es ver cómo nuestros ejemplares se convierten en compañeros de vida inseparables.
          </p>
          
          <button 
            onClick={() => setIsFormOpen(true)}
            className="bg-stone-900 text-white px-8 py-4 rounded-full font-bold hover:bg-green-600 transition-colors shadow-lg flex items-center gap-2 mx-auto"
          >
            <Plus size={20} /> Comparte tu experiencia
          </button>
        </div>
      </header>
      
      <div className="max-w-7xl mx-auto px-4">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 text-stone-400">
            <Loader2 className="animate-spin mb-4 text-green-500" size={48} />
            <p className="font-medium text-lg">Cargando historias...</p>
          </div>
        ) : testimonials.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-[2rem] border border-stone-100 shadow-sm max-w-3xl mx-auto">
             <Users size={64} className="mx-auto text-green-200 mb-4" />
             <h3 className="text-2xl font-bold text-stone-800 mb-2 font-serif">Aún no hay historias publicadas</h3>
             <p className="text-stone-500 mb-6">¡Sé el primero en compartir la experiencia con tu orejudo!</p>
             <button onClick={() => setIsFormOpen(true)} className="text-green-600 font-bold hover:underline">Escribir una reseña</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <div 
                key={t.id} 
                className="bg-white p-8 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-shadow duration-300 border border-green-50 relative overflow-hidden group"
              >
                <Quote className="absolute top-6 right-6 text-green-50 w-24 h-24 -rotate-12 group-hover:scale-110 transition-transform duration-500 z-0" />
                
                <div className="relative z-10">
                  <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-green-100 border-4 border-white shadow-md overflow-hidden flex items-center justify-center text-green-600">
                    {t.image_url ? (
                      <img 
                        src={t.image_url.startsWith('http') ? t.image_url : `${API_URL}/${t.image_url}`} 
                        alt={t.author_name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Users size={32} />
                    )}
                  </div>
                  
                  <div className="text-center mb-6">
                    <h3 className="font-bold text-xl text-stone-800 mb-2">{t.author_name}</h3>
                    <div className="flex justify-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          size={18} 
                          fill={i < t.rating ? "#16a34a" : "none"} 
                          className={i < t.rating ? "text-green-600" : "text-stone-200"} 
                        />
                      ))}
                    </div>
                  </div>
                  
                  <p className="text-stone-600 text-center leading-relaxed italic relative">
                    <span className="text-green-400 font-serif text-2xl leading-none absolute -top-2 -left-2">"</span>
                    {t.content}
                    <span className="text-green-400 font-serif text-2xl leading-none absolute -bottom-4 -right-2">"</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {isFormOpen && (
        <div className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200 relative">
            
            {submitSuccess ? (
              <div className="p-12 text-center flex flex-col items-center">
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                  <Send size={40} />
                </div>
                <h2 className="text-3xl font-bold text-stone-800 mb-4 font-serif">¡Reseña recibida!</h2>
                <p className="text-stone-600">Muchas gracias por compartir tu historia. Para mantener la seguridad de la comunidad, tu reseña será revisada por el administrador antes de ser publicada de forma definitiva. ✨</p>
              </div>
            ) : (
              <>
                <button 
                  onClick={() => setIsFormOpen(false)}
                  className="absolute top-6 right-6 text-stone-400 hover:text-stone-800 bg-stone-100 hover:bg-stone-200 p-2 rounded-full transition-colors z-10"
                >
                  <X size={20} />
                </button>

                <div className="p-8 md:p-10">
                  <h2 className="text-2xl font-bold text-stone-800 mb-2 font-serif">Cuéntanos tu historia</h2>
                  <p className="text-stone-500 mb-8 text-sm">Nos encantaría saber cómo ha sido tu experiencia con nosotros y tu nuevo compañero.</p>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label className="block text-sm font-bold text-stone-700 mb-2">Tu Nombre o Apellido Familiar</label>
                      <input 
                        type="text" 
                        required 
                        value={formData.author_name} 
                        onChange={(e) => setFormData({...formData, author_name: e.target.value})}
                        className="w-full border border-stone-200 rounded-2xl p-4 bg-stone-50 focus:ring-2 focus:ring-green-500 outline-none transition-all" 
                        placeholder="Ej: Familia Soto"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-stone-700 mb-2">¿Cómo calificarías tu experiencia?</label>
                      <div className="flex gap-2 justify-center py-2 bg-stone-50 rounded-2xl border border-stone-100">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setFormData({...formData, rating: star})}
                            className="focus:outline-none transition-transform hover:scale-125"
                          >
                            <Star 
                              size={32} 
                              fill={star <= formData.rating ? "#16a34a" : "none"} 
                              color={star <= formData.rating ? "#16a34a" : "#d6d3d1"} 
                            />
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-stone-700 mb-2">Tu Reseña</label>
                      <textarea 
                        required 
                        rows={4} 
                        value={formData.content} 
                        onChange={(e) => setFormData({...formData, content: e.target.value})}
                        className="w-full border border-stone-200 rounded-2xl p-4 bg-stone-50 resize-none focus:ring-2 focus:ring-green-500 outline-none transition-all" 
                        placeholder="¿Cómo se ha adaptado tu orejudo?"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-stone-700 mb-2">Foto de tu orejudo (Opcional)</label>
                      <div className="relative border-2 border-dashed border-stone-300 rounded-2xl p-6 text-center hover:bg-green-50 hover:border-green-400 transition-colors cursor-pointer bg-stone-50">
                        <input 
                          type="file" 
                          accept="image/*"
                          onChange={(e) => setFormData({...formData, image: e.target.files ? e.target.files[0] : null})}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                        />
                        <Upload className="mx-auto text-stone-400 mb-2" size={24} />
                        <span className="text-sm text-stone-600 font-medium">
                          {formData.image ? formData.image.name : "Toca aquí para subir una imagen"}
                        </span>
                      </div>
                    </div>

                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full bg-green-600 text-white py-4 rounded-2xl font-bold hover:bg-green-700 transition-colors shadow-lg flex items-center justify-center gap-2 mt-4"
                    >
                      {isSubmitting ? <Loader2 className="animate-spin" size={24} /> : "Enviar mi reseña"}
                    </button>
                  </form>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}