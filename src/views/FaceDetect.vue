<template>
  <v-card min-height="100%">
    <!--顶层菜单-->
    <v-toolbar
      dark
      color="primary"
    >
      <v-btn icon @click="goToHome">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <v-toolbar-title>人脸检测</v-toolbar-title>
    </v-toolbar>

    <div id="facelogin">
<!--      <h1 class="title is-1">{{FaceisDetected}}</h1>-->
<!--       <p>{{FaceisDetected}}</p>-->
      <div class="content-cam">
        <div class="camera-wrp sec">
<!--          <video ref="videoDom" id="video_cam" preload autoplay loop muted></video>-->
<!--          <canvas ref="canvasDOM" id="face_detect"></canvas>-->
            <video class="video" width="320" height="240" ref="videoDom" id="video_cam" preload autoplay loop muted></video>
            <canvas width="320" height="240" ref="canvasDOM" ></canvas>
          <div class="control-btn"></div>
        </div>
        <div class="images-wrp sec">
           <p class="title is-5">Image taken</p>
          <div
            v-for="(image, index) in images"
            :class="`img-item img-item-${index}`"
            :key="`img-wrp-${index}`"
            :style="`height:240px; width: 320px; background: url('${image}')`"
          ></div>
        </div>
      </div>
    </div>

  </v-card>
</template>

<script>
require('tracking/build/tracking-min.js')
require('tracking/build/data/face-min.js')
require('tracking/build/data/mouth-min.js')
require('tracking/examples/assets/stats.min.js')

