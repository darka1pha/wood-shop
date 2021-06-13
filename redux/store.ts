import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger'
import thunk from 'redux-thunk'

import rootReeducer from './rootReducer'

const middlewares = [logger,thunk];

const store = createStore(
  rootReeducer,
  applyMiddleware(...middlewares)
);

export default store;

export type appDispatch = typeof store.dispatch