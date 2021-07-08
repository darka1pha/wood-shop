import { categoryTypes } from "./category.types";

const INITIAL_STATE = {
  current: {
    name: null,
    id: null,
  },
};

const categoryReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case categoryTypes.SET_CURRENT:
      return {
        ...state,
        current: action.payload,
      };
    default:
      return state;
  }
};

export default categoryReducer;
