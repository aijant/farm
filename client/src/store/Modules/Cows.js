import axios from "axios";
console.log("axios");
const state = {
  cows: [],
  loadedCow: null
};

const mutations = {
  LOAD_COWS: (state, cows) => {
    state.cows = cows;
  },
  LOAD_COW_DETAILS: (state, cow) => {
    state.loadedCow = cow;
  }
};

const actions = {
  async loadCows({ commit }) {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/users`
    );
    commit("LOAD_COWS", response.data);
  },
  async loadCowById({ commit }, id) {
    const currCow = await axios.get(
      `https://jsonplaceholder.typicode.com/users/${id}/`
    );
    commit("LOAD_COW_DETAILS", [currCow.data]);
    },
  async updateCow({ commit }, payload) {
    const { id, cow } = payload;
    await client.post(`cows/${id}/update/`, cow);
  },

};

export default {
  state,
  mutations,
  actions
};