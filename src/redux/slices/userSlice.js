import { createSlice } from "@reduxjs/toolkit";
import { login, register } from "../../service/userService";

const initialState = {
    currentUser: JSON.parse(localStorage.getItem('user')),
    user: [],
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(login.fulfilled, (state, action) => {
            state.currentUser = action.payload;
            localStorage.setItem("user", JSON.stringify(action.payload))
        });
        builder.addCase(register.fulfilled, (state, action) => {
            state.user.push(action.payload)
        });
    }
})

export default userSlice.reducer;