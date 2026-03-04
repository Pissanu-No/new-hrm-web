import { defineConfig,loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import pkg from './package.json' 
import ui from '@nuxt/ui/vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  return {
    plugins: [
      vue(),
      ui()
    ],
    define: {
      __APP_NAME__ : JSON.stringify(pkg.name),
      __APP_VERSION__: JSON.stringify(pkg.version)
    },
    server: {
      port: parseInt(env.VITE_PORT) || 3000,
    }, 
    resolve: { alias: { "@": path.resolve(__dirname, "src") } },
  };
});



