import React, { useEffect, useState } from 'react';
import { AiOutlineArrowLeft, AiOutlineArrowRight, AiOutlineDelete } from 'react-icons/ai'

import './UserPage.css';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';

import { getUserPage, deleteUser } from '../../../store/actions/userActions';
import { IUser } from '../../types';

const UserPage = () => {

    const dispatch = useAppDispatch()

    const users = useAppSelector(state => state.user.users)
    const pagination = useAppSelector(state => state.user.pagination)
    const [sort, setSort] = useState<number>(0)
    const [sortedArr, setSortedArr] = useState<any>([])

    useEffect(() => {
        if (users.length)
            setSortedArr(users)
    }, [users])

    useEffect(() => {
        if (users.length) {
            let temp = [...users] as any
            let key = Object.keys(temp[0])[sort - 1]
            if (sort !== 0) {
                if (sort === 1) setSortedArr(users)
                else {
                    temp.sort((a: any, b: any) => a[key].localeCompare(b[key]))
                    setSortedArr(temp)
                }
            }
        }
    }, [sort])

    return (
        <div className='userpage'>
            <h2>Users</h2>
            {sortedArr.slice(0, 3).map((x: IUser) =>
                <div key={x.id} className='item'>
                    <div>
                        <p>Link: <a href={x.url}>{x.url}</a></p>
                        <p>Username: {x.username}</p>
                        <p>Email: {x.email}</p>
                        <p>Is staff: {x.is_staff ? 'Yes' : 'No'}</p>
                    </div>
                    <button style={{height: '40px'}} onClick={() => dispatch(deleteUser(Number(x.id)))}><AiOutlineDelete /></button>
                </div>
            )}
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div className='usersort'>
                    <span style={{ margin: 'auto 0' }}>Sort by</span>
                    <select onChange={(e) => setSort(e.target.selectedIndex)}>
                        <option>-</option>
                        {users.length && Object.keys(users[0]).map(x => <option key={x}>{x}</option>)}
                    </select>
                </div>
                <div className='userbuttons'>
                    <button onClick={() => dispatch(getUserPage(pagination.previous))} disabled={pagination.previous === null ? true : false}>
                        <AiOutlineArrowLeft />
                    </button>
                    <button onClick={() => dispatch(getUserPage(pagination.next))} disabled={pagination.next === null ? true : false}>
                        <AiOutlineArrowRight />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserPage;