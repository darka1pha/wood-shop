import { loadingTypes } from "./loading.types";

const INITIAL_STATE = {
  isLoading: false,
};

const loadingReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case loadingTypes.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };

    default:
      return state;
  }
};

export default loadingReducer;