const axios = require('axios')
export default {
  name: 'FaceDetect',

  data () {
    return {
      faceSrc: new Image(),
      count: 0,
      isdetected: '请您保持脸部在画面中央',
      videoEl: {},
      canvasEL: {},
      images: [],
      trackCcv: false,
      trackTracking: false,
      autoCaptureTrackTraking: false,
      userMediaConstraints: {
        audio: false,
        video: {
          // ideal（应用最理想的）
          width: {
            min: 320,
            ideal: 1280,
            max: 1920
          },
          height: {
            min: 240,
            ideal: 720,
            max: 1080
          },
          // frameRate受限带宽传输时，低帧率可能更适宜
          frameRate: {
            min: 15,
            ideal: 30,
            max: 60
          },
          // 摄像头翻转
          facingMode: 'user'
        }
      }
    }
  },

  computed: {
    FaceisDetected () {
      return this.isdetected
    }
  },
  created () {
    this.changeView()
  },

  mounted () {
    // The getUserMedia interface is used for handling camera input.
    // Some browsers need a prefix so here we're covering all the options
    navigator.getMedia =
        navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia ||
        navigator.msGetUserMedia
    this.init()
  },
  methods: {
    async init () {
      this.videoEl = this.$refs.videoDom
      this.canvasEL = this.$refs.canvasDOM
      await navigator.mediaDevices
        .getUserMedia(this.userMediaConstraints)
        .then(this.getMediaStreamSuccess)
        .catch(this.getMediaStreamError)
      await this.onPlay()
    },
    async onPlay () {
      // debugHelper.log('onPlay')

      this.onTrackTracking()
    },
    changeView () {
      // this.setTitle('刷脸登陆')
      // this.setBackDisabled(false)
      // this.setBackIcon('arrow_back')
      // msgbus.vm.setBottomNavVisible(false)
      // msgbus.vm.setBottomBtnVisible(false)
      // msgbus.vm.setMsgInputVisible({ value: false })
    },

    onTrackTracking () {
      const context = this
      const video = this.videoEl
      const canvas = this.canvasEL
      const canvasContext = canvas.getContext('2d')
      let tracker = new tracking.ObjectTracker('face')

      // video.pause()
      // video.src = ''
      tracker.setInitialScale(4)
      tracker.setStepSize(2)
      tracker.setEdgesDensity(0.1)
      tracking.track('#video_cam', tracker, { camera: true })
      tracker.on('track', function (event) {
        const { autoCaptureTrackTraking } = context
        canvasContext.clearRect(0, 0, canvas.width, canvas.height)
        event.data.forEach(function ({ x, y, width, height }) {
          // 识别的人脸区域框颜色设置
          canvasContext.strokeStyle = '#DC143C'
          canvasContext.strokeRect(x, y, width, height)
          canvasContext.font = '11px Helvetica'
          canvasContext.fillStyle = '#fff'
          canvasContext.fillText('x: ' + x + 'x', x + width + 5, y + 11)
          canvasContext.fillText('y: ' + y + 'px', x + width + 5, y + 22)
          // context.onTakeCam()
          // console.log('detect face： x=' + x + ' y=' + y + ' width=' + width + ' height=' + height)
        })
        // event.data.forEach(function (rect) {
        //   plotRectangle(rect.x, rect.y, rect.width, rect.height)
        // })

        // if (!isEmpty(event.data) && context.count <= 10) {
        if (event.data.length !== 0 && context.count <= 10) {
          if (context.count < 0) {
            context.count = 0
          }
          context.count += 1
          console.log('已检测到人脸次数：' + context.count)
          // debugHelper.log(context.count)
          // 加入连续检测到人脸次数判断，主要是为了防止其它人脸飞入现象干扰
          if (context.count > 10) {
            context.isdetected = '已检测到人脸，正在登录'
            // context.$router.push({ name: 'pwdlogin' })
            //   context.onTakeCam()
            context.count = 0
          }
        } else {
          context.count -= 1
          if (context.count < 0) {
            context.isdetected = '请您保持脸部在画面中央'
          }
          // this.isdetected = '已检测到人脸，正在登录'
        }
      })
      var friends = [ 'Thomas Middleditch', 'Martin Starr', 'Zach Woods' ]
      var plotRectangle = function (x, y, w, h) {
        console.log('plotRectangle detect face： x=' + x + ' y=' + y + ' width=' + w + ' height=' + h)
        var rect = document.createElement('div')
        var arrow = document.createElement('div')
        var input = document.createElement('input')
        input.value = friends.pop()
        rect.onclick = function name () {
          input.select()
        }
        arrow.classList.add('arrow')
        rect.classList.add('rect')
        rect.appendChild(input)
        rect.appendChild(arrow)
        document.getElementById('video_cam').appendChild(rect)
        rect.style.width = w + 'px'
        rect.style.height = h + 'px'
        rect.style.left = (document.getElementById('video_cam').offsetLeft + x) + 'px'
        rect.style.top = (document.getElementById('video_cam').offsetTop + y) + 'px'
      }
    },
    onDownloadFile (item) {
      const link = document.createElement('a')
      link.href = item
      link.download = `cahyo-${new Date().toISOString()}.png`
      link.click()

      link.remove()
    },
    onTakeCam () {
      const canvas = document.createElement('canvas')
      const video = this.$el.querySelector('#video_cam')
      const canvasContext = canvas.getContext('2d')

      if (video.videoWidth && video.videoHeight) {
        const isBiggerW = video.videoWidth > video.videoHeight
        const fixVidSize = isBiggerW ? video.videoHeight : video.videoWidth
        let offsetLeft = 0
        let offsetTop = 0

        if (isBiggerW) offsetLeft = (video.videoWidth - fixVidSize) / 2
        else offsetTop = (video.videoHeight - fixVidSize) / 2

        // make canvas size 300px
        canvas.width = canvas.height = 300
        const { width, height } = canvas

        canvasContext.drawImage(
          video,
          offsetLeft,
          offsetTop,
          fixVidSize,
          fixVidSize,
          0,
          0,
          width,
          height
        )
        const image = canvas.toDataURL('image/png')
        this.images.push(image)

        console.log('detect face： offsetLeft=' + offsetLeft + ' offsetTop=' + offsetTop + ' fixVidSize=' + fixVidSize + ' fixVidSize=' +
            fixVidSize + ' width=' + width + ' height=' + height)
      }
    },
    onDetectFace (param, index) {
      const imgItem = document.querySelector(`.img-item-${index}`)
      const image = new Image()
      image.src = param

      const tracker = new tracking.ObjectTracker('face')
      tracker.setStepSize(1.7)
      tracking.track(image, tracker)

      tracker.on('track', function (event) {
        event.data.forEach(function (rect) {
          window.plot(rect.x, rect.y, rect.width, rect.height)
        })
      })

      window.plot = function (x, y, w, h) {
        const rect = document.createElement('div')
        document.querySelector(`.img-item-${index}`).appendChild(rect)
        rect.classList.add('rect')
        rect.style.width = w + 'px'
        rect.style.height = h + 'px'
        rect.style.left = x + 'px'
        rect.style.top = y + 'px'
        rect.style.border = '2px solid yellow'
        rect.style.position = 'absolute'
      }
    },
    getMediaStreamSuccess (stream) {
      window.stream = stream // make stream available to browser console
      this.videoEl.srcObject = stream
      // debugHelper.log('getMediaStreamSuccess1')
      // this.$store.commit('setVideoCanvasObject', this.videoEl)
      // debugHelper.log('getMediaStreamSuccess2')
    },
    // 视频媒体流失败
    getMediaStreamError (error) {
      alert('视频媒体流获取错误' + error)
    },

    // 结束媒体流
    stopMediaStreamTrack () {
      clearInterval(this.timeInterval)
      if (typeof window.stream === 'object') {
        this.videoEl.srcObject = null
        // this.$store.commit('setVideoCanvasObject', '')
        window.stream.getTracks().forEach(track => track.stop())
      }
    },

    goToHome () {
      this.$router.push('/')
    }
  },

  destroyed () {
    this.stopMediaStreamTrack()
  }
}
</script>

