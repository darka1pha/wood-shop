import { combineReducers } from "redux";
import userReducer from "./user/user.reducer";
import alertReducer from "./alert/alert.reducer";
import categoryReducer from "./category/category.reducer";

const rootReducer = combineReducers({
  //  our reducers
  user: userReducer,
  alert: alertReducer,
  category: categoryReducer,
});

export default rootReducer;
