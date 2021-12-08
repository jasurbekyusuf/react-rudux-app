import kassaReducer from './reducers/kassaReducer'
import userReducer from "./reducers/userReducer";
import kirimReducer from "./reducers/kirimReducer";
import chiqimReducer from "./reducers/chiqimReducer";
import {configureStore} from '@reduxjs/toolkit'

export const store = configureStore({
    reducer: {
        kassaReducer,
        userReducer,
        kirimReducer,
        chiqimReducer
    }
})