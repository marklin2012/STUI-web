import { defineConfig } from 'dumi'

export default defineConfig({
  title: 'UK Design',
  favicon: '/images/logo.png',
  logo: '/images/logo.png',
  mode: 'site',
  outputPath: 'docs-dist',
  // more config: https://d.umijs.org/config
  menus: {
    '/component': [
      {
        title: '数据展示',
        children: ['/component/tag'],
      },
      {
        title: '反馈',
        children: ['/component/alert'],
      },
    ],
  },
  navs: [
    // null,
    {
      title: '文档',
      path: '/docs',
    },
    {
      title: '组件',
      path: '/component',
    },
  ],
})
