import { ANIMALS_LIST_REQUEST, ANIMALS_LIST_SUCCESS } from "./animalsConstans";

const initState = {
  data: [],
  loading: false,
  error: false,
  success: true,
};
export default function animalsReducer(state = initState, action) {
  const { payload, type } = action;
  console.log(type);
  switch (type) {
    case ANIMALS_LIST_REQUEST:
      return { ...state, loading: true };
    case ANIMALS_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        error: false,
        data: payload,
      };
    default:
      return state;
  }
}
