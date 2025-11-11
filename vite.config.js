import { defineConfig } from 'vite';
import angular from '@analogjs/vite-plugin-angular';

export default defineConfig({
  plugins: [angular()],
  server: {
    host: true,            // listen on all network interfaces
    port: 4200,
    allowedHosts: 'all'    // allow ngrok and any external host
  }
});
