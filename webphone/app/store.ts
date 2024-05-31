import { configureStore } from "@reduxjs/toolkit";
import phoneReducer from './slices/phoneSlice'

export const store = configureStore({
    reducer: {
        phones: phoneReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

/* 
    {
        selectedPhone: 0
        phones: [
            {username: "1001", password: "1234", server: "127.0.0.1", state: "registered"},
            {username: "1002", password: "1234", server: "127.0.0.1", state: "registered"},
        ],
        calls: [
            
        ]
    }
*/