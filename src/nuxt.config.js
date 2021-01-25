const webpack = require('webpack')

export default {
  ssr: false, // spa - false
  /*
  ** Headers of the page
  */
  head: {
    titleTemplate: process.env.npm_package_description + ': %s',
    title: process.env.npm_package_description || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', type: 'text/css', href: 'https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900&amp;display=swap' }
    ]
  },
  /**
   * Environment
   */
  env: {
    VERSION: require('./package.json').version
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#CF8048' },
  /**
   * Server options
   */
  server: {
    port: 80,
    host: '0.0.0.0',
    timing: false
  },
  /*
  ** Global CSS
  */
  css: [
    '~/assets/main.css'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/axios.js',
    { src: '~/plugins/veevalidate.js', ssr: false }
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    '@nuxtjs/vuetify',
    ['@nuxtjs/eslint-module', { fix: process.env.NODE_ENV !== 'production' }]
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios'
  ],

  /*
  ** vuetify module configuration
  ** https://github.com/nuxt-community/vuetify-module
  */
  vuetify: {
    treeShake: {
      loaderOptions: {
        match (originalTag, { kebabTag, camelTag, path, component }) {
          if (kebabTag.startsWith('my-')) {
            const names = kebabTag.split('-')
            const componentDir = `My${names[1].charAt(0).toUpperCase()}${names[1].slice(1)}`
            const componentName = camelTag.slice(componentDir.length)
            const importComponent = `import ${camelTag} from
              '@/components/${componentDir}/${componentName}.vue'`

            return [camelTag, importComponent]
          }
        }
      }
    },
    customVariables: ['~/assets/vuetify-custom-variables.scss'],
    defaultAssets: false,
    optionsPath: './vuetify.options.js'
  },
  /*
  ** Build configuration
  */
  build: {
    extractCSS: {
      ignoreOrder: true
    },
    optimizeCSS: true,
    filenames: {
      chunk: ({ isDev }) => isDev ? '[name].js' : '[contenthash].js'
    },
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  },
  transpile: ['vee-validate/dist/rules']
}
