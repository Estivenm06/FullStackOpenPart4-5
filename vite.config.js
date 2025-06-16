import { defineConfig } from "vite";
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        react({
            jsxRuntime: 'automatic', // Ensure React's automatic runtime is used
        }),
    ],
    root: "./",
    html: {
        template: "./index.html"
    },
    build: {
        target: "esnext",
        outDir: "./dist",
        emptyOutDir: true,
    }
})