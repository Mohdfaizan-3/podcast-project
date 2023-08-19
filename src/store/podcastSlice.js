import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  podcastData: [],
};

const podcastSLice = createSlice({
  name: "podcastData",
  initialState,
  reducers: {
    setPodcast(state, action) {
      state.podcastData = action.payload;
    },
  },
});

export const podcastAction = podcastSLice.actions;
export default podcastSLice.reducer;
