
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Home() {
    // logout function
    const handleLogout = () => {
        sessionStorage.removeItem('Auth Token');
        navigate('/login')
    }

    let navigate = useNavigate();

    useEffect(() => {
        // user sessoion token check
        let authToken = sessionStorage.getItem('Auth Token')

        if (authToken) {
            navigate('/home')
        }

        if (!authToken) {
            navigate('/login')
        }
    }, [])
    return (
        <div>
            <p>
                Home Page    
            </p>
            <button onClick={handleLogout}>Log out</button>
        </div>
    )
}