import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  events: [],
  login: false,
  loading: true,
  error: false,
};

const eventTypeSlice = createSlice({
  name: "eventType",
  initialState,
  reducers: {
    setEventTypeData(state, action) {
      state.login = true;
      state.events = action.payload.data || {};
      state.loading = false;
      state.error = false;
    },
    addEventType(state, action) {
      state.events.push(action.payload);
    },
    removeEventType(state, action) {
      state.events = state.events.filter((ev) => ev.id !== action.payload.id);
    },
  },
});

export const { setEventTypeData, addEventType, removeEventType } =
  eventTypeSlice.actions;

export default eventTypeSlice.reducer;
