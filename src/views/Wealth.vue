<template>
  <v-card flat>
    <v-toolbar
      color="primary"
      dark
    >
<!--      <v-app-bar-nav-icon></v-app-bar-nav-icon>-->
      <v-toolbar-title>财富</v-toolbar-title>
      <div class="flex-grow-1"></div>
      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-toolbar>

    <!--通知信息-->
    <v-banner
      sticky
      single-line
      icon="mdi-bullhorn"
      icon-color="orange"
      v-if="notice"
    >
      {{notice}}
<!--      <template v-slot:actions>-->
<!--        <v-btn-->
<!--          text-->
<!--          color="deep-purple accent-4"-->
<!--        >-->
<!--          <v-icon>mdi-close</v-icon>-->
<!--        </v-btn>-->
<!--      </template>-->
    </v-banner>

    <!--资产汇总信息-->
    <v-expansion-panels>
      <v-expansion-panel>
        <v-expansion-panel-header>
          <v-row no-gutters>
            <v-col cols="6">
              <v-col cols="12">总资产(元)</v-col>
              <v-col cols="12" class="title blue--text">125707.81</v-col>
            </v-col>
            <div class="flex-grow-1"></div>
            <v-col cols="6">
              <v-col cols="12" class="d-flex flex-row-reverse">昨日收益</v-col>
              <v-col cols="12" class="title red--text d-flex flex-row-reverse">+2.36</v-col>
            </v-col>
          </v-row>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-row no-gutters>
            <template v-for="n in 4">
              <v-col :key="n">
                <v-card
                  class="pa-2"
                  outlined
                  tile
                  flat
                >
                  Column
                </v-card>
              </v-col>
              <v-responsive
                v-if="n === 2"
                :key="`width-${n}`"
                width="100%"
              ></v-responsive>
            </template>
          </v-row>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>

    <!--常用菜单-->
<!--    <v-row justify="space-around">-->
<!--      <v-col align="center" cols="3">-->
<!--        <v-icon color="orange darken-2">mdi-cash-multiple</v-icon>-->
<!--        <div>现金</div>-->
<!--      </v-col>-->

<!--      <v-col align="center" cols="3">-->
<!--        <v-icon color="orange darken-2">mdi-square-inc-cash</v-icon>-->
<!--        <div>外汇</div>-->
<!--      </v-col>-->

<!--      <v-col align="center" cols="3">-->
<!--        <v-icon color="orange darken-2">mdi-podium-gold</v-icon>-->
<!--        <div>黄金</div>-->
<!--      </v-col>-->

<!--      <v-col align="center" cols="3">-->
<!--        <v-icon color="orange darken-2">mdi-database-plus</v-icon>-->
<!--        <div>理财</div>-->
<!--      </v-col>-->

<!--      <v-col align="center" cols="3">-->
<!--        <v-icon color="blue darken-2">mdi-vector-polyline</v-icon>-->
<!--        <div>基金</div>-->
<!--      </v-col>-->

<!--      <v-col align="center" cols="3">-->
<!--        <v-icon color="blue darken-2">mdi-trending-up</v-icon>-->
<!--        <div>股票</div>-->
<!--      </v-col>-->

<!--      <v-col align="center" cols="3">-->
<!--        <v-icon color="blue darken-2">mdi-monitor-dashboard</v-icon>-->
<!--        <div>期货</div>-->
<!--      </v-col>-->

<!--      <v-col align="center" cols="3">-->
<!--        <v-icon color="blue darken-2">mdi-view-grid-plus</v-icon>-->
<!--        <div>更多</div>-->
<!--      </v-col>-->
<!--    </v-row>-->

    <v-layout>
      <v-flex>
        <v-card align="center">
          <!--          <v-card class="card&#45;&#45;flex-toolbar">-->
          <v-container fluid>
            <v-layout row wrap >
              <v-flex xs3 sm3 md3 order-md4 order-sm1 v-for="item in menus">
                <v-card dark tile flat color="deep-orange darken-1">
                  <v-card-text>
                    <v-icon>{{item.icon}}</v-icon>
                    <div>{{item.desc}}</div>
                  </v-card-text>
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>

          <v-divider></v-divider>

          <v-card-text style="height: 40px;">
            <div>
              {{marketData[0].market}}
              {{marketData[0].name}}
              {{marketData[0].score}}
              {{marketData[0].change}}
              {{marketData[0].rate}}
              {{marketData[0].state}}
            </div>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>

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
        v-for="(slide, i) in slides"
        :key="i"
      >
        <v-sheet
          :color="colors[i]"
          height="100%"
        >
          <v-row
            class="fill-height"
            align="center"
            justify="center"
          >
            <v-card
              class="mx-auto"
              max-width="400"
            >
              <v-img
                class="white--text"
                height="100px"
                src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
              >
                <v-card-title class="align-end fill-height">{{ slide }} Slide</v-card-title>
              </v-img>

              <v-card-text>
                <span>Number 10</span><br>
                <span class="text--primary">
                  <span>Whitehaven Beach</span><br>
                  <span>Whitsunday Island, Whitsunday Islands</span>
                </span>
              </v-card-text>

              <v-card-actions>
                <v-btn
                  text
                  color="orange"
                >
                  Share
                </v-btn>
                <v-btn
                  text
                  color="orange"
                >
                  Explore
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-row>
        </v-sheet>
      </v-carousel-item>
    </v-carousel>

  </v-card>
