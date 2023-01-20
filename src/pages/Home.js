import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { updateFbProfile, updateFbEmail, deleteAccount } from "../firebase";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = ({ user }) => {
    const navigate = useNavigate();

    // empty user object
    const formUser = {
        uid: "",
        email: "",
        displayName: ""
    }

    // create state variable for user profile
    // const [currentUser, setCurrentUser] = useState();
    const [profile, setProfile] = useState(formUser);

    useEffect(() => {
        if (user) {
            // setUpdateForm(user);
            setProfile(user);
            // console.log(updateForm)
        } 
    }, [user])

    const handleChange = (event) => {
        setProfile({ ...profile, [event.target.name]: event.target.value });
    };

    const currentUser = user ? user : formUser;

    if (!currentUser.displayName) {
        currentUser.displayName = "No User Info"
    }

    const updateProfile = async (e) => {
        e.preventDefault();
        const name = profile.displayName;
        const email = profile.email;
        try {
            await updateFbEmail(email).then(() => {
                // Update successful.
                // console.log('Home Update successful.')
                })
        } catch (error) {
            console.log(error)
            if(error.code === 'auth/email-already-in-use'){
                toast.error('Account Already Exists');
            }
        }
        try {
            await updateFbProfile(name, email).then(() => {
                // Update successful.
                // console.log('Home Update successful.')
                })
        } catch (error) {
            // console.log(error)
            toast.error('Error Updating Account');
        }
        navigate('/');
    }

    const delAccount = async () => {
        await deleteAccount();
        navigate('/login');
    }

    const loaded = () => {
        let userName = null
        if (!currentUser.displayName || currentUser.displayName === "No User Info") {
            // currentUser.displayName = "No User Info"
            userName = currentUser.email
        } else {
            userName = currentUser.displayName.split(" ")[0];
        }

        return (
            <>
            <div className="homePage">
                {/* <h3>Home Page</h3> */}
                <h4>
                    Hello {userName}!
                </h4>
                <form className="updateForm" onSubmit={updateProfile}>
                    <span>
                        UID: {profile.uid}
                    </span>
                    <span>
                        <label htmlFor="email">Email: </label>
                        <input 
                            type="text" 
                            name="email" 
                            value={profile.email}
                            onChange={handleChange}
                        />
                    </span>
                    <span>
                        <label htmlFor="displayName">Full Name: </label>
                        <input 
                            type="text" 
                            name="displayName"
                            value={profile.displayName}
                            onChange={handleChange}
                        />
                    </span>
                    <button
                        type="button"
                        className='btn btn-success'
                        onClick={updateProfile}
                        ><span className="bi bi-archive"></span>&nbsp;Update Profile</button>
                </form>
            </div>
            <div className="delDiv">
                <h4>Warning: Clicking below will delete your account!</h4>
                <button
                    type="button"
                    className='btn btn-danger' 
                    onClick={delAccount}>
                    <span className="bi-trash"></span>&nbsp;Delete Account</button>

            </div>
            <ToastContainer />
            </>
        )
    }

    const loading = () => {
        return <h3>Loading...</h3>
    }

    return (
        <section>
            {user ? loaded() : loading()}
        </section>
    )
};

export default Home;