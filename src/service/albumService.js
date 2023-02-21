import { createAsyncThunk } from "@reduxjs/toolkit";
import customAxios from "./api"

export const getAlbums = createAsyncThunk(
    'albums/getAlbums',
    async ()=> {
        const res = await customAxios.get('albums');
        return res.data;
    }
)

export const getAlbumById = createAsyncThunk(
    'albums/getAlbum',
    async (data)=> {
        const res = await customAxios.get('albums/find-by-id/'+data[0], {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + data[1],
            }
        });
        return res.data;
    }
)

export const addAlbum = createAsyncThunk(
    'albums/addAlbum',
    async (data)=> {
        const res = await customAxios.post('albums', data[0], {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + data[1],
            }
        });
        return data;
    }
)

export const deleteAlbum = createAsyncThunk(
    'albums/deleteAlbum',
    async (data)=> {
        const res = await customAxios.delete('albums/'+data[0], {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + data[1],
            }
        });
        return res;
    }
)

export const editAlbum = createAsyncThunk(
    'albums/editAlbum',
    async (data)=> {
        const res = await customAxios.put('albums/'+data[0], data[1], {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + data[2],
            }
        });
        return data;
    }
)