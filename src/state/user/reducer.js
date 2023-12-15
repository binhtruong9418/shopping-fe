import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    "id": 0,
    "name": "",
    "email": "",
    "role": "",
    "createdAt": "",
    "updatedAt": "",
    "paperPoint": 0,
    "studentId": "",
    "phone": null,
    "age": null,
    "avatar": null,
    "schoolId": null
}

const userSlice = createSlice({
    initialState,
    name: "user",
    reducers: {
        setUser: (state, action) => {
            return action.payload
        },
        clearUser: (state, action) => {
            return initialState;
        }
    }
})

const {actions, reducer} = userSlice;

export const {
setUser, clearUser
} = actions

export default reducer;