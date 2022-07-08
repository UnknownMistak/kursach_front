import React, { useEffect, useState } from 'react';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai'

import './ProjectPage.css'
import { useAppDispatch, useAppSelector } from '../../../store/hooks';

import arrow from '../../../assets/png/arrow.png'
import { getProjectPage } from '../../../store/actions/projectActions';
import { Project } from '../../types';

const ProjectPage = () => {

    const dispatch = useAppDispatch()

    const projects = useAppSelector(state => state.project.projects)
    const pagination = useAppSelector(state => state.project.pagination)
    const [sort, setSort] = useState<number>(0)
    const [sortedArr, setSortedArr] = useState<any>([])

    useEffect(() => {
        if (projects.length)
            setSortedArr(projects)
    }, [projects])

    useEffect(() => {
        if (projects.length) {
            let temp = [...projects] as any
            let key = Object.keys(temp[0])[sort - 1]
            if (sort !== 0) {
                if (sort === 1) setSortedArr(projects)
                else {
                    temp.sort((a: any, b: any) => a[key].localeCompare(b[key]))
                    setSortedArr(temp)
                }
            }
        }
    }, [sort])

    return (
        <div className='projectpage'>
            <h2>Projects</h2>
            {sortedArr.slice(0, 3).map((x: Project) =>
                <div key={x.id} className='item'>
                    <p>Name: {x.name}</p>
                    <p>Description: {x.description}</p>
                    <p>Status: {x.status}</p>
                    <p>Date created: {x.date_created}</p>
                </div>
            )}
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div className='projectsort'>
                    <span style={{ margin: 'auto 0' }}>Sort by</span>
                    <select onChange={(e) => setSort(e.target.selectedIndex)}>
                        <option>-</option>
                        {projects.length && Object.keys(projects[0]).map(x => <option key={x}>{x}</option>)}
                    </select>
                </div>
                <div className='projectbuttons'>
                    <button onClick={() => dispatch(getProjectPage(pagination.previous))} disabled={pagination.previous === null ? true : false}>
                        <AiOutlineArrowLeft />
                    </button>
                    <button onClick={() => dispatch(getProjectPage(pagination.next))} disabled={pagination.next === null ? true : false}>
                        <AiOutlineArrowRight />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProjectPage;