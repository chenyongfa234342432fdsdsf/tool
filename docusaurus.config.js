// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github')
const darkCodeTheme = require('prism-react-renderer/themes/dracula')

const math = require('remark-math')
const katex = require('rehype-katex')

/** 剔除 tree 的某些枝干 (label==='false') */
function filterSidebarItems(items, result) {
  items.forEach(item => {
    const hasChild = item.items?.length
    const resItem = hasChild ? { ...item, items: [] } : item
    /** 删除指定 label==='false' */
    if (item.label === 'false') {
      if (hasChild) {
        item.items.forEach(it => {
          result.push(it)
        })
      }
    } else {
      result.push(resItem)
    }

    if (hasChild) {
      filterSidebarItems(item.items, resItem.items)
    }
  })
}
/**
 * 指定 key 删除默认生成的侧边栏
 */
function delDefaultSidebarItems(items) {
  const result = []
  filterSidebarItems(items, result)
  return result
}
const config = {
  title: 'Markcoin 前端文档服务',
  tagline: 'Dinosaurs are cool',
  url: 'https://your-docusaurus-test-site.com',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'facebook', // Usually your GitHub org/user name.
  projectName: 'docusaurus', // Usually your repo name.

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          path: 'packages',
          // routeBasePath: 'packages',
          sidebarPath: require.resolve('./sidebars.js'),
          exclude: ['**/node_modules', 'node_modules', '**/tradingview'],
          // Please change this to your repo.
          // editUrl: 'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
          remarkPlugins: [math],
          rehypePlugins: [katex],
          async sidebarItemsGenerator({ defaultSidebarItemsGenerator, ...args }) {
            const sidebarItems = await defaultSidebarItemsGenerator(args)
            return delDefaultSidebarItems(sidebarItems)
          },
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // editUrl:
          //   'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
          remarkPlugins: [math],
          rehypePlugins: [katex],
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
          remarkPlugins: [math],
          rehypePlugins: [katex],
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      algolia: {
        // The application ID provided by Algolia
        appId: 'KNNARKX1RZ',

        // Public API key: it is safe to commit it
        apiKey: 'cb1b3d1955fbf8f0a550fec448b13d57',

        indexName: 'new-index-1650942090',

        // Optional: see doc section below
        contextualSearch: true,

        // Optional: Specify domains where the navigation should occur through window.location instead on history.push. Useful when our Algolia config crawls multiple documentation sites and we want to navigate with window.location.href to them.
        externalUrlRegex: 'http://18.183.174.7:3002/',

        // Optional: Algolia search parameters
        searchParameters: {},

        // Optional: path for search page that enabled by default (`false` to disable it)
        searchPagePath: 'search',

        // ... other Algolia params
      },
      navbar: {
        title: 'Markcoin',
        logo: {
          alt: 'My Site Logo',
          src: 'img/logo.jpeg',
        },
        items: [
          {
            position: 'left',
            label: '文档服务',
            href: 'https://doc.nbttfc365.com/docs/intro/',
          },
          { type: 'doc', docId: 'home', position: 'left', label: '组件库文档' },
          {
            href: 'https://gitlab.nbttfc365.com/fe/core/doc',
            label: 'GitLab',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Tutorial',
                href: 'https://doc.nbttfc365.com/docs/intro/',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Stack Overflow',
                href: 'https://stackoverflow.com/questions/tagged/docusaurus',
              },
              {
                label: 'Discord',
                href: 'https://discordapp.com/invite/docusaurus',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/docusaurus',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/facebook/docusaurus',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Markcoin.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
}

module.exports = config
