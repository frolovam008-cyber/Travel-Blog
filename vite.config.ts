import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'  // <- нужно для resolve.alias

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // @ -> папка src
    },
  },
})

// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";

// export default defineConfig({
//   plugins: [react()],
//   server: {
//     proxy: {
//       "/api": {
//         target: "https://travelblog.skillbox.cc",
//         changeOrigin: true,
//         secure: false,
//       },
//     },
//   },
// });