import { alertTypes } from "./alert.types";

const INITIAL_STATE = {
  info: {
    content: "",
    type: "",
  },
};

const alertReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case alertTypes.SET_ALERT:
      return {
        ...state,
        info: action.payload,
      };
    case alertTypes.REMOVE_ALERT:
      return {
        ...state,
        info: {
          ...state.info,
          content: "",
          type: "",
        },
      };
    default:
      return state;
  }
};

export default alertReducer;
