import { useEffect, useState } from 'react'
import { Routes,Route,BrowserRouter, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Homepage from './pages/Homepage'
import Signup from './pages/Signup'
import Loginpage from './pages/Login'
import Setting from './pages/Setting'
import Profile from './pages/Profile'
import Announcement from "./components/Announcement.jsx"
import { useauthStore } from './store/useAuthStore.js'
import { useThemeStore } from './store/useThemeStore.js'
import ChatContainer from './components/ChatContainer.jsx'
import {Loader} from "lucide-react"
import Messageview from "./pages/Messageview.jsx"

function App() {
 const {authUser,checkAuth,ischeckingAuth,onlineUsers}=useauthStore();
 const {theme,setTheme}=useThemeStore();
 console.log(onlineUsers)
 useEffect(()=>{
  checkAuth();
 },[checkAuth]);
 console.log(authUser);
 if(ischeckingAuth && !authUser){return(
  <div className='flex items-center justify-center h-screen'>
       <Loader className='size-10 animate-spin'/> 
  </div>
 ) }

  return (
  
      <div data-theme={theme}>
   
          <Navbar/>
           <Routes>
               <Route path='/' element={authUser?<Homepage/>:<Navigate to='/login'/>}/>
              <Route path='/signup' element={!authUser?<Signup/>:<Navigate to='/'/>}/>
              <Route path='/login' element={!authUser?<Loginpage/>:<Navigate to='/'/>}/>
              <Route path='/settings' element={<Setting/>}/>
              <Route path='/profile' element={authUser?<Profile/>:<Navigate to='/login'/>}/>
              <Route path='/announce'element={<Announcement/>}/>
              <Route path='/msgview' element={authUser?<Messageview/>:<Navigate to='/login'/>}/>
              
            </Routes>
     
        </div>
    
  )
}

export default App
