export default function ({ app }) {
  return {
    icons: {
      iconfont: 'mdiSvg'
    },
    theme: {
      options: {
        minifyTheme (css) {
          return process.env.NODE_ENV === 'production'
            ? css.replace(/[\r\n|\r|\n]/g, '')
            : css
        }
      },
      themes: {
        light: {
          primary: '#394E9A',
          secondary: '#AEAFA9',
          success: '#22913B',
          error: '#D32F37'
        }
      }
    }
  }
}
