import axios from "axios";
console.log("axios");
const state = {
  animals: [],
  loadAnimals: null
};

const mutations = {
  LOAD_ANIMALS: (state, animals) => {
    state.animals = animals;
  },
  LOAD_ANIMALS_DETAILS: (state, animals) => {
    state.loadAnimals = animals;
  }
};

const actions = {
  async loadAnimals({ commit }) {
    const response = await axios.get(`http://localhost:3000/animals`);
    if (response.data && response.data.length) {
      const data = response.data.map(el => {
        let temp = "";
        if (el.status) {
          el.status.forEach(item => {
            temp  += `${item.name} `;
          });
        }
        el.status = temp;
        return el;
      });
      commit("LOAD_ANIMALS", data);
    }
  },
  async loadAnimalsById({ commit }, id) {
    const currData = await axios.get(`http://localhost:3000/animals/${id}/`);
    commit("LOAD_ANIMALS_DETAILS", [currData.data]);
  },
  async updateAnimals({ commit }, payload) {
    const { id, animal } = payload;
    await client.post(`cows/${id}/update/`, animal);
  }
};

export default {
  state,
  mutations,
  actions
};
