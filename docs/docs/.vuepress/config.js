module.exports = {
  title: '起源公共依赖库',
  description: '基于vue2.7的npm私库',
  base: process.argv[2] === 'dev' ? '/' : '/base-admin-package-docs/', // 这是部署到github相关的配置
  // base: '/',
  // base: '/dist-doc2.0/',
  // base: '/ue/2019/doc/vue-standard/dist/',
  markdown: {
    lineNumbers: false // 代码块显示行号
  },
  themeConfig: {
    search: true, // 是否开启搜索
    searchMaxSuggestions: 10, // 搜索最大条数
    // 侧边栏
    sidebar: {
      '/guide/': [
        {
          title: '基础',
          collapsable: false,
          children: [
            '/guide/',
          ]
        },
        {
          title: '如何使用',
          collapsable: false,
          children: ['/guide/import', '/guide/inject']
        },
        {
          title: '如何扩展',
          collapsable: false,
          children: ['/guide/develop']
        }
      ],
      '/components/': [
        {
          title: '组件',
          collapsable: false,
          children: ['/components/']
        },
        {
          title: '全局组件',
          collapsable: false,
          children: [
            '/components/svg-icon',
            '/components/com-table',
            '/components/com-form',
            '/components/com-search',
            '/components/com-dialog',
            '/components/com-detail'
          ]
        },
        {
          title: '普通组件',
          collapsable: false,
          children: [
            '/components/echart',
            '/components/preview',
            '/components/avatars',
            '/components/highlight',
            '/components/editor',
            '/components/qrcode',
            '/components/timer',
            '/components/marquee',
            // '/components/water-fall',
            '/components/tree-select',
            '/components/ellipsis'
          ]
        }
      ]
    },
    // 导航栏
    nav: [
      {
        text: '首页',
        link: '/'
      },
      {
        text: '指南',
        link: '/guide/'
      },
      {
        text: '功能组件',
        link: '/components/'
      },
      {
        text: '更新日志',
        link: '/changLog/changLog'
      },
      {
        text: '预览',
        link: 'http://8.133.179.48:4000/dist'
      },
      {
        text: 'Github',
        link: 'http://192.168.169.57:9000/scm/git/hzt-webdocs.git'
      }
    ]
  },
  plugins: [
    [
      'vuepress-plugin-typescript',
      {
        tsLoaderOptions: {
          // ts-loader 的所有配置项
        }
      }
    ]
  ]
}
