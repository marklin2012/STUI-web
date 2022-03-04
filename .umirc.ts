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
        title: '通用',
        children: ['/component/icon'],
      },
      {
        title: '数据展示',
        children: [
          '/component/avatar',
          '/component/badge',
          '/component/card',
          '/component/collapse',
          '/component/progress',
          '/component/tag',
          '/component/tooltip',
        ],
      },
      {
        title: '反馈',
        children: ['/component/alert'],
      },
      {
        title: '表单组件',
        children: ['./component/switch'],
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
