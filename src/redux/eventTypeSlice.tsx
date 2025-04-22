import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EventTypeResponse } from "../constant";

interface EventTypeState {
  events: EventTypeResponse[];
  login: boolean;
  loading: boolean;
  error: boolean;
}

const initialState: EventTypeState = {
  events: [],
  login: false,
  loading: true,
  error: false,
};

const eventTypeSlice = createSlice({
  name: "eventType",
  initialState,
  reducers: {
    setEventTypeData(state, action: PayloadAction<{ data: EventTypeResponse[] }>) {
      state.login = true;
      state.events = action.payload.data;
      state.loading = false;
      state.error = false;
    },
    addEventType(state, action: PayloadAction<EventTypeResponse>) {
      state.events.push(action.payload);
    },
    removeEventType(state, action: PayloadAction<{ id: string }>) {
      state.events = state.events.filter((ev) => ev.id !== action.payload.id);
    },
  },
});

export const { setEventTypeData, addEventType, removeEventType } =
  eventTypeSlice.actions;

export default eventTypeSlice.reducer;
