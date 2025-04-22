import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

// slice
import profileReducer from "./profileSlice";
import eventTypeReducer from "./eventTypeSlice";

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
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // required for redux-persist
    }),
});

export default store;

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
