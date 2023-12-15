import userReducer from "./user"
import {configureStore} from "@reduxjs/toolkit";

const rootReducer = {
    user: userReducer,
}

const store = configureStore({
    reducer: rootReducer,
    devTools: true,
})

export default store