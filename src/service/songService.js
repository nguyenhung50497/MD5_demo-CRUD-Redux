import { createAsyncThunk } from "@reduxjs/toolkit";
import customAxios from "./api"

export const getSongs = createAsyncThunk(
    'songs/getSongs',
    async ()=> {
        const res = await customAxios.get('songs');
        return res.data;
    }
)

export const addSong = createAsyncThunk(
    'songs/addSong',
    async (data)=> {
        const res = await customAxios.post('songs', data);
        return data;
    }
)