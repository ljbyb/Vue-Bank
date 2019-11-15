<template>
  <v-card class="overflow-hidden">
    <v-app-bar
      color="primary"
      dark
      shrink-on-scroll
      prominent
      src="https://picsum.photos/id/1031/400/900"
      fade-img-on-scroll
      scroll-target="#scrolling-techniques-5"
      scroll-threshold="500"
    >
<!--      <template v-slot:img="{ props }">-->
<!--        <v-img-->
<!--          v-bind="props"-->
<!--        ></v-img>-->
<!--      </template>-->
      <v-app-bar-nav-icon>
        <v-icon>mdi-home-city</v-icon>
      </v-app-bar-nav-icon>
<!--      <v-toolbar-title>首页</v-toolbar-title>-->
      <div class="flex-grow-1"></div>
      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-app-bar>

    <v-sheet
      id="scrolling-techniques-5"
      class="overflow-y-auto"
      max-height="700"
      color="transparent"
    >
      <v-container style="height: 1500px;">
        <v-layout row wrap >
          <v-flex xs3 sm3 md3 order-md4 order-sm1 v-for="item in menus">
            <v-card color="transparent" tile flat align="center">
              <v-card-text>
                <v-icon>{{item.icon}}</v-icon>
                <div>{{item.desc}}</div>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>

        <v-divider></v-divider>

        <!--轮播广告-->
        <v-carousel
          cycle
          height="200"
          hide-delimiter-background
          :show-arrows="false"
          interval="2000"
          delimiter-icon="mdi-circle-medium"
        >
          <v-carousel-item
            v-for="(item, i) in slides"
            :key="i"
          >
            <v-sheet
              color="transparent"
              height="100%"
            >
              <v-row
                class="fill-height"
                align="center"
                justify="center"
              >
                <v-card
                  :color='item.color'
                  class="mx-auto"
                  max-width="344"
                  outlined
                >
                  <v-list-item three-line>
                    <v-list-item-content>
                      <v-list-item-title class="title mb-1">
                        <v-icon>mdi-share-variant</v-icon>
                        {{item.desc}}
                      </v-list-item-title>
                      <v-list-item-subtitle>Greyhound divisely hello coldly fonwderfully</v-list-item-subtitle>
                    </v-list-item-content>

                    <v-list-item-avatar
                      tile
                      size="80"
                      color="grey"
                    >
                      <v-img :src="item.img"></v-img>
                    </v-list-item-avatar>
                  </v-list-item>

                  <v-card-actions>
<!--                    <v-btn text>Button</v-btn>-->
<!--                    <v-btn text>Button</v-btn>-->
                    <v-chip
                      class="ma-2"
                      close
                      color="white"
                      outlined
                    >
                      <v-icon left>mdi-fire</v-icon>
                      New Posts Available
                    </v-chip>
                  </v-card-actions>
                </v-card>
              </v-row>
            </v-sheet>
          </v-carousel-item>
        </v-carousel>

      </v-container>
    </v-sheet>
  </v-card>
</template>

<script>
export default {
  data () {
    return {
      menus: [
        { icon: 'mdi-cash-multiple', desc: '现金' },
        { icon: 'mdi-currency-usd', desc: '外汇' },
        { icon: 'mdi-podium-gold', desc: '黄金' },
        { icon: 'mdi-database-plus', desc: '理财' },
        { icon: 'mdi-vector-polyline', desc: '基金' },
        { icon: 'mdi-trending-up', desc: '股票' },
        { icon: 'mdi-monitor-dashboard', desc: '期货' },
        { icon: 'mdi-view-grid-plus', desc: '更多' }
      ],
      colors: [
        'transparent',
        'transparent',
        'pink darken-2',
        'red lighten-1',
        'deep-purple accent-4'
      ],
      slides: [
        { color: 'red', img: 'https://cdn.vuetifyjs.com/images/cards/halcyon.png', desc: '标题1' },
        { color: 'purple', img: 'https://cdn.vuetifyjs.com/images/cards/halcyon.png', desc: '标题2' },
        { color: 'blue', img: 'https://cdn.vuetifyjs.com/images/cards/halcyon.png', desc: '标题3' },
        { color: 'green', img: 'https://cdn.vuetifyjs.com/images/cards/halcyon.png', desc: '标题3' },
        { color: 'orange', img: 'https://cdn.vuetifyjs.com/images/cards/halcyon.png', desc: '标题4' },
      ]
    }
  }
}
</script>

<style>

</style>
