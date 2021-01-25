import Vue from 'vue'

export const state = () => ({
  charts: [],
  list: []
})

export const getters = {
  getCharts: (state) => {
    return state.charts
  },
  getList: (state) => {
    return state.list
  }
}

export const mutations = {
  SET_LIST (state, data) {
    Vue.set(state, 'list', data)
  },
  SET_CHARTS (state, data) {
    Vue.set(state, 'charts', data)
  }
}

export const actions = {
  async fetchDataFromJSON ({ commit, state }) {
    let response
    try {
      response = await this.$axios.$get('https://jsonplaceholder.typicode.com/albums/1/photos?_limit=10')
    } catch (error) {
      throw error
    }
    commit('SET_LIST', Array.isArray(response) ? response : [])
  }
}
