import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    target: "esnext",
  },
  plugins: [vue(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: { enabled: true },
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
      manifest: {
        start_url: '/',
        name: 'Anime Info Platform 2.0', 
        short_name: 'Animark 2.0',
        icons: [
           {
            "src": "/android-chrome-192x192.png",
            "sizes": "192x192",
            "type": "image/png"
        },
        {
            "src": "/android-chrome-512x512.png",
            "sizes": "512x512",
            "type": "image/png"
        },{
          src: "/apple-touch-icon.png",
          sizes: "180x180",
          type: "image/png",
          purpose: "maskable any"
        }

        ],
        theme_color: '#f6f6f6',
        background_color: '#f6f6f6',
        display: 'standalone',
      }
    })],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
