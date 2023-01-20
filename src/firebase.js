// import firebase from "firebase";
import { initializeApp } from "firebase/app";
//firebase email auth dependencies
import { getAuth, 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword, 
    signOut, 
    updateProfile,
    deleteUser, 
    updateEmail,
    updatePassword,
    sendPasswordResetEmail} from "firebase/auth";
const firebaseConfig = {
    apiKey: "AIzaSyAFwm5pKsuCsRjr1XD3TEf4smp5-Gkz0Vk",
    authDomain: "cascadesocial-35fae.firebaseapp.com",
    projectId: "cascadesocial-35fae",
    storageBucket: "cascadesocial-35fae.appspot.com",
    messagingSenderId: "394569385974",
    appId: "1:394569385974:web:62a4193300125f0dc6a9d7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const authentication = getAuth(app);

// signin
export function logIn(email, password) {
    return signInWithEmailAndPassword(authentication, email, password)
}

// register
export function register(email, password) {
    return createUserWithEmailAndPassword(authentication, email, password)
}

// logout
export function logOut() {
    return signOut(authentication).then(() => {
        // Sign-out successful.
        // console.log('Sign-out successful.')
        }).catch((error) => {
        // An error happened.
        console.log(error)
    });
}

// update display name
export function updateFbProfile(displayName, email) {
    try {
        return updateProfile(authentication.currentUser, {
            displayName: displayName, 
        }).then(() => {
            // Update successful.
            console.log('Update successful.')
        })
    } catch (error) {
        // An error occurred.
        // console.log(error)
        return error
    }
}

// update email
export function updateFbEmail(email) {
    try {
        return updateEmail(authentication.currentUser, email).then(() => {
        // Update successful.
        console.log('Update successful.')
        })
    } catch (error) {
        // An error occurred.
        // console.log(error)
        return error
    }
}

// update password
export function updateFbPassword(user, newPassword) {
    try {
        return updatePassword(user, newPassword).then(() => {
        // Update successful.
        console.log('Update successful.')
        })
    } catch (error) {
        // An error occurred.
        return error
    }
}

// send password reset email
export function sendFbResetEmail(email) {
    return sendPasswordResetEmail(authentication, email).then(() => {
        // Email sent.
        console.log('Email sent.')
        }).catch((error) => {
        // An error ocurred
        console.log(error)
    });
}

// delete account
export function deleteAccount() {
    return deleteUser(authentication.currentUser).then(() => {
        // User deleted.
        console.log('User deleted.')
        }).catch((error) => {
        // An error ocurred
        console.log(error)
    });
}

// export app
export default app

