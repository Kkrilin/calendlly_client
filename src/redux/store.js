import { configureStore } from '@reduxjs/toolkit';

// slice
import profileReducer from './profileSlice.js';
import eventTypeReducer from './eventTypeSlice.js';

const store = configureStore({
  reducer: {
    profile: profileReducer,
    eventType: eventTypeReducer,
  },
});

export default store;
