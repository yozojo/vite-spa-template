import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import svgr from 'vite-plugin-svgr';
import vitePluginImp from 'vite-plugin-imp';
import legacy from '@vitejs/plugin-legacy';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    reactRefresh(),
    resolve(),
    commonjs(),
    svgr(),
    vitePluginImp({
      libList: [
        {
          libName: 'antd',
          style: (name) => `antd/es/${name}/style`,
          libDirectory: 'es',
        },
      ],
    }),
    legacy({
      targets: ['ie >= 11'],
      additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      Components: path.resolve(__dirname, 'src/components'),
      Pages: path.resolve(__dirname, 'src/pages'),
      Http: path.resolve(__dirname, 'src/http'),
      Assets: path.resolve(__dirname, 'src/assets'),
      Utils: path.resolve(__dirname, 'src/utils'),
    },
  },
  css: {
    modules: {
      scopeBehaviour: 'local',
      localsConvention: 'camelCase',
    },
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
    postcss: {
      plugins: [
        require('autoprefixer'),
        require('postcss-nesting'),
        require('postcss-preset-env'),
      ],
    },
  },

  server: {
    port: 8089,
    open: true,
    // proxy: {}
  },
});
