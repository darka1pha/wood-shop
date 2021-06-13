import { ISetAlert } from "../interfaces";
import { alertTypes } from "./alert.types";


export const setAlert = ({ type, content }: ISetAlert) => {
  return (dispatch: any) => {
    dispatch({
      type: alertTypes.SET_ALERT,
      payload: { content, type },
    });
    setTimeout(() => dispatch({ type: alertTypes.REMOVE_ALERT }), 5000);
  };
};
