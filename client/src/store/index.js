import Vue from 'vue'
import Vuex from 'vuex'
import listCows from './Modules/Cows'

Vue.use(Vuex)

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      listCows
    },
    strict: process.env.DEV
  })

  return Store
}