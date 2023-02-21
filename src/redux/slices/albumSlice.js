import { createSlice } from "@reduxjs/toolkit";
import { addAlbum, deleteAlbum, editAlbum, getAlbumById, getAlbums } from "../../service/albumService";

const initialState = {
    albums: [],
    album: {}
}

const albumSlice = createSlice({
    name: 'albums',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getAlbums.fulfilled, (state, action) => {
            state.albums = action.payload;
        });
        builder.addCase(getAlbumById.fulfilled, (state, action) => {
            state.album = action.payload;
        });
        builder.addCase(addAlbum.fulfilled, (state, action) => {
            state.albums.push(action.payload);
        });
        builder.addCase(deleteAlbum.fulfilled, (state, action) => {
            state.albums.splice(action.payload, 1);
        })
        builder.addCase(editAlbum.fulfilled, (state, action) => {
            state.albums.splice(action.payload[0], 1, action.payload[1]);
        })
    }
})

export default albumSlice.reducer;