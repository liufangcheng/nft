import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgrPlugin from '@arco-plugins/vite-plugin-svgr';
import vitePluginForArco from '@arco-plugins/vite-react';
import setting from './src/settings.json';

// https://vitejs.dev/config/

export default defineConfig({
  resolve: {
    alias: [{ find: '@', replacement: '/src' }],
  },
  base: './',
  server: {
    https: false,
    // proxy: {
    //   '/api': {
    //     target: 'http://infodoxx.co',
    //     changeOrigin: true,
    //     rewrite: (path) => path.replace(/^\/api/, ''),
    //   },
    // },
  },
  plugins: [
    react(),
    svgrPlugin({
      svgrOptions: {},
    }),
    vitePluginForArco({
      theme: '@arco-themes/react-arco-pro',
      modifyVars: {
        'color-bg-2': '#1C1E22',
      },
    }),
  ],
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
});
