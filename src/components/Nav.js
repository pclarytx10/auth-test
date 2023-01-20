import { Link, useNavigate } from 'react-router-dom';
import { logOut } from '../firebase';

const Nav = (props) => {
    const { user, setUser } = props;
    const navigate = useNavigate();

    // logout function
    const handleLogout = () => {
        logOut()
        setUser(null)
        navigate('/login')
    }

    if (user) {
        return (
            <div className="navbar">
                <Link to="/">
                    <div>Home</div>
                </Link>
                <button
                    type="button"
                    className='btn btn-primary' 
                onClick={handleLogout}>
                    <span className="bi-box-arrow-left"></span>&nbsp;LogOut</button>
            </div>
        );
    } else {
        return (
            <div className="navbar">
                {/* <Link to="/login">
                    <div>Login</div>
                </Link> */}
                {/* <Link to="/register">
                    <div>Register</div>
                </Link> */}
            </div>
        );
    }
}

export default Nav;