/// <reference types='vitest' />
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Load env file based on mode in the current directory
  const env = loadEnv(mode, process.cwd());

  
  return ({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/apps/frontend-customer',
  server: {
    port: 4200,
    host: 'localhost',
  },
  preview: {
    port: 4300,
    host: 'localhost',
  },
  plugins: [react()],
  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [ nxViteTsPaths() ],
  // },
  build: {
    outDir: './dist',
    emptyOutDir: true,
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
  // Make env variables available to the client
  define: {
    'import.meta.env.API_URL': JSON.stringify(process.env.API_URL || ''),
    'import.meta.env.BASE_URL': JSON.stringify(process.env.BASE_URL || ''),
    'import.meta.env.NODE_ENV': JSON.stringify(mode),
    'import.meta.env.PORT': JSON.stringify(process.env.PORT || ''),
  },
});
});
