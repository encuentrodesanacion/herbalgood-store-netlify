// src/pages/About.tsx

import { Leaf, Handshake, TrendingUp } from "lucide-react";

type AboutProps = {
  onNavigate: (page: string) => void;
};

// Estructura de datos para la sección de Compromisos (Valores)
const commitments = [
  {
    icon: Leaf,
    title: "Excelencia y Pureza",
    description:
      "Ofrecer productos de alta calidad que contribuyan al bienestar integral, con ingredientes naturales y orgánicos de máxima pureza, garantizando eficacia.",
  },
  {
    icon: TrendingUp,
    title: "Innovación Científica",
    description:
      "Impulsar un estilo de vida saludable con base en la sabiduría natural y la innovación científica, utilizando el respaldo de marcas reconocidas.",
  },
  {
    icon: Handshake,
    title: "Aliado Confiable",
    description:
      "Ser un aliado confiable para quienes buscan alternativas naturales y efectivas, acompañándolos en un camino de transformación personal y mejora continua.",
  },
];

export default function About({ onNavigate }: AboutProps) {
  return (
    <div className="min-h-screen">
      {/* Sección Hero: Visión Holística */}
      <header className="bg-light-green py-20 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-extrabold text-dark-slate mb-4">
            Nuestra Filosofía: Pura y Natural
          </h1>
          <p className="text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
            En **HerbalGood** creemos en un enfoque **holístico** de la medicina
            y la salud, donde el bienestar no se limita a la ausencia de
            enfermedad, sino que abarca la prevención, el fortalecimiento del
            organismo, el equilibrio emocional y la vitalidad diaria.
          </p>
        </div>
      </header>

      {/* Sección 1: Misión y Quiénes Somos */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-primary-green mb-4">
              ¿Quiénes Somos?
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              En **HerbalGood** trabajamos con un propósito claro: ofrecer a
              nuestros clientes salud, bienestar y calidad de vida a través de
              los beneficios que la naturaleza nos entrega.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed">
              Somos una empresa dedicada a la distribución de **vitaminas,
              suplementos naturales, colágeno, semillas, aceites esenciales y
              productos de belleza natural**, cuidadosamente seleccionados para
              garantizar eficacia, seguridad y excelencia.
            </p>
            <p className="text-gray-600 italic border-l-4 border-primary-green pl-4">
              Con el respaldo de marcas reconocidas como Vidartrit, Vigorom, Dar
              Vida, Moringa y No Artrit, hemos consolidado una línea de
              productos que responden a las necesidades actuales de las
              personas.
            </p>
          </div>

          <div className="bg-gray-100 rounded-xl p-6 shadow-xl aspect-video overflow-hidden">
            {/* Imagen de ejemplo - Puedes reemplazarla por una de tu marca */}
            <img
              src="https://images.pexels.com/photos/373887/pexels-photo-373887.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="Productos naturales y hierbas"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        </div>
      </section>

      {/* Sección 2: Nuestro Compromiso (Valores) */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-dark-slate mb-12">
            Nuestro Compromiso de Calidad
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {commitments.map((item, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 border-t-4 border-primary-green"
              >
                <item.icon
                  size={48}
                  className="text-primary-green mx-auto mb-4"
                />
                <h3 className="text-xl font-bold text-dark-slate mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sección 3: Cierre y Slogan */}
      <section className="py-20 bg-dark-slate text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-extrabold mb-4">
            La Salud es la Mayor Riqueza
          </h2>
          <p className="text-xl leading-relaxed mb-8 opacity-90">
            En **HerbalGood** entendemos que la salud es la mayor riqueza. Por
            ello, cada uno de nuestros productos ha sido pensado para potenciar
            la energía, realzar la belleza natural y promover el equilibrio
            físico y mental.
          </p>
          <div className="flex justify-center items-center">
            <button
              onClick={() => onNavigate("shop")}
              className="bg-primary-green text-white px-8 py-4 rounded-full font-semibold hover:bg-light-green hover:text-dark-slate transition-all transform hover:scale-105 inline-flex items-center gap-2 shadow-xl"
            >
              Explora Nuestro Catálogo
            </button>
          </div>
          <p className="text-primary-green text-2xl font-bold mt-8">
            🌱 HerbalGood: El poder natural que impulsa tu vida.
          </p>
        </div>
      </section>
    </div>
  );
}
