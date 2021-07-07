import { userActionTypes } from "./user.types";

export const setCurrentUser = (user) => ({
  type: userActionTypes.SET_CURRENT_USER,
  payload: user,
});

export const clearCurrentUser = (data) => ({
  type: userActionTypes.CLEAR_CURRENT_USER,
  payload: data,
});
