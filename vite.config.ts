import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(path.dirname(fileURLToPath(import.meta.url)), 'src'),
      },
    },
    base: env.BASE_URL || '',
    server: {
      proxy: {
        '/api': {
          target: 'https://dev-mrp-services.herokuapp.com',
          changeOrigin: true,
          secure: false,
        },
      },
    },
  };
});
