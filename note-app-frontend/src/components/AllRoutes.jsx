import React, { useContext } from 'react'
import { Routes,Route } from 'react-router-dom'
import Home from '../pages/Home'
import Login from '../pages/Login'
import About from '../pages/About'
import Notes from '../pages/Notes'
import NoteAdd from '../pages/NoteAdd'
import Registor from '../pages/Registor'
import { auth } from '../context/AuthContext'
import { Navigate } from 'react-router-dom'
import NoteView from '../pages/NoteView'


function PageWrapper({children})
{
  const {authDetail}=useContext(auth)
  if(!authDetail?.isLoggedIn)
  {
    return <Navigate to="/login"/>
  }
  else{
    return children
  }
  
}

function AllRoutes() {

  
  return (
    <div>
      
        <Routes>
            <Route path='/' element={
              <PageWrapper>
                <Home/>
              </PageWrapper>
              
              }/>
            <Route path='/notes' element={
              <PageWrapper>
                <Notes/>
              </PageWrapper>
              
              }/>
              <Route path='/notes/create' element={
              <PageWrapper>
                <NoteAdd/>
              </PageWrapper>
              
              }/>
              <Route path='/notes/view/:id' element={
              <PageWrapper>
                <NoteView/>
              </PageWrapper>
              
              }/>
            <Route path='/about' element={
              <PageWrapper>
                <About/>
              </PageWrapper>
              
              }/>
            <Route path='/register' element={<Registor/>}/>
            <Route path='/login' element={<Login/>}/>
        </Routes>
        
      
    </div>
  )
}

export default AllRoutes
