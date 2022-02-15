import { combineReducers } from 'redux';
import login from './loginReducer';
import token from './tokenReducer';

const rootReducer = combineReducers({
  login,
  token,
});

export default rootReducer;
