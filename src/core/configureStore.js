import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import loggerMiddleware from "redux-logger";
import thunkMiddleware from "redux-thunk";

import mainReducer from "./reducers";

export default function configureStore() {
  const middlewares = [
      thunkMiddleware,
      __DEV__ && loggerMiddleware,
  ].filter(Boolean);

  const store = createStore(
      mainReducer,
      composeWithDevTools(applyMiddleware(...middlewares)),
  );

  return store;
};
