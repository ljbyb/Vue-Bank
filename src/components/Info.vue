<template>
  <v-layout row>
    <v-flex>
        <v-list three-line id="box" >
          <ul id="con1" ref="con1" :class="{anim:animate==true}">
            <v-list-tile
              v-for="(item, index) in items"
              @click=""
            >
              <v-list-tile-avatar>
                <img :src="item.avatar">
              </v-list-tile-avatar>

              <v-list-tile-content>
                <v-list-tile-title v-html="item.title"></v-list-tile-title>
                <v-list-tile-sub-title v-html="item.subtitle"></v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </ul>
        </v-list>
    </v-flex>
  </v-layout>
</template>

<script>

export default {
  data () {
    return {
      animate: false,
      items: [
        {
          avatar: require('../assets/img/info/大金字塔内部中空.png'),
          title: '大金字塔内部中空',
          subtitle: "<span class='text--primary'>埃及</span> &mdash; 在2019年，我们有望获得更多关于吉萨大金字塔内所谓的大走廊上方发现的巨大空间的信息"
        },
        {
          avatar: require('../assets/img/info/昆兰附近的一个新洞穴.png'),
          // title: 'Summer BBQ <span class="grey--text text--lighten-1">4</span>',
          title: '昆兰附近的一个新洞穴',
          subtitle: "<span class='text--primary'>以色列</span> &mdash; 2019年，我们希望可以在昆兰附近找到尚未发现却存有古卷的山洞"
        },
        {
          avatar: require('../assets/img/info/来自伊拉克失落之城的巨量石板.png'),
          title: '来自伊拉克失落之城的巨量石板',
          subtitle: "<span class='text--primary'>伊拉克</span> &mdash; 在美国可能会破解一批来自伊拉克失落之城Irisagrig的1400片石板。它们被发现在一个匿名私人收藏名下"
        },
        {
          avatar: require('../assets/img/info/复活节彩蛋.png'),
          title: '复活节彩蛋',
          subtitle: "<span class='text--primary'>俄罗斯</span> &mdash; 1885年至1916年间，珠宝公司费伯奇(Faberge)为俄罗斯皇室制作了大约50个装饰华丽的复活节彩蛋。在1917年俄国革命之后，其中一些彩蛋失踪了。2019年我们可能会看到其中一个失踪的彩蛋浮出水面。"
        },
        {
          avatar: require('../assets/img/info/胡夫莎草纸.png'),
          title: '胡夫莎草纸',
          subtitle: "<span class='text--primary'>埃及</span> &mdash; 2013年，在红海旁的Wadi al-Jarf遗址工作的考古学家宣布，他们发现了距今约4500年，可追溯到建造大金字塔的法老胡夫(Khufu)的统治时期纸莎草纸。2019年，我们可能会更多地了解目前正在破译和分析的日志的其他部分。"
        }
      ]
    }
  },
  created () {
    setInterval(this.scroll, 2000)
  },
  methods: {
    scroll () {
      // 因为在消息向上滚动的时候需要添加css3过渡动画，所以这里需要设置true
      this.animate = true
      // 这里直接使用了es6的箭头函数，省去了处理this指向偏移问题，代码也比之前简化了很多
      setTimeout(() => {
        // 将数组的第一个元素添加到数组的尾部
        this.items.push(this.items[0])
        // 删除数组的第一个元素
        this.items.shift()
        // margin-top 为0 的时候取消过渡动画，实现无缝滚动
        this.animate = false
      }, 1000)
    }
  }
}
</script>

<style>
  #box{
    /*width: 300px;*/
    height: 95px;
    overflow: hidden;
    /*padding-left: 30px;*/
    /*border: 1px solid black;*/
    /*background-color: AliceBlue*/
  }
  .anim{
    transition: all 1s;
    margin-top: -90px;
  }
  #con1 li{
    list-style: none;
    line-height: 95px;
    height: 95px;
  }
</style>
