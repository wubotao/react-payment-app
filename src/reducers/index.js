import { combineReducers } from 'redux';
import { reducerCreator } from 'redux-amrc';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
  async: reducerCreator({}),
  form: formReducer
});

export default rootReducer;
