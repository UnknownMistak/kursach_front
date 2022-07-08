export interface IUser{
    id?: number;
    url?: string;
    username: string;
    email: string;
    is_staff: boolean;
}

export interface Project{
    id?: number;
    name: string;
    description: string;
    status: string;
    date_created?: string;
}

export interface Pagination{
    count: number;
    next: string;
    previous: string;
}