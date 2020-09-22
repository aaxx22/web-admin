import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    routeArr: [],
    login: {
      username: 'admin',
      password: '123456'
    },
    staffSearchForm: {},
    userInfo: {}
  },
  mutations: {
    changeRoute(state, data) {
      let isExist = false
      state.routeArr.forEach((item, index) => {
        if (item.name == data.name || data.name == 'login') {
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
    },
    searchStaff(state, data) {
      state.staffSearchForm = JSON.parse(JSON.stringify(data))
    },
    storeUserInfo(state, data) {
      state.userInfo = JSON.parse(JSON.stringify(data))
      localStorage.setItem('token', state.userInfo.token)
      localStorage.setItem('userInfo', JSON.stringify(state.userInfo.userInfo))
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