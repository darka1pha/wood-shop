import { combineReducers } from "redux";
import userReducer from "./user/user.reducer";
import alertReducer from "./alert/alert.reducer";

const rootReducer = combineReducers({
  //  our reducers
  user: userReducer,
  alert: alertReducer,
});


export default rootReducer;
