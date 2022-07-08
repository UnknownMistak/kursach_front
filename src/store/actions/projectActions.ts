import axios from 'axios'

import { API_KEY } from './../../config';
import { projectSlice } from '../reducers/projectSlice';
import { Project } from '../../components/types';

export const getProjects = () => (dispatch: any) => {
    axios.get(`${API_KEY}/api/projects/`)
        .then((response) => dispatch(projectSlice.actions.setProjects(response.data)))
}
export const getProjectPage = (url: string) => (dispatch: any) => {
    axios.get(url)
        .then((response) => dispatch(projectSlice.actions.setProjects(response.data)))
}
export const createProject = (body: Project) => (dispatch: any) => {
    axios.post(`${API_KEY}/api/projects/`, body)
        .then((response) => dispatch(projectSlice.actions.createProject(response.data)))
        .catch((response) => dispatch(projectSlice.actions.setError(response.data.name || response.data.description || response.data.status)))
}
export const deleteProject = (id: number) => (dispatch: any) => {
    axios.delete(`${API_KEY}/api/projects/${id}`)
        .then((response) => dispatch(projectSlice.actions.deleteProject(id)))
        .then(() => getProjects())
}