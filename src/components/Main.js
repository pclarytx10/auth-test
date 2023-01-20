import React, { useState, useEffect } from 'react';
import Form from './common/Form';
import Home from '../pages/Home';
import { 
    Routes, 
    Route, 
    useNavigate} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { logIn, register } from '../firebase';

const Main = ({ user , setUser}) => {
    const navigate = useNavigate();
  
    // Create state variables for email and password
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);

    useEffect(() => {
        if(user) {
            // setCurrentUser(user)
            navigate('/')
        } else {
            // setCurrentUser(null)
            navigate('/login')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user])

    // Create a function to handle the form submission
    const handleAction = async (type) => {
      if (type === "register") {
        await register(email, password)
          .then((response) => {
            // store the user token state
            setUser(response.user)
            navigate('/')
        }).catch((error) => {
          if (error.code === 'auth/email-already-in-use') {
            toast.error('Email Already in Use');
          }
        })
      }
      if (type === "login") {
        await logIn(email, password)
          .then((response) => {
            // store the user state
            setUser(response.user)
            navigate('/')
        }).catch((error) => {
          if(error.code === 'auth/wrong-password'){
            toast.error('Invalid Password');
          }
          if(error.code === 'auth/user-not-found'){
            toast.error('Invalid Email');
          }
        })
      } 
    }

    return (
        <div className="main">
          <Routes>
            <Route path='/' 
                element={<Home 
                    user={user}
                    setUser={setUser}
                />} 
            />
            <Route path="/login" 
              element={
                <Form 
                  title="Login"
                  setEmail={setEmail}
                  setPassword={setPassword}
                  handleAction={() => handleAction("login")}
                />
              } 
            />
            <Route path="/register" 
              element={
                <Form 
                  title="Register"
                  setEmail={setEmail}
                  setPassword={setPassword}
                  handleAction={() => handleAction("register")}
                />
              } 
            />
          </Routes>
          <ToastContainer />
        </div>
    );
}

export default Main;