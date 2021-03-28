
import {
  ANIMALS_LIST_REQUEST,
  ANIMALS_LIST_SUCCESS,
} from './animalsConstans';

import * as animalsService from './animalsService';

export function loadAnimals() {
  console.log("0101010")
  return (dispatch) => {
    dispatch(loadAnimalsRequest());

    return animalsService.loadAnimals().then(
      (response) => {
        dispatch(loadAnimalsSuccess(response));
      }
    );
  };
}

export  function loadAnimalsRequest() {
  return { type: ANIMALS_LIST_REQUEST };
}

export  function loadAnimalsSuccess(payload) {
  return { type: ANIMALS_LIST_SUCCESS, payload };
}
