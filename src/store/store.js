import { compose, createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';

import { rootReducer } from './root-reducer';

const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['user']  // we don't want 'user' to persist
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// logger will be used only on development mode
const middleWares = [
    process.env.NODE_ENV !== 'production' && logger,
    thunk,
].filter(Boolean);


// in order to use DevTools Extension only when needed
    const composeEnhancer = (process.env.NODE_ENV !== 'production' && 
    window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || 
    compose;

const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares));

// root reducer
export const store = createStore(persistedReducer, undefined, composedEnhancers);
export const persistor = persistStore(store);
