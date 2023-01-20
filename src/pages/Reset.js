import { Link } from "react-router-dom";
import { useState } from "react";
import { sendFbResetEmail } from "../firebase";

const Reset = ({title}) => {
    const [email, setEmail] = useState('');
    
    const handleChange = (e) => {
        setEmail(e.target.value);
    }

    const handleReset = async (e) => {
        e.preventDefault();
        try {
            await sendFbResetEmail(email);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="resetPage">
            <h3>{title}</h3>
            <form>
                <span>
                    <label htmlFor="email">Email: </label>
                    <input type="text"
                        name="email" 
                        value={email} 
                        onChange={handleChange}/>
                </span>
                <button 
                    className='btn btn-primary'
                    onClick={handleReset}
                    >Send Link
                </button>
            </form>
            <p>Return to <Link to="/login/">Login</Link>.</p>
        </div>
    );
}

export default Reset;