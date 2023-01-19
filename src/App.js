import React, { useEffect } from 'react';
import './App.css';
import Form from './components/common/Form';
import Home from './components/Home';
import { 
  BrowserRouter as Router, 
  Routes, 
  Route, 
  useNavigate} from 'react-router-dom';
import { useState } from 'react';
// import firebase config and components
import app from './firebase';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'
// import toastify for notifications
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const navigate = useNavigate();

  // user sessoion token check
  useEffect(() => {
    let authToken = sessionStorage.getItem('Auth Token')

    if (authToken) {
      navigate('/home')
    }
  }, [])

  // Create state variables for email and password
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  // Create a function to handle the form submission
  const handleAction = (type) => {
    const authentication = getAuth();

    if (type === "register") {
      createUserWithEmailAndPassword(authentication, email, password)
        .then((response) => {
          // store the user token in the session storage
          sessionStorage.setItem('Auth Token', response._tokenResponse.refreshToken)

          navigate('/home')
      }).catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
          toast.error('Email Already in Use');
        }
      })
    }
    if (type === "login") {
      signInWithEmailAndPassword(authentication, email, password)
        .then((response) => {
          // store the user token in the session storage
          sessionStorage.setItem('Auth Token', response._tokenResponse.refreshToken)

          navigate('/home')
      }).catch((error) => {
        if(error.code === 'auth/wrong-password'){
          toast.error('Please check the Password');
        }
        if(error.code === 'auth/user-not-found'){
          toast.error('Please check the Email');
        }
      })
    }
    
  }

  return (
      <div className="App">
        <>
          <Routes>
            <Route path='/home'
              element={
                <Home />}
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
        </>
      </div>
  );
}

export default App;
