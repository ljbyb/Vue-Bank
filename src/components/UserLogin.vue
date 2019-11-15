<template>

<!--  <div id="app" >-->
<!--    <v-app id="inspire" v-model="dialog">-->
  <v-dialog v-model="dialog" persistent max-width="300px">
    <template v-slot:activator="{ on }">
<!--      <v-btn flat icon >-->
<!--        <v-icon v-on="on">account_circle</v-icon>-->
<!--      </v-btn>-->
    <v-avatar v-if="logined">
      <v-icon v-on="on">account_circle</v-icon>
    </v-avatar>

    <v-avatar  v-if="!logined">
      <img
        src="https://cdn.vuetifyjs.com/images/john.jpg"
        alt="John"
        v-on="on"
      >
    </v-avatar>
    </template>
<!--      <v-snackbar v-model="snackbar" :timeout="4000" bottom color="error">-->
<!--        <span>{{resultinfo}}</span>-->
<!--        <v-btn flat color="white" @click="snackbar = false">Close</v-btn>-->
<!--      </v-snackbar>-->

      <v-content v-if="dialog">
        <v-container fluid fill-height>
          <v-layout align-center justify-center>
            <v-flex xs12 sm8 md4>

              <v-card class="elevation-10">
                <v-toolbar dark color="primary">
                  <v-toolbar-title v-if="login">Sign in</v-toolbar-title>
                  <v-toolbar-title v-if="!login">Welcome</v-toolbar-title>
                  <v-spacer></v-spacer>
                  <v-btn icon @click="quit">
                    <v-icon>close</v-icon>
                  </v-btn>
                </v-toolbar>
                <v-card-text>
                  <p class="text-xs-center primary--text" @click="login=true" v-if="!login"><a>Already have an account? Sign in</a></p>
                  <p class="text-xs-center primary--text" @click="login=false" v-if="login"><a>Don't have an account? Sign up</a></p>
                  <v-form @submit.prevent="login? signin() : signup()" id="login-form">
                    <v-text-field prepend-icon="person" name="name" v-model="name" label="Name" type="text" :rules="nameRules" ></v-text-field>
                    <v-text-field prepend-icon="email" name="email" v-model="email" label="Email" type="text" :rules="emailRules" v-if="!login" ></v-text-field>
                    <v-text-field prepend-icon="lock" name="password" v-model="password" label="Password" id="password" type="password" :rules="passwordRules" ></v-text-field>
                  </v-form>
<!--                  <p class="text-xs-center red&#45;&#45;text"  v-if="snackbar"><a>{{resultinfo}}</a></p>-->
                  <span class="red--text" v-if="snackbar">{{resultinfo}}</span>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" v-if="login" type="submit" form="login-form" :loading="loading">Login</v-btn>
                  <v-btn color="primary" v-if="!login" type="submit" form="login-form" :loading="loading">Sing up</v-btn>
                </v-card-actions>
              </v-card>

            </v-flex>
          </v-layout>
        </v-container>
      </v-content>
  </v-dialog>
<!--    </v-app>-->
<!--  </div>-->

</template>

<script>

const axios = require('axios')

export default {
  data () {
    return {
      dialog: false,
      name: '',
      email: '',
      password: '',
      loading: false,
      login: true,
      nameRules: [(v) => v.length >= 2 || 'Too short'
      ],
      emailRules: [
        (value) => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Invalid email.'
        }
      ],
      passwordRules: [
        (value) => value.length >= 5 || 'Too short'
      ],
      snackbar: false,
      resultinfo: ''
    }
  },

  computed: {
    logined () {
      return this.$store.state.username === undefined
    }
  },

  methods: {
    signup () {
      if (this.name.length >= 2) {
        //   this.loading = true;
        //   firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then((user) => {
        //     user = firebase.auth().currentUser;
        //     if(user){
        //       user.updateProfile({
        //         displayName: this.name,
        //       }).then(() => {
        //         this.loading = false;
        //         this.$router.replace('/dashboard');
        //       })
        //     }
        //   })
        //     .catch((error) => {
        //       // Handle Errors here.
        //       var errorMessage = error.message;
        //       this.loading = false;
        //       if (errorMessage.length > 0) {
        //         this.resultinfo = errorMessage;
        //         this.snackbar = true;
        //       }
        //     })
        // } else {
        //   this.resultinfo = 'Name too short'
        //   this.snackbar = true;
        axios.get('http://localhost:8081/login', {
          params: {
            name: this.name,
            email: this.email,
            password: this.password
          }
        }).then((response) => {
          if (response.data === 0) {
            this.loading = false
            this.$store.dispatch('setUser', this.userName)
            this.$router.replace('/')
          } else {
            this.loading = false
            this.resultinfo = '用户注册失败！ 错误码: ' + response.data
            this.snackbar = true
          }
        }).catch(error => {
          this.loading = false
          this.resultinfo = '用户注册失败，请稍后再试！ 错误: ' + error
          this.snackbar = true
        })
      }
    },
    signin () {
      this.loading = true
      // firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(() => {
      //   this.loading = false;
      //   this.$router.replace('/dashboard')
      // }).catch(function(error) {
      //   return error.message;
      // }).then( error => {
      //   this.loading = false;
      //   this.resultinfo = error;
      //   this.snackbar = true;
      // })
      axios.get('http://localhost:8081/login', { params: {
        name: this.name,
        password: this.password
      }
      }).then((response) => {
        if (response.data === 0) {
          this.loading = false
          this.$store.dispatch('setUser', this.userName)
          this.$router.replace('/')
        } else {
          this.loading = false
          this.resultinfo = '用户验证失败！ 错误码: ' + response.data
          this.snackbar = true
        }
      }).catch(error => {
        this.loading = false
        this.resultinfo = '用户验证失败，请稍后再试！ 错误: ' + error
        this.snackbar = true
      })
    },
    quit: function () {
      // TODO: 应在显示页面时将用户名、密码栏位置空
      this.name = ''
      this.password = ''
      this.snackbar = true
      this.dialog = false
      this.resultinfo = ''
    }
  }
}
</script>

<style>
  @media only screen and (max-width: 768px) {
    .v-content {
      margin: 0;
    }
  }
</style>
