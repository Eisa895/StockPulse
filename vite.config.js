// Import Vite's defineConfig helper for type-safe configuration
import { defineConfig } from 'vite';
// Import Node.js resolve function to get absolute paths
import { resolve } from 'path';

// Export the Vite configuration
export default defineConfig({
  
  // Development Server Config
  server: {
    port: 8080
  }, // Set the local dev server to run on port 8080
 
   // Build Config
  build: {
    rollupOptions: {
      // Specify multiple HTML entry points for a multi-page app
      input: {
       main: resolve(__dirname, 'index.html'),       // Home page
        markets: resolve(__dirname, 'markets.html'),  // Markets page
        currencies: resolve(__dirname, 'currencies.html'), // Currencies page
        trends: resolve(__dirname, 'trends.html'),    // Trends page
        news: resolve(__dirname, 'news.html'),        // News page
        about: resolve(__dirname, 'about.html'),      // About page
      },
    },
  },
   // Dependency Optimization
  optimizeDeps: {
    include: ['chart.js'] // Pre-bundle chart.js to improve dev server performance
  }
});
