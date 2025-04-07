import React from "react"
import ProtectedRoute from "./components/ProtectedRoute"
import Login from "./pages/Login"
import Register from "./pages/Register"
import NotFound from "./pages/NotFound"
import Home from "./pages/Home"
import Profile from "./pages/Profile"
import HasProfile from "./components/HasProfile"
import { BrowserRouter,Routes,Navigate,Route } from "react-router-dom"
import MyJoinRequests from "./pages/MyJoinRequests"
import PublicNotes from "./pages/PrivateNotes"
import PrivateNotes from "./pages/PrivateNotes"


function Logout(){
  localStorage.clear()
  return <Navigate to="/login/"/>
}

function RegisterAndLogout(){
  localStorage.clear()
  return <Register/>
}

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
                <Home/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
                <Profile/>
            </ProtectedRoute>
          }
        />

        <Route
          path="/myjoinrequests"
          element={
            <ProtectedRoute>
                <MyJoinRequests/>
            </ProtectedRoute>
          }
        />

        <Route
          path="/private-view"
          element={
            <ProtectedRoute>
              <PrivateNotes/>
            </ProtectedRoute>
          }
        />
        
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<RegisterAndLogout/>}/>
        <Route path='/logout' element={<Logout/>} />
        <Route path='*' element={<NotFound/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
