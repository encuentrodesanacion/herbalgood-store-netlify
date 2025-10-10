// src/pages/NotFound.tsx

import { Frown } from "lucide-react";

type NotFoundProps = {
  onNavigate: (page: string) => void;
};

export default function NotFound({ onNavigate }: NotFoundProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center p-8 bg-gray-50">
      <Frown size={80} className="text-primary-green mb-6" />
      <h1 className="text-6xl font-extrabold text-dark-slate mb-4">404</h1>
      <h2 className="text-3xl font-semibold text-gray-700 mb-6">
        Página No Encontrada
      </h2>
      <p className="text-lg text-gray-600 mb-8 max-w-md">
        Lo sentimos, la página que estás buscando no existe o ha sido movida.
      </p>
      <button
        onClick={() => onNavigate("home")}
        className="bg-dark-slate text-white px-8 py-4 rounded-full font-semibold hover:bg-primary-green transition-colors shadow-lg"
      >
        Volver a la Home
      </button>
    </div>
  );
}
