import { defineConfig } from 'dumi'

export default defineConfig({
  title: 'UK Design',
  favicon: '/images/logo.png',
  logo: '/images/logo.png',
  mode: 'site',
  outputPath: 'docs-dist',
  base: '/STUI-web',
  publicPath: '/STUI-web/',
  exportStatic: {},
  // more config: https://d.umijs.org/config
  menus: {
    '/component': [
      {
        title: '通用',
        children: ['/component/button', '/component/icon'],
      },
      {
        title: '导航',
        children: [
          './component/breadcrumb',
          './component/dropdown',
          './component/pagination',
          './component/menu',
          './component/steps',
          './component/tabs',
        ],
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
        children: [
          '/component/alert',
          '/component/drawer',
          '/component/modal',
          '/component/notification',
        ],
      },
      {
        title: '表单组件',
        children: [
          './component/cascader',
          './component/checkbox',
          './component/input',
          './component/radio',
          './component/rate',
          './component/select',
          './component/slider',
          './component/switch',
          './component/timePicker',
          './component/datePicker',
        ],
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
