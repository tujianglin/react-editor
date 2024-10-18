import react from '@vitejs/plugin-react';
import Unocss from 'unocss/vite';
import { defineConfig } from 'vite';

export default defineConfig(() => {
  return {
    base: './',
    plugins: [react(), Unocss()],
    resolve: {
      alias: {
        '@': '/src',
        '#': '/types',
      },
    },
    server: {
      host: true,
      port: 1211,
      proxy: {
        '/api': {
          target: 'http://192.168.3.100:8085',
          changeOrigin: true,
          ws: true,
          rewrite: (path) => path.replace(new RegExp(`^/api`), '/'),
        },
      },
    },
    // 入口
    build: {
      terserOptions: {
        compress: {
          //生产环境时移除console
          drop_console: true,
          drop_debugger: true,
        },
      },
    },
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
        },
      },
    },
  };
});
