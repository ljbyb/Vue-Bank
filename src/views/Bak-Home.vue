<template>
  <v-card>
    <!--顶层菜单区-->
    <v-toolbar
      absolute
      fixed
      :style="toolbarStyle"
      dark
      tabs
      flat
    >
      <UserLogin/>
      <v-toolbar-title >{{ nowDate | dateConvert}}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="setTheme">
        <v-icon v-if="sunmode">wb_sunny</v-icon>
        <v-icon v-else>brightness_3</v-icon>
      </v-btn>
      <v-btn icon @click="" >
        <v-icon>crop_free</v-icon>
      </v-btn>
      <Settings/>
      <v-btn icon @click="goToAbout" >
        <v-icon>info</v-icon>
      </v-btn>

      <!--频道栏标题-->
      <template v-slot:extension>
        <v-tabs
          v-model="active"
          centered
          background-color="transparent"
          slider-color="white"
          grow
        >
          <v-tab
            class="subheading"
            v-for="item in headerItems"
          >
            {{ item.title }}
          </v-tab>
        </v-tabs>
      </template>
    </v-toolbar>

    <!--展示返回顶部按钮-->
    <v-btn
      v-show="!hidden"
      :style="totopStyle"
      absolute
      dark
      fixed
      right
      style="bottom:20px;"
      text
      small
      v-on:click="toTop"
    >
      <v-icon>arrow_upward</v-icon>
    </v-btn>

    <!--内容显示区-->
    <v-layout row>
      <v-flex xs12>
        <v-card text>
          <v-img
            :src="headerItems[active].imgUrl"
            height="300px"
            gradient="to top, rgba(0,0,0,.33), rgba(0,0,0,.33)"
          >
            <!--图片注释区-->
            <v-layout pa-2 ma-2 column fill-height class="lightbox white--text">
              <v-spacer></v-spacer>
              <v-flex shrink>
                <div class="caption">{{headerItems[active].imgDesc}}</div>
              </v-flex>
            </v-layout>
          </v-img>

          <!--底线提示-->
          <BottomLine/>

        </v-card>
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>

export default {
  components: {
    UserLogin: () => import('../components/UserLogin'),
    Settings: () => import('../components/Settings'),
    BottomLine: () => import('../components/BottomLine')
  },
  data () {
    return {
      nowDate: new Date(),
      sunmode: true,
      active: 0,
      toolbarStyle: { background: 'rgba(30,144,255, 0)' },
      totopStyle: { background: 'rgba(0,0,0, 0.3)' },
      cardStyle: { background: 'rgba(0,0,0, 0.08)' },
      opacity: 1,
      reviews: 16580,
      hidden: true,
      headerItems: [
        {
          title: '存款',
          imgUrl: require('../assets/img/tabheader/greatwall2.jpg'),
          imgDesc: '中国，又称为中华、华夏、九州，因古代中国人认为天圆地方，中国位于正中，故而得名。中国是世界文明最早的发源地之一，长期是个独立的文明世界的中心，中华文化的传播，对周边国家产生了深远的影响。（背景：万里长城）'
        },
        {
          title: '理财',
          imgUrl: require('../assets/img/tabheader/egypt2.png'),
          imgDesc: '古埃及是四大文明古国之一，位于非洲东北部尼罗河中下游地区。古埃及文明形成于公元前4000年左右，古埃及前王朝开始于公元前3100年左右时美尼斯统一上下埃及建立第一王朝，终止于公元前30年罗马征服埃及托勒密王朝。（背景：金字塔）'
        },
        {
          title: '基金',
          imgUrl: require('../assets/img/tabheader/roma.png'),
          imgDesc: '古罗马指从公元前9世纪初在意大利半岛中部兴起的文明,先后经历罗马王政时代、罗马共和国、罗马帝国三个阶段。始于公元前754年左右，结束于东罗马帝国（即拜占庭帝国）在1453年被奥斯曼帝国所灭。（背景：罗马斗兽场）'
        },
        {
          title: '黄金',
          imgUrl: require('../assets/img/tabheader/greece4.jpg'),
          imgDesc: '古希腊是指古代巴尔干半岛南部、爱琴海诸岛和小亚细亚沿岸的总称，是西方文明的源头之一。古希腊文明持续了约650年，是西方文明最重要和直接的渊源，时间从公元前8世纪的古风时期至公元前146年被罗马共和国征服为止。（背景：帕特农神庙）'
        }
      ],
      dataItems: [1, 2, 3, 4]
    }
  },

  mounted () {
    // 给window添加一个滚动滚动监听事件
    window.addEventListener('scroll', this.handleScroll.bind(this))
  },

  methods: {
    swipe (direction) {
      if (this.active + direction < this.headerItems.length && this.active + direction >= 0) { this.active = this.active + direction }
    },
    // 改变头部的渐变颜色、是否显示“返回顶端”按钮
    handleScroll () {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      this.hidden = scrollTop < 60
      if (scrollTop <= 200) {
        this.opacity = scrollTop / 200
        this.toolbarStyle = { background: `rgba(30,144,255, ${this.opacity})` }
      } else {
        this.toolbarStyle = { background: 'rgba(30,144,255)' }
      }
    },
    setTheme () {
      this.sunmode = !this.sunmode
      // this.$store.dispatch('setTheme', !this.sunmode)
      this.$vuetify.theme.dark = !this.sunmode
    },
    goToDetail (tab, index1, index2) {
      this.$router.push({ path: '/detail', query: { tab: tab, index1: index1, index2: index2 } })
    },
    goToQrcodeScan () {
      this.$router.push({ path: '/qrcodescan' })
    },
    goToAbout () {
      this.$router.push({ path: '/about' })
    },
    toTop () {
      window.scroll({ top: 0, left: 0, behavior: 'smooth' })
    }
  },

  filters: {
    // 状态标题转换为中文
    dateConvert: (now) => {
      let mm = now.getMonth() + 1
      let dd = now.getDate()
      return mm + '月' + dd + '日'
    }
  },

  destroyed () {
    // 离开该页面需要移除这个监听的事件
    window.removeEventListener('scroll', this.handleScroll)
  }
}
</script>
