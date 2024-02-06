import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";
import userReducer from "./Reducers/userSlice";
import langReducer from "./Reducers/langSlice";
import scheduleReducer from "./Reducers/scheduleSlice"
import { configureStore } from "@reduxjs/toolkit";
const rootReducers = combineReducers({
  user: userReducer,
  lang: langReducer,
  schedule: scheduleReducer,
});
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user","lang", "schedule"],
};

const persistedReducer = persistReducer(persistConfig, rootReducers);
const store = configureStore({
  reducer:{
    root:persistedReducer
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: ["register"],
      ignoredActionPaths: ["rehydrate", "register"],
      ignoredPaths: ["register"],
    },
  })
});
const persistor = persistStore(store);
export { store, persistor };