import Vue from 'vue'
import Vuex from 'vuex'
import listCows from './Modules/Cows'
import listAnimals from './Modules/Animals'

Vue.use(Vuex)

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      listCows,
      listAnimals
    },
    strict: process.env.DEV
  })

  return Store
}