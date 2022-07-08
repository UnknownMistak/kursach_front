import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { createProject } from '../../store/actions/projectActions';

const ProjectSidebar = () => {

    const dispatch = useAppDispatch()

    const error = useAppSelector((state) => state.project.error)

    const [description, setDescription] = useState<string>()
    const [name, setName] = useState<string>()
    const [status, setStatus] = useState<string>()
    const [isValid, setIsValid] = useState<boolean>(true)

    const submitForm = (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault()

        const body = {
            name: name as string,
            description: description as string,
            status: status as string
        }

        if (body.name && body.description && body.status){
            dispatch(createProject(body))
        }
        else setIsValid(false)
    }

    return (
        <form onSubmit={submitForm} className='sidebar'>
            <h2>Create new project</h2>
            <input onChange={(e) => setName(e.target.value)} placeholder='Name' />
            <input onChange={(e) => setDescription(e.target.value)} placeholder='Description' />
            <input onChange={(e) => setStatus(e.target.value)} placeholder='Status' />
            {!isValid ? <span>Fill in all the fields</span> : <span>{error}</span>}
            <button type="submit">Send</button>
        </form>
    );
};

export default ProjectSidebar;