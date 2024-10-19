import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue'; // --> ADD THIS LINE

export default defineConfig({
    plugins: [
        vue(),  // The Vue plugin for Vite
    ]
})