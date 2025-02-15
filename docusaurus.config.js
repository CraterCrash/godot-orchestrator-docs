// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

const baseUrl = process.env.BASE_URL || '/orchestrator/';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Orchestrator Documentation',
  tagline: 'Dinosaurs are cool',
  favicon: 'img/favicon.png',

  // Set the production url of your site here
  url: 'https://docs.cratercrash.space/',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: baseUrl,

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'Crater Crash Studios',
  projectName: 'godot-orchestrator',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'ru'],
    localeConfigs: {
      en: {
        label: 'English',
      },
      ru: {
        label: 'Russian',
      }
    }
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          routeBasePath: '/',
          editUrl:
            'https://github.com/CraterCrash/godot-orchestrator-docs/edit/main/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  /*themes: ['@docusaurus/theme-search-algolia'] */

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      //announcementBar: {
      //  id: 'support_us',
      //  content: 'We are looking for help improving our documentation!',
      //  backgroundColor: '#fafbfc',
      //  textColor: '#091e42',
      //  isCloseable: false,
      //},
      colorMode: {
        defaultMode: 'dark',
        disableSwitch: false,
      },
      navbar: {
        title: 'Orchestrator Documentation',
        hideOnScroll: false,
        logo: {
          alt: 'Crater Crash Studios',
          src: 'https://cdn.cratercrash.space/cdn-cgi/image/width=225/utG8NiO3oN8sfXvI2ZZ0zg/c2930b5d-09da-42c3-1eda-a91038c50e00/public',
        },
        items: [
          {
            type: 'search',
            position: 'right',
          },
          {
            type: 'localeDropdown',
            position: 'right',
          },
          {
            type: 'docsVersionDropdown',
            position: 'right',
            dropdownActiveClassDisabled: true,
          },
          {
            href: 'https://github.com/CraterCrash/godot-orchestrator',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [],
        copyright: `Copyright © ${new Date().getFullYear()} Crater Crash Studios, LLC.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
      algolia: {
        appId: 'QL8Q3PK57T',
        apiKey: 'a3801da6e3cb3ba273caa3b1fe4b9a5d',
        indexName: 'cratercrash',
        contextualSearch: true,
        insights: true
      }
    }),
};

export default config;
