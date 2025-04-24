import { defineConfig } from 'vite'
import { visualizer } from "rollup-plugin-visualizer";
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), visualizer()],
  preview: {
    port: 10000, // optional, Render provides $PORT anyway
    host: true, // binds to 0.0.0.0
    allowedHosts: ["calendlly-client.onrender.com"], // Only the hostname
  },
}); 