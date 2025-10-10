// src/services/apiService.ts

import { products, testimonials, Product, Testimonial } from "../data/mockData";

// Simula la latencia de una petición de red real
const API_LATENCY = 500;

/**
 * Simula la obtención de todos los productos.
 */
export async function getProducts(): Promise<Product[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(products);
    }, API_LATENCY);
  });
}

/**
 * Simula la obtención de un producto por su ID.
 */
export async function getProductById(id: string): Promise<Product | undefined> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const product = products.find((p) => p.id === id);
      resolve(product);
    }, API_LATENCY);
  });
}

/**
 * Simula la obtención de testimonios.
 */
export async function getTestimonials(): Promise<Testimonial[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(testimonials.filter((t) => t.is_featured));
    }, API_LATENCY);
  });
}
