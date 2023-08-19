import { configureStore } from "@reduxjs/toolkit";
import userReducer from './userSlice';
import podcastReducer from "./podcastSlice"
export default configureStore({
    reducer:{
        user:userReducer,
        podcastData:podcastReducer
    }
})