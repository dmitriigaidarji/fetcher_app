import {createStore, applyMiddleware} from 'redux'
import {persistStore, persistReducer} from 'redux-persist'
import thunk from "redux-thunk"
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web and AsyncStorage for react-native
import {composeWithDevTools} from 'redux-devtools-extension'
import rootReducer from './reducers'
import hardSet from 'redux-persist/lib/stateReconciler/hardSet'
const persistConfig = {
    key: 'root',
    storage,
    stateReconciler: hardSet,
}
const persistedReducer = persistReducer(persistConfig, rootReducer);
export default () => {
    let store = createStore(persistedReducer, composeWithDevTools(applyMiddleware(thunk)))
    let persistor = persistStore(store, null, () => store.getState())
    return { store, persistor }
}
// export const store = createStore(persistedReducer, composeWithDevTools(applyMiddleware(thunk)))
// export const persistor = persistStore(store, null, () => store.getState())
