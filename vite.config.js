import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/swediroben.github.io/", // ou ton repo, ex: "/bees/"
});
