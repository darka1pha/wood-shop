import { combineReducers } from 'redux';
import userReducer from "./user/user.reducer"
const rootReducer = combineReducers({
  //  our reducers
  user: userReducer ,
})

export default rootReducer