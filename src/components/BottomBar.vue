<template>
  <!--底部导航-->
  <v-bottom-navigation
    color="primary"
    fixed
    grow
    shift
    v-model="bottomNav"
  >
    <v-btn @click="goToHome">
      <span>首页</span>
      <v-icon>mdi-home</v-icon>
    </v-btn>

    <v-btn @click="goToWealth">
      <span>财富</span>
      <v-icon>mdi-currency-cny</v-icon>
    </v-btn>

    <v-btn @click="goToShopping">
      <span>生活</span>
      <v-icon>mdi-shopping</v-icon>
    </v-btn>

    <v-btn @click="goToUser">
      <span>我的</span>
      <v-icon>mdi-account</v-icon>
    </v-btn>

  </v-bottom-navigation>
</template>

<script>
export default {
  name: 'BottomBar',

  data () {
    return {
      bottomNav: this.$store.state.ChannelID
    }
  },

  methods: {
    goToHome: function () {
      if (this.$route.path !== '/') {
        this.$router.replace({ path: '/' })
        this.$store.dispatch('setChannelID', 0)
      }
    },
    goToWealth: function () {
      if (this.$route.path !== '/wealth') {
        this.$router.replace({ path: '/wealth' })
        this.$store.dispatch('setChannelID', 1)
      }
    },
    goToShopping: function () {
      if (this.$route.path !== '/shopping') {
        this.$router.replace({ path: '/shopping' })
        this.$store.dispatch('setChannelID', 2)
      }
    },
    goToUser: function () {
      if (this.$route.path !== '/user') {
        this.$router.replace({ path: '/user' })
        this.$store.dispatch('setChannelID', 3)
      }
    }
  }
}
</script>

<style scoped>

</style>
