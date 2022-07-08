import axios from 'axios'

import { API_KEY } from './../../config';
import { userSlice } from '../reducers/userSlice';
import { IUser } from '../../components/types';

export const getUsers = () => (dispatch: any) => {
    axios.get(`${API_KEY}/api/users/`)
        .then((response) => dispatch(userSlice.actions.setUsers(response.data)))
}
export const getUserPage = (url: string) => (dispatch: any) => {
    axios.get(url)
        .then((response) => dispatch(userSlice.actions.setUsers(response.data)))
}
export const createUser = (body: IUser) => (dispatch: any) => {
    axios.post(`${API_KEY}/api/users/`, body)
        .then((response) => dispatch(userSlice.actions.createUser(response.data)))
        .catch((error) => {
            let errors = error.response.data.username[0] || error.response.data.email[0]
            dispatch(userSlice.actions.setError(errors))
        })
}
export const deleteUser = (id: number) => (dispatch: any) => {
    axios.delete(`${API_KEY}/api/users/${id}/`)
        .then((response) => dispatch(userSlice.actions.deleteUser(id)))
        .then(() => getUsers())
}