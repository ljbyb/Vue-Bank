<template>
  <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
    <!--入口按钮-->
    <template v-slot:activator="{ on }">
      <v-btn flat icon >
        <v-icon v-on="on">more_vert</v-icon>
      </v-btn>
    </template>

    <v-card>
      <!--顶部菜单-->
      <v-toolbar dark color="primary">
        <v-btn icon dark @click="dialog = false">
          <v-icon>close</v-icon>
        </v-btn>
        <v-toolbar-title>设置</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn dark flat @click="dialog = false">保存</v-btn>
        </v-toolbar-items>
      </v-toolbar>

      <v-list two-line subheader>
        <v-subheader>用户信息</v-subheader>
        <v-list-tile avatar>
          <v-list-tile-avatar @click="goToQrcode">
            <img :src="user.img">
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>{{welcome}}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
      <v-divider inset></v-divider>
      <v-list two-line subheader>
        <v-subheader>通用设置</v-subheader>
        <v-list-tile avatar>
          <v-list-tile-action>
            <v-checkbox v-model="notifications"></v-checkbox>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>消息推送</v-list-tile-title>
            <v-list-tile-sub-title>允许应用推版本更新等消息通知</v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile avatar>
          <v-list-tile-action>
            <v-checkbox v-model="sound"></v-checkbox>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>背景音乐</v-list-tile-title>
            <v-list-tile-sub-title>允许自动播放背景音乐</v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
      <v-divider inset></v-divider>
      <v-list>
        <v-list-tile avatar>
          <v-list-tile-action>
            <v-icon color="red">stars</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>我的收藏夹</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
      <v-divider inset></v-divider>
      <v-list>
        <v-list-tile avatar @click="goToAbout">
          <v-list-tile-action>
            <v-icon color="orange">info</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>关于</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'Settnigs',

  data: () => ({
    // 选项窗口参数
    dialog: false,
    notifications: false,
    sound: true,
    user: {
      name: '',
      img: 'https://cdn.vuetifyjs.com/images/lists/1.jpg'
    }
  }),

  computed: {
    welcome () {
      if (this.$store.state.name !== undefined) {
        return '您好，' + this.$store.state.name
      } else {
        return '您好，请登录！'
      }
    }
  },

  methods: {
    goToAbout () {
      this.$router.push('about')
    },
    goToQrcode () {
      this.$router.push('qrcode')
    }
  }
}
</script>

<style scoped>

</style>
