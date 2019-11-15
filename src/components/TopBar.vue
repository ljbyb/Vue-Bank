<template>
  <v-toolbar
    color="elevation-0"
    flat
    max-height="48px"
  >
    <v-btn v-if="this.$route.path != '\/'" icon @click="goToHome">
      <v-icon>mdi-arrow-left</v-icon>
    </v-btn>

    <v-toolbar-title>{{titledesc}}</v-toolbar-title>

    <div class="flex-grow-1"></div>

    <v-btn icon>
      <v-icon>mdi-magnify</v-icon>
    </v-btn>

    <v-btn icon>
      <v-icon>mdi-dots-vertical</v-icon>
    </v-btn>
  </v-toolbar>
</template>

<script>
export default {
  name: 'TopBar',

  data () {
    return {
      ChannelTitle: [' ', '财富', '生活', '我的']
    }
  },

  computed: {
    titledesc () {
      return this.ChannelTitle[this.$store.state.ChannelID]
    }
  },

  methods: {
    goToHome: function () {
      if (this.$route.path !== '/') {
        this.$router.replace({ path: '/' })
      }
    }
  }
}
</script>

<style scoped>

</style>
