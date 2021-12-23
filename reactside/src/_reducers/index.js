import { combineReducers } from 'redux';
import { alert } from './alert.reducer';
import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { user } from './user.reducer';
import { userlist } from './userlist.reducer';
import { userchat } from './chat.reducer';

export default combineReducers({
  alert,
  authentication,
  registration ,
  user ,
  userlist,
  userchat
});