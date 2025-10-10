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
};

export type Testimonial = {
  id: string;
  customer_name: string;
  comment: string;
  rating: number;
  is_featured: boolean;
};

// --- Mock Data (Ejemplo para empezar) ---
export const products: Product[] = [
  {
    id: "1",
    name: "Suplemento Omega-3",
    description: "Aceite de pescado de alta pureza.",
    price: 29.99,
    rating: 4.8,
    stock: 50,
    image_url:
      "https://images.pexels.com/photos/5934360/pexels-photo-5934360.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    is_featured: true,
    is_best_seller: true,
    is_new_arrival: false,
    details: "Puro y efectivo.",
  },
  {
    id: "2",
    name: "Colágeno Marino",
    description: "Para piel, cabello y uñas.",
    price: 45.5,
    rating: 4.5,
    stock: 30,
    image_url:
      "https://images.pexels.com/photos/6684074/pexels-photo-6684074.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    is_featured: true,
    is_best_seller: false,
    is_new_arrival: true,
    details: "Hidrolizado premium.",
  },
  {
    id: "3",
    name: "Aceite Esencial Lavanda",
    description: "Relajación y aromaterapia.",
    price: 15.0,
    rating: 4.9,
    stock: 100,
    image_url:
      "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    is_featured: false,
    is_best_seller: true,
    is_new_arrival: false,
    details: "100% puro.",
  },
];

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    customer_name: "Ana M.",
    comment: "Mi piel se ve increíble!",
    rating: 5,
    is_featured: true,
  },
  {
    id: "t2",
    customer_name: "Carlos R.",
    comment: "Excelente para el gimnasio.",
    rating: 4,
    is_featured: true,
  },
  {
    id: "t3",
    customer_name: "Sofía P.",
    comment: "Entrega rápida y buen servicio.",
    rating: 5,
    is_featured: true,
  },
];
