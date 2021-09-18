import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/', component: '@/pages/index' },
    { path: '/preview', component: '@/pages/preview' },
    { path: '/release/:pageId', component: '@/pages/release/[pageId]' },
  ],
  title: false,
  dynamicImport: {
    loading: '@/pages/components/EmptyComp',
  },
  fastRefresh: {},
  mfsu: {},
  webpack5: {},
});
