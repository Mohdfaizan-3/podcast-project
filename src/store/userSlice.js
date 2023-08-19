import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

const userSLice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
  },
  clearUser(state) {
    state.user = null;
  }
});


export const  userAction = userSLice.actions;
export default userSLice.reducer;