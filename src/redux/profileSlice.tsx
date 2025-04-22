import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BaseUserData } from "../constant";

interface ProfileState {
  data: BaseUserData;
  login: boolean;
  loading: boolean;
  error: boolean;
}

const initialState: ProfileState = {
  data: {
    id: "",
    name: "",
    email: "",
    profileSlug: "",
  },
  login: false,
  loading: true,
  error: false,
};


const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfileData(state, action: PayloadAction<{ data: BaseUserData }>) {
      state.login = true;
      state.data = action.payload.data || {};
      state.loading = false;
      state.error = false;
    },
  },
});

export const { setProfileData } = profileSlice.actions;

export default profileSlice.reducer;
