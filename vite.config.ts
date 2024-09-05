import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [react()],
    envPrefix: "TALKY_",
    build: {
        copyPublicDir: true,
    },
});