<style>
  /** {*/
  /*  padding: 0;*/
  /*  margin: 0;*/
  /*}*/
  /*.container {*/
  /*  position: relative;*/
  /*  width: 581px;*/
  /*  height: 436px;*/
  /*  float:left;*/
  /*}*/
  /*.message{*/
  /*  float:left;*/
  /*}*/
  /*video, #canvas {*/
  /*  position: absolute;*/
  /*  width: 581px;*/
  /*  height: 436px;*/
  /*}*/
  /*video, #canvas {*/
  /*  position: absolute;*/
  /*  width: 375px;*/
  /*  height: 812px;*/
  /*}*/
  /*#photo:hover .rect {*/
  /*  opacity: .75;*/
  /*  transition: opacity .75s ease-out;*/
  /*}*/
  /*.rect:hover * {*/
  /*  opacity: 1;*/
  /*}*/
  /*.rect {*/
  /*  border-radius: 2px;*/
  /*  border: 3px solid white;*/
  /*  box-shadow: 0 16px 28px 0 rgba(0, 0, 0, 0.3);*/
  /*  cursor: pointer;*/
  /*  left: -1000px;*/
  /*  opacity: 0;*/
  /*  position: absolute;*/
  /*  top: -1000px;*/
  /*}*/
  /*.arrow {*/
  /*  border-bottom: 10px solid white;*/
  /*  border-left: 10px solid transparent;*/
  /*  border-right: 10px solid transparent;*/
  /*  height: 0;*/
  /*  width: 0;*/
  /*  position: absolute;*/
  /*  left: 50%;*/
  /*  margin-left: -5px;*/
  /*  bottom: -12px;*/
  /*  opacity: 0;*/
  /*}*/
  /*input {*/
  /*  border: 0px;*/
  /*  bottom: -42px;*/
  /*  color: #a64ceb;*/
  /*  font-size: 15px;*/
  /*  height: 30px;*/
  /*  left: 50%;*/
  /*  margin-left: -90px;*/
  /*  opacity: 0;*/
  /*  outline: none;*/
  /*  position: absolute;*/
  /*  text-align: center;*/
  /*  width: 180px;*/
  /*  transition: opacity .35s ease-out;*/
  /*}*/
  /*#img {*/
  /*  position: absolute;*/
  /*  top: 50%;*/
  /*  left: 50%;*/
  /*  margin: -173px 0 0 -300px;*/
  /*}*/
  video, #canvas  {
    transform: translateX(-50%) translateY(-50%);
    top: 50%;
    left: 50%;
    min-width: 100%;
    min-height: 100%;
    width: auto;
    height: auto;
    position: absolute;
  }

</style>
