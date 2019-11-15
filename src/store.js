import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    ChannelID: 0
  },
  mutations: {
    // 处理频道序号
    setChannelID (state, id) {
      state.ChannelID = id
    }
  },
  actions: {
    setChannelID ({ commit }, id) {
      commit('setChannelID', id)
    }
  }
})
