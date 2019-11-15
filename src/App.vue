<template>
  <v-app>
<!--    <TopBar></TopBar>-->
    <v-content>
      <router-view></router-view>
    </v-content>
    <BottomBar></BottomBar>
  </v-app>
</template>

<script>
import TopBar from './components/TopBar'
import BottomBar from './components/BottomBar'
export default {
  name: 'App',
  components: {
    TopBar,
    BottomBar
  },
  data () {
    return {
    }
  }
}
</script>
