import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useAppDispatch } from './store/hooks';
import { getUsers } from './store/actions/userActions';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import { getProjects } from './store/actions/projectActions';
import ProjectPage from './components/pages/ProjectPage/ProjectPage';
import UserPage from './components/pages/UserPage/UserPage';

function App() {

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getUsers())
    dispatch(getProjects())
  }, [])

  return (
    <div className="App">
      <Header />
      <div style={{display: 'flex', gap: 30, padding: 30}}>
        <Sidebar />
        <Routes>
          <Route path="/" element={<UserPage/>}/>
          <Route path="/users" element={<UserPage/>} />
          <Route path="/projects" element={<ProjectPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
