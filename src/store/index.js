import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    routeArr: [],
    login:{
      username:'admin',
      password:'123456'
    }
  },
  mutations: {
    changeRoute(state, data) {
      let isExist = false
      state.routeArr.forEach((item, index) => {
        if (item.name == data.name) {
          isExist = true
          return
        }
      })
      if (!isExist) {
        state.routeArr.push(data)
      }
    },
    removeRouteArr(state, data) {
      state.routeArr.forEach((item, index) => {
        if (item.name == data.name) {
          state.routeArr.splice(index, 1)
          return
        }
      })
    }
  },
  actions: {
    routeChange(context, data) {
      context.commit('changeRoute', data)
    },
    removeTag(context, data) {
      context.commit('removeRouteArr', data)
    }
  },
  modules: {}
})