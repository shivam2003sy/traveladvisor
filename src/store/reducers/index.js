
import { combineReducers } from 'redux';
import locationReducer from './locationReducer';
const rootReducer = combineReducers({
  locations: locationReducer,

});

export default rootReducer;
