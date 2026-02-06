// src/data/mockData.ts

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  rating: number;
  stock: number;
  image_url: string;
  is_featured: boolean;
  is_best_seller: boolean;
  is_new_arrival: boolean;
  details: string;
  // 👇 Nueva propiedad requerida para el filtro de la Home
  size_category?: 'S' | 'M' | 'L' | 'XL';
};

export type Testimonial = {
  id: string;
  customer_name: string;
  comment: string;
  rating: number;
  is_featured: boolean;
};

// --- Mock Data (Datos de ejemplo Pinpilimpausha - Ampliado) ---
export const products: Product[] = [
  // --- TALLA XL ---
  {
    id: "1",
    name: "Ave del Paraíso / Strelitzia",
    description: "Planta ornamental muy valorada por su porte tropical Mejora la humedad ambiental No es medicinal, pero aporta bienestar visual y sensación de espacio",
    price: 10990,
    rating: 4.9,
    stock: 15,
    image_url: "",
    is_featured: true,
    is_best_seller: true,
    is_new_arrival: false,
    details: "Altura aprox: 150cm. Riego moderado.",
    size_category: "XL"
  },
  {
    id: "5",
    name: "Gomero Borgoña XL",
    description: "Hojas oscuras y brillantes que aportan sofisticación inmediata.",
    price: 58490,
    rating: 4.8,
    stock: 12,
    image_url: "https://images.pexels.com/photos/7663986/pexels-photo-7663986.jpeg",
    is_featured: false,
    is_best_seller: true,
    is_new_arrival: false,
    details: "Hojas gruesas. Limpiar polvo frecuentemente.",
    size_category: "XL"
  },
  {
    id: "6",
    name: "Strelitzia Nicolai XL",
    description: "El ave del paraíso gigante, perfecta para techos altos.",
    price: 95990,
    rating: 5.0,
    stock: 8,
    image_url: "https://images.pexels.com/photos/4503723/pexels-photo-4503723.jpeg",
    is_featured: true,
    is_best_seller: false,
    is_new_arrival: true,
    details: "Necesita mucha luz. Riego abundante.",
    size_category: "XL"
  },
  {
    id: "7",
    name: "Ficus Benjamina",
    description: "Clásico árbol de interior con abundantes hojas pequeñas.",
    price: 72990,
    rating: 4.6,
    stock: 10,
    image_url: "https://images.pexels.com/photos/10376110/pexels-photo-10376110.jpeg",
    is_featured: false,
    is_best_seller: false,
    is_new_arrival: false,
    details: "Evitar corrientes de aire.",
    size_category: "XL"
  },

  // --- TALLA L ---
  {
    id: "4",
    name: "Palmera Areca L",
    description: "Elegante y voluminosa, ideal para llenar esquinas.",
    price: 84990,
    rating: 4.7,
    stock: 10,
    image_url: "https://images.pexels.com/photos/1072824/pexels-photo-1072824.jpeg",
    is_featured: false,
    is_best_seller: false,
    is_new_arrival: true,
    details: "Purificadora potente. Riego frecuente.",
    size_category: "L"
  },
  {
    id: "8",
    name: "Yuca Elephantipes",
    description: "Tronco robusto y hojas en forma de espada. Muy resistente.",
    price: 42990,
    rating: 4.5,
    stock: 18,
    image_url: "https://images.pexels.com/photos/5699665/pexels-photo-5699665.jpeg",
    is_featured: false,
    is_best_seller: true,
    is_new_arrival: false,
    details: "Poco riego. Pleno sol o interior luminoso.",
    size_category: "L"
  },
  {
    id: "9",
    name: "Philodendron Pink",
    description: "Hojas con variegación rosada, una joya para coleccionistas.",
    price: 65990,
    rating: 4.9,
    stock: 5,
    image_url: "https://images.pexels.com/photos/8275185/pexels-photo-8275185.jpeg",
    is_featured: true,
    is_best_seller: false,
    is_new_arrival: true,
    details: "Luz indirecta brillante. Sustrato aireado.",
    size_category: "L"
  },

  // --- TALLA M ---
  {
    id: "3",
    name: "Monstera Deliciosa M",
    description: "La costilla de Adán, perfecta para dar un toque tropical.",
    price: 45990,
    rating: 5.0,
    stock: 20,
    image_url: "https://images.pexels.com/photos/3125195/pexels-photo-3125195.jpeg",
    is_featured: false,
    is_best_seller: true,
    is_new_arrival: false,
    details: "Hojas fenestradas. Luz indirecta.",
    size_category: "M"
  },
  {
    id: "10",
    name: "Calathea Orbifolia",
    description: "Hojas redondas y grandes con patrones plateados.",
    price: 28990,
    rating: 4.4,
    stock: 15,
    image_url: "https://images.pexels.com/photos/10360604/pexels-photo-10360604.jpeg",
    is_featured: false,
    is_best_seller: false,
    is_new_arrival: true,
    details: "Alta humedad ambiental. No sol directo.",
    size_category: "M"
  },
  {
    id: "11",
    name: "Zamioculcas Zamiifolia",
    description: "La planta ZZ, brillante y escultural. Casi inmortal.",
    price: 32990,
    rating: 4.9,
    stock: 30,
    image_url: "https://images.pexels.com/photos/7516599/pexels-photo-7516599.jpeg",
    is_featured: false,
    is_best_seller: true,
    is_new_arrival: false,
    details: "Tolera poca luz y poco riego.",
    size_category: "M"
  },

  // --- TALLA S ---
  {
    id: "2",
    name: "Sansevieria Trifasciata",
    description: "Indestructible y purificadora de aire. Ideal escritorio.",
    price: 15990,
    rating: 4.8,
    stock: 40,
    image_url: "https://images.pexels.com/photos/2123482/pexels-photo-2123482.jpeg",
    is_featured: false,
    is_best_seller: true,
    is_new_arrival: false,
    details: "Altura aprox: 30cm. Riego escaso.",
    size_category: "S"
  },
  {
    id: "12",
    name: "Pothos Neon",
    description: "Planta colgante de color verde limón vibrante.",
    price: 12990,
    rating: 4.7,
    stock: 25,
    image_url: "https://images.pexels.com/photos/7663988/pexels-photo-7663988.jpeg",
    is_featured: false,
    is_best_seller: false,
    is_new_arrival: false,
    details: "Crecimiento rápido. Fácil cuidado.",
    size_category: "S"
  },
  {
    id: "13",
    name: "Peperomia Watermelon",
    description: "Hojas que parecen pequeñas sandías.",
    price: 18990,
    rating: 4.6,
    stock: 20,
    image_url: "https://images.pexels.com/photos/11005230/pexels-photo-11005230.jpeg",
    is_featured: false,
    is_best_seller: false,
    is_new_arrival: true,
    details: "Riego moderado. Luz indirecta.",
    size_category: "S"
  }
];

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    customer_name: "Patricio",
    comment: "Excelente producto, rápida entrega, 100% recomendable.",
    rating: 5,
    is_featured: true,
  },
  {
    id: "t2",
    customer_name: "Deisy",
    comment: "Hermosa planta con una maceta muy bonita. Viene con muchos brotes.",
    rating: 5,
    is_featured: true,
  },
  {
    id: "t3",
    customer_name: "Paola",
    comment: "Hermosa Planta y presentación, excelente y rápido servicio! Muchas gracias 👏🏼",
    rating: 5,
    is_featured: true,
  },
];