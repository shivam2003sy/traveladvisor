
import { combineReducers } from 'redux';


import mapStateReducer from './mapStateReducer';
const rootReducer = combineReducers({
  mapStateReducer : mapStateReducer
});

export default rootReducer;
