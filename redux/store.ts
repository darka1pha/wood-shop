import { useMemo } from "react";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import logger from "redux-logger";
import rootReducer from "./rootReducer";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

let store;
const middlewares = [logger, thunk];

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user", "category"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

function initStore(initialState) {
  return createStore(
    persistedReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middlewares))
  );
}

export const initializeStore = (preloadedState) => {
  let _store = store ?? initStore(preloadedState);
  if (preloadedState && store) {
    _store = initStore({
      ...store.getState(),
      ...preloadedState,
    });

    store = undefined;
  }

  if (typeof window === "undefined") return _store;

  if (!store) store = _store;

  return _store;
};

export function useStore(initialState) {
  const store = useMemo(() => initializeStore(initialState), [initialState]);
  return store;
}
