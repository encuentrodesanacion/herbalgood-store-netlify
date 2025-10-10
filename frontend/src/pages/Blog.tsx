// src/pages/Blog.tsx

import { ArrowRight, Calendar, User } from "lucide-react";

type BlogProps = {
  onNavigate: (page: string) => void;
};

const mockPosts = [
  {
    id: "blog-1",
    title: "Los 5 Superalimentos que Debes Incluir en tu Dieta",
    summary:
      "Una guía completa sobre los alimentos más nutritivos y cómo incorporarlos fácilmente a tu rutina.",
    date: "15 de Agosto, 2025",
    author: "Equipo Herbalgood",
    image:
      "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: "blog-2",
    title: "El Poder de la Cúrcuma: Más Allá de la Especia",
    summary:
      "Exploramos los beneficios antiinflamatorios y antioxidantes de la cúrcuma y cómo potenciar su absorción.",
    date: "28 de Julio, 2025",
    author: "Dr. Wellness",
    image:
      "https://images.pexels.com/photos/5934360/pexels-photo-5934360.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: "blog-3",
    title: "Rutina Nocturna de Skincare Natural",
    summary:
      "Pasos esenciales para una rutina de noche que revitaliza tu piel con ingredientes 100% naturales.",
    date: "01 de Julio, 2025",
    author: "Beauty Editor",
    image:
      "https://images.pexels.com/photos/6684074/pexels-photo-6684074.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
];

type BlogPost = (typeof mockPosts)[0];

const BlogPostCard = (
  { post }: { post: BlogPost } // Tipo de Prop CORREGIDO
) => (
  <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-[1.02]">
    <div className="aspect-video overflow-hidden">
      <img
        src={post.image}
        alt={post.title}
        className="w-full h-full object-cover"
      />
    </div>
    <div className="p-6">
      <h2 className="text-2xl font-bold text-dark-slate mb-3 hover:text-primary-green transition-colors cursor-pointer">
        {post.title}
      </h2>
      <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
        <span className="flex items-center gap-1">
          <Calendar size={16} className="text-primary-green" /> {post.date}
        </span>
        <span className="flex items-center gap-1">
          <User size={16} className="text-primary-green" /> {post.author}
        </span>
      </div>
      <p className="text-gray-700 mb-6 line-clamp-3">{post.summary}</p>
      <button
        onClick={() => {
          /* onNavigate('blog-post', post.id) */
        }} // Simular ir al post individual
        className="text-primary-green font-semibold flex items-center gap-1 hover:gap-2 transition-all"
      >
        Leer Más <ArrowRight size={18} />
      </button>
    </div>
  </div>
);

export default function Blog({ onNavigate }: BlogProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <header className="text-center mb-12 bg-light-green p-10 rounded-xl">
        <h1 className="text-5xl font-extrabold text-dark-slate mb-4">
          El Blog del Bienestar
        </h1>
        <p className="text-xl text-gray-700">
          Artículos, guías y consejos para un estilo de vida más saludable y
          natural.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {mockPosts.map((post) => (
          <BlogPostCard key={post.id} post={post} /> // Enviando el objeto completo como prop 'post'
        ))}
      </div>
    </div>
  );
}
