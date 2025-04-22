import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

// slice
import profileReducer from "./profileSlice.js";
import eventTypeReducer from "./eventTypeSlice.js";
const userPersistConfig = {
  key: "profile",
  storage,
  whitelist: ["data"],
};

const persistUserReducer = persistReducer(userPersistConfig, profileReducer);

const store = configureStore({
  reducer: {
    profile: persistUserReducer,
    eventType: eventTypeReducer,
  },
});

export default store;

export const persistor = persistStore(store);
