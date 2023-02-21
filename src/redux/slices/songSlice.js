import { createSlice } from "@reduxjs/toolkit";
import { addSong, getSongs } from "../../service/songService";

const initialState = {
    songs: [],
}

const songSlice = createSlice({
    name: 'songs',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getSongs.fulfilled, (state, action) => {
            state.songs = action.payload;
        });
        builder.addCase(addSong.fulfilled, (state, action) => {
            state.songs.push(action.payload);
        })
    }
})

export default songSlice.reducer;