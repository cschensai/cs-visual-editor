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
  base: '/visual-editor',
  title: false,
  dynamicImport: {
    loading: '@/pages/components/EmptyComp',
  },
  // .babelrc or babel-loader option  实现css样式实现按需加载，自动加载css文件
  extraBabelPlugins: [['import', { libraryName: 'zarm', style: 'css' }]],
  fastRefresh: {},
  mfsu: {},
  webpack5: {},
});
