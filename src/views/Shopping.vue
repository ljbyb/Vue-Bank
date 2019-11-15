<template>
  <v-card class="overflow-hidden">
    <v-app-bar
      absolute
      color="#6A76AB"
      dark
      shrink-on-scroll
      prominent
      src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
      fade-img-on-scroll
      scroll-target="#scrolling-techniques-3"
    >
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          gradient="to top right, rgba(100,115,201,.7), rgba(25,32,72,.7)"
        ></v-img>
      </template>
      <v-toolbar-title>生活</v-toolbar-title>
      <div class="flex-grow-1"></div>
      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>

      <template v-slot:extension>
        <v-tabs
          align-with-title
          background-color="transparent"
          center-active
          grow
          show-arrows
        >
          <v-tab>缴费</v-tab>
          <v-tab>购物</v-tab>
          <v-tab>出行</v-tab>
          <v-tab>医疗</v-tab>
          <v-tab>餐饮</v-tab>
        </v-tabs>
      </template>
    </v-app-bar>
    <v-sheet
      id="scrolling-techniques-3"
      class="overflow-y-auto"
      max-height="600px"
    >

      <v-container style="height: 1000px;">

        <v-sheet height="200px"></v-sheet>
      </v-container>
    </v-sheet>
  </v-card>

</template>

<script>
export default {
  name: 'Shopping',
  data: () => ({
    loading: false,
    selection: 1
  }),

  methods: {
    reserve () {
      this.loading = true

      setTimeout(() => (this.loading = false), 2000)
    }
  }
}
</script>

<style scoped>

</style>
