import { useMemo } from 'react';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import artistsReducers from './artists';

let store;

function initStore() {
  return createStore(
    combineReducers({
      artistsReducers,
    }),
    composeWithDevTools(applyMiddleware(logger, thunk)),
  );
}

export const initializeStore = (preloadedState) => {
  let storeInit = store ?? initStore(preloadedState);

  // After navigating to a page with an initial Redux state, merge that state
  // with the current state in the store, and create a new store
  if (preloadedState && store) {
    storeInit = initStore({
      ...store.getState(),
      ...preloadedState,
    });
    // Reset the current store
    store = undefined;
  }

  // For SSG and SSR always create a new store
  if (typeof window === 'undefined') return storeInit;
  // Create the store once in the client
  if (!store) store = storeInit;

  return storeInit;
};

export function useStore(initialState) {
  store = useMemo(() => initializeStore(initialState), [initialState]);
  return store;
}
