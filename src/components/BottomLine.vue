<template>
  <v-layout align-center>
    <v-flex xs4>
      <v-divider class="left-divider-position"></v-divider>
    </v-flex>
    <v-flex xs4>
      <div class="text-xs-center grey--text caption font-weight-light">底线还是要有的！</div>
    </v-flex>
    <v-flex xs4>
      <v-divider class="rigth-divider-position"></v-divider>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: 'BottomLine'
}
</script>

<style scoped>
  .rigth-divider-position {
    margin: 20px 60px 20px 0px;
  }
  .left-divider-position {
    margin: 20px 0px 20px 60px;
  }
</style>
