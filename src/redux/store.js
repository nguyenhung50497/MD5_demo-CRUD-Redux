import userReducer from "./slices/userSlice";
import songReducer from "./slices/songSlice";
import albumReducer from "./slices/albumSlice";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
    reducer: {
        user: userReducer,
        songs: songReducer,
        albums: albumReducer
    }
})

export default store;