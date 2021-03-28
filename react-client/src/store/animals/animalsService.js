import axios from "axios";

export  function loadAnimals() {
  return axios.get("http://localhost:3000/animals").then((res) => res.data);
}
