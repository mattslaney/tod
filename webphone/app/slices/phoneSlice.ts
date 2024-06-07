import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { SimplePhone } from '../utils/phoneUtils';
import { useContext } from 'react';
import { PhoneContext } from '../contexts/Phones';

interface PhoneConfig {
    username: string,
    password: string,
    server: string,
}

const initialState: PhoneConfig[] = [{
    username: '',
    password: '',
    server: '',
}];

const phoneSlice = createSlice({
    name: 'phones',
    initialState,
    reducers: {
        addPhone(state, action: PayloadAction<PhoneConfig>) {
            state.push({
                username: action.payload.username,
                password: action.payload.password,
                server: action.payload.server || "127.0.0.1",
            })
        },
        updatePhone(state, action: PayloadAction<PhoneConfig>) {
            state[0].username = action.payload.username;
            state[0].password = action.payload.password;
            state[0].server = action.payload.server;
        },
        removePhone(state, action: PayloadAction<number>) {
            
        }
    }
})

export const {addPhone, removePhone, updatePhone} = phoneSlice.actions;

export const phoneUsername = (state: RootState) => state.phones[0].username;
export const phonePassword = (state: RootState) => state.phones[0].password;
export const phoneServer = (state: RootState) => state.phones[0].server;

export default phoneSlice.reducer;