</template>

<script>
export default {
  name: 'Wealth',
  data () {
    return {
      date: null,
      notice: 'This is a message from our data-center, please attention to do it!',
      trip: {
        name: '',
        location: null,
        start: null,
        end: null
      },
      animate: false,
      marketData: [
        {
          market: 'A股',
          name: '上证指数',
          score: 2822.09,
          change: -73.02,
          rate: -0.0248,
          state: '闭市'
        },
        {
          market: '美股',
          name: '道琼斯',
          score: 25764.00,
          change: -98.68,
          rate: -0.0038,
          state: '闭市'
        },
        {
          market: '港股',
          name: '恒生指数',
          score: 22946.46,
          change: -328.61,
          rate: -0.0116,
          state: '闭市'
        }
      ],
      colors: [
        'indigo',
        'warning',
        'pink darken-2',
        'red lighten-1',
        'deep-purple accent-4'
      ],
      slides: [
        'First',
        'Second',
        'Third',
        'Fourth',
        'Fifth'
      ],
      menus: [
        { icon: 'mdi-cash-multiple', desc: '现金' },
        { icon: 'mdi-currency-usd', desc: '外汇' },
        { icon: 'mdi-podium-gold', desc: '黄金' },
        { icon: 'mdi-database-plus', desc: '理财' },
        { icon: 'mdi-vector-polyline', desc: '基金' },
        { icon: 'mdi-trending-up', desc: '股票' },
        { icon: 'mdi-monitor-dashboard', desc: '期货' },
        { icon: 'mdi-view-grid-plus', desc: '更多' }
      ]
    }
  },

  created () {
    setInterval(this.showMarquee, 2000)
  },

  methods: {
    goToHome: function () {
      this.$router.push('/')
    },
    showMarquee: function () {
      this.animate = true

      setTimeout(() => {
        this.marketData.push(this.marketData[0])
        this.marketData.shift()
        this.animate = false
      }, 500)
    }
  }
}
</script>

<style scoped>
  .card--flex-toolbar {
    margin-top: -80px;
  }
  /*div, ul, li, span, img {*/
  /*  margin: 0;*/
  /*  padding: 0;*/
  /*  display: flex;*/
  /*  box-sizing: border-box;*/
  /*}*/

  /*.marquee {*/
  /*  width: 100%;*/
  /*  height: 50px;*/
  /*  align-items: center;*/
  /*  color: #3A3A3A;*/
  /*  background-color: #b3effe;*/
  /*  display: flex;*/
  /*  box-sizing: border-box;*/
  /*}*/

  /*.marquee_title {*/
  /*  padding: 0 20px;*/
  /*  height: 30px;*/
  /*  font-size: 14px;*/
  /*  border-right: 1px solid #d8d8d8;*/
  /*  align-items: center;*/
  /*}*/

  /*.marquee_box {*/
  /*  display: block;*/
  /*  position: relative;*/
  /*  width: 60%;*/
  /*  height: 30px;*/
  /*  overflow: hidden;*/
  /*}*/

  /*.marquee_list {*/
  /*  display: block;*/
  /*  position: absolute;*/
  /*  top: 0;*/
  /*  left: 0;*/
  /*}*/

  /*.marquee_top {*/
  /*  transition: all 0.5s;*/
  /*  margin-top: -30px*/
  /*}*/

  /*.marquee_list li {*/
  /*  height: 30px;*/
  /*  line-height: 30px;*/
  /*  font-size: 14px;*/
  /*  padding-left: 20px;*/
  /*}*/

  /*.marquee_list li span {*/
  /*  padding: 0 2px;*/
  /*}*/

  .red {
    color: #FF0101;
  }
</style>
