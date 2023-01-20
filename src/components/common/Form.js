import * as React from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';

export default function BasicTextFields({title, setPassword, setEmail, handleAction}) {
    return (
        <div>
            <div className="formPage">
                <h3>
                    {title} Form
                </h3>
                    <div className='loginForm'>
                        <span>
                            <label htmlFor="email">Email: </label>
                            <input type="text" id="email" name="email" 
                                onChange={(e) => setEmail(e.target.value)}/>
                        </span>
                        <span>
                            <label htmlFor="password">Password: </label>
                            <input type="password" id='password' name="password"
                                onChange={(e) => setPassword(e.target.value)}/>
                        </span>
                    </div>
                    <Button title={title} handleAction={handleAction} />
                    <p>Need an account? Register <Link to="/register">
                    here</Link>! Return to <Link to="/login/">Login</Link>.</p>
            </div>
        </div>
    );
}