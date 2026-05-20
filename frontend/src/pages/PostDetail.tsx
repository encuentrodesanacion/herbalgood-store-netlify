// src/pages/PostDetail.tsx

import { useState, useEffect } from "react";
// 👇 1. Importamos useParams de React Router
import { useParams } from "react-router-dom"; 
import { ArrowLeft, Calendar, Tag, Loader2, Image as ImageIcon } from "lucide-react";

type PostDetailProps = {
  // 👇 2. Ya no pedimos postId aquí, solo onNavigate
  onNavigate: (page: string, id?: string) => void;
};

export default function PostDetail({ onNavigate }: PostDetailProps) {
  // 👇 3. Extraemos el ID directamente de la URL
  const { id: postId } = useParams(); 

  const [post, setPost] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setIsLoading(true);
        // Hacemos la petición al backend pidiendo solo 1 artículo por su ID
        const response = await fetch(`${API_URL}/api/posts/${postId}`);
        if (response.ok) {
          const data = await response.json();
          setPost(data);
        } else {
          console.error("No se encontró el artículo");
        }
      } catch (error) {
        console.error("Error al cargar el artículo:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (postId) {
      fetchPost();
    }
  }, [postId]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-green-50/50 flex flex-col items-center justify-center text-stone-400">
        <Loader2 className="animate-spin mb-4 text-green-600" size={48} />
        <p className="text-lg font-medium">Abriendo la guía...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-green-50/50 flex flex-col items-center justify-center text-stone-500">
        <h2 className="text-2xl font-bold mb-4">Artículo no encontrado</h2>
        <button onClick={() => onNavigate('blog')} className="text-green-600 font-bold hover:underline">
          Volver al Blog
        </button>
      </div>
    );
  }

  // Validación para la imagen (Local vs Cloudinary)
  const imageUrl = post.image_url 
    ? (post.image_url.startsWith('http') ? post.image_url : `${API_URL}/${post.image_url}`)
    : null;

  return (
    <div className="min-h-screen bg-white font-sans text-stone-900 pb-20">
      {/* Botón Volver */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <button 
          onClick={() => onNavigate('blog')}
          className="flex items-center gap-2 text-stone-500 hover:text-green-600 font-bold transition-colors"
        >
          <ArrowLeft size={20} /> Volver a las guías
        </button>
      </div>

      {/* Imagen de Cabecera */}
      <div className="max-w-5xl mx-auto px-4 mb-12">
        <div className="w-full h-[40vh] md:h-[60vh] bg-stone-100 rounded-[3rem] overflow-hidden shadow-lg flex items-center justify-center">
          {imageUrl ? (
            <img src={imageUrl} alt={post.title} className="w-full h-full object-cover" />
          ) : (
            <ImageIcon size={64} className="text-stone-300" />
          )}
        </div>
      </div>

      {/* Contenido del Artículo */}
      <article className="max-w-3xl mx-auto px-4">
        {/* Etiquetas y Fecha */}
        <div className="flex items-center gap-4 mb-6 text-sm font-bold text-stone-500">
          <span className="flex items-center gap-1.5 text-green-700 bg-green-100 px-3 py-1 rounded-full">
            <Tag size={16} /> {post.category || 'General'}
          </span>
          <span className="flex items-center gap-1.5">
            <Calendar size={16} /> 
            {post.created_at ? new Date(post.created_at).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' }) : 'Reciente'}
          </span>
        </div>

        {/* Título */}
        <h1 className="text-4xl md:text-5xl font-bold text-stone-900 mb-8 font-serif leading-tight">
          {post.title}
        </h1>

        {/* Texto (Conservando saltos de línea) */}
        <div className="prose prose-lg prose-stone max-w-none text-stone-700 leading-relaxed whitespace-pre-line">
          {post.content}
        </div>
      </article>
    </div>
  );
}