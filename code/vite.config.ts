import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { defineConfig } from "vite";

export default defineConfig({
    plugins: [react(), tailwindcss()],
		server: {
			proxy: {
				"/api": {
					target: "https://api.diga.io",
					changeOrigin: true,
					followRedirects: true,
					secure: true,
					rewrite: (path) => path.replace(/^\/api/, ""),
				}
			}
		},
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
});
