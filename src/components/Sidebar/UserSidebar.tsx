import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { createUser } from '../../store/actions/userActions';

const UserSidebar = () => {

    const dispatch = useAppDispatch()

    const error = useAppSelector(state => state.user.error)

    const [isStaff, setIsStaff] = useState<boolean>(false)
    const [username, setUsername] = useState<string>()
    const [email, setEmail] = useState<string>()
    const [isValid, setIsValid] = useState<boolean>(true)
    const [isValidEmail, setIsValidEmail] = useState<boolean>(true)

    const submitForm = (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault()

        const body = {
            username: username as string,
            email: email as string,
            is_staff: isStaff as boolean
        }

        if (body.username && body.email && body.is_staff) {
            setIsValid(true)
            dispatch(createUser(body))
        }
        else setIsValid(false)
    }

    return (
        <form onSubmit={submitForm} className='sidebar'>
            <h2>Create new user</h2>
            <input onChange={(e) => setUsername(e.target.value)} placeholder='username' />
            <input onChange={(e) => setEmail(e.target.value)} placeholder='email' />
            <div style={{ display: 'flex' }}>
                <p style={{ marginRight: 20 }}>Is stuff?</p>
                <input onChange={() => setIsStaff(!isStaff)} type="checkbox" />
            </div>
            {!isValid && <div style={{ color: 'red' }}>Fill in all the fields</div>}
            {isValid && <span>{error}</span>}
            <button type="submit">Send</button>
        </form>
    );
};

export default UserSidebar;