<template>
  <v-layout row>
    <v-flex>
        <v-list three-line id="box" >
          <ul id="con1" ref="con1" :class="{anim:animate==true}">
            <v-list-item
              v-for="item in items"
            >
              <v-list-item-icon>
                <v-icon v-text="item.icon"></v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title v-html="item.title"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
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
          icon: 'mdi-chart-areaspline',
          title: '大金字塔内部中空'
        },
        {
          icon: 'mdi-chart-areaspline',
          title: '昆兰附近的一个新洞穴'
        },
        {
          icon: 'mdi-chart-areaspline',
          title: '来自伊拉克失落之城的巨量石板'
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
