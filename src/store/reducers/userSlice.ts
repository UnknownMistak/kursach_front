import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IUser, Pagination } from "../../components/types";

export interface UserState {
    users: IUser[];
    pagination: Pagination;
    error: string;
}

const initialState: UserState = {
    users: [],
    pagination: new Object() as Pagination,
    error: ''
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUsers(state, action: PayloadAction<any>) {
            state.users = action.payload.results
            state.pagination = action.payload
        },
        createUser(state, action: PayloadAction<IUser>){
            state.users.push(action.payload)
        },
        deleteUser(state, action: PayloadAction<number>){
            state.users = state.users.filter(x => x.id !== action.payload)
        },
        setError(state, action: PayloadAction<string>){
            state.error = action.payload
        }
    }
})

export default userSlice.reducer