import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify)

export default new Vuetify({
  icons: {
    iconfont: 'mdi'
  },
  theme: {
    themes: {
      light: {
        primary: colors.grey.darken2,
        secondary: colors.grey.darken1,
        accent: colors.grey.lighten1
      }
    }
  }
})
