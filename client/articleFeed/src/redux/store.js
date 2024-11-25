import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import UserSlice from './reducers/userSlice'
import { persistStore } from "redux-persist";
import {
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  user:UserSlice
});

const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export const persistor = persistStore(store);
