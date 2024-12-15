import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Allows Vite to bind to 0.0.0.0, making it accessible from Docker
    port: 3000, // Matches the port in your docker-compose.yml
    watch: {
      usePolling: true, // Enables polling for file changes
    },
  },
});
