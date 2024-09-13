import { defineConfig } from "npm:vite@^5.2.10";
import vue from "npm:@vitejs/plugin-vue@^5.0.4";

import "npm:vue@^3.4.23";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  define: {
    "import.meta.env.BACKEND_API": JSON.stringify(Deno.env.get("BACKEND_API")),
  },
});
