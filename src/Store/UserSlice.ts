import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TUser } from "../Types/TUser";

const initialState = {
    isLoggedIn: false,
    user: null as TUser | null
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login: (state: TUserState, date: PayloadAction<TUser>) => {
            state.isLoggedIn = true;
            state.user = date.payload;
        },
        Signout: (state: TUserState) => {
            state.isLoggedIn = false;
            state.user = null;
        },
    },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
export type TUserState = typeof initialState
export type TUserPayload = { userName: string };