import { configureStore } from "@reduxjs/toolkit";
import userReducer  from "./userSlice"
import characterReducer from './characterSlice';

const appStore = configureStore(
    {
        reducer: {
            user: userReducer,
            characters: characterReducer,
        }
    }
)

export default appStore;