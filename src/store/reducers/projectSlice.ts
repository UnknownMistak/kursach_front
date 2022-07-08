import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Project, Pagination } from '../../components/types';

export interface ProjectState {
    projects: Project[];
    pagination: Pagination;
    error: string;
}

const initialState: ProjectState = {
    projects: [],
    pagination: new Object() as Pagination,
    error: ''
}

export const projectSlice = createSlice({
    name: 'project',
    initialState,
    reducers: {
        setProjects(state, action: PayloadAction<any>) {
            state.projects = action.payload.results
            state.pagination = action.payload
        },
        createProject(state, action: PayloadAction<Project>){
            state.projects.push(action.payload)
        },
        deleteProject(state, action: PayloadAction<number>){
            state.projects = state.projects.filter(x => x.id !== action.payload)
        },
        setError(state, action: PayloadAction<string>){
            state.error = action.payload
        }
    }
})

export default projectSlice.reducer