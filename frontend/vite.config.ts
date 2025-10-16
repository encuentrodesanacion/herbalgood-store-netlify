// frontend/vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// Ya no necesitamos importar 'viteStaticCopy'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(), // Solo incluimos el plugin de React
  ], // <-- CIERRE CORRECTO DE LA MATRIZ DE PLUGINS
  optimizeDeps: {
    exclude: ["lucide-react"], // Esta línea no es necesaria para el build, pero la mantenemos si la usas en dev
    include: ["libphonenumber-js"],
  },
  build: {
    outDir: "dist", // Asegúrate de que no haya un 'rollupOptions.external' aquí para 'libphonenumber-js'
  },
  // Asegúrate de que tu Base Directory de Netlify ya esté configurado a 'frontend'
});
