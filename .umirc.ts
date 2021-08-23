import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/', component: '@/pages/index' },
    { path: '/release/:pageId', component: '@/pages/release/[pageId]' },
  ],
  fastRefresh: {},
});
