import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { useContext, useState } from 'react';
import { UserContext } from "../../App";
import { useHistory, useLocation } from "react-router";
import './Login.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";


if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
}

function Login() {
    const [isError, setIsError] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const checkValidation = (e) => {
        setConfirmPassword(e.target.value);
        if (password != e.target.value) {
            setIsError("Confirm Password Should match with Password")
        } else {
            setIsError("")
        }
    }

    const [newUser, setNewUser] = useState(false);
    const [user, setUser] = useState({
        isSignedIn: false,
        newUser: false,
        name: '',
        email: '',
        password: '',
    })

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };

    const googleProvider = new firebase.auth.GoogleAuthProvider();
    const fbProvider = new firebase.auth.FacebookAuthProvider();
    const handleGoogleSignIn = () => {
        firebase.auth().signInWithPopup(googleProvider)
            .then(res => {
                const { displayName, email } = res.user;
                const signedInUser = {
                    isSignedIn: true,
                    name: displayName,
                    email: email,
                }
                setLoggedInUser(signedInUser);
                history.replace(from);
            })
            .catch(error => {
                console.log(error);
                console.log(error.message);
            })
    }

    const handleFbSignIn = () => {
        firebase.auth().signInWithPopup(fbProvider)
            .then((result) => {
                const { displayName, email } = result.user;
                const signedInUser = {
                    isSignedIn: true,
                    name: displayName,
                    email: email,
                }
                setLoggedInUser(signedInUser);
                history.replace(from);
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                var email = error.email;
                var credential = error.credential;
            });
    }

    const handleSignOut = () => {
        firebase.auth().signOut()
            .then(res => {
                const signedOutUser = {
                    isSignedIn: false,
                    name: '',
                    email: '',
                    error: '',
                    success: false
                }
                setUser(signedOutUser);
            })
            .catch(error => {

            })
    }
    const handleBlur = (e) => {
        let isFormValid = true;
        if (e.target.name === 'email') {
            isFormValid = /\S+@\S+\.\S+/.test(e.target.value);
        }
        if (e.target.name === 'password') {
            const isPasswordValid = e.target.value.length > 6;
            const passwordHasNumber = /\d{1}/.test(e.target.value);
            isFormValid = isPasswordValid && passwordHasNumber;
        }
        if (isFormValid) {
            const newUserInfo = { ...user };
            newUserInfo[e.target.name] = e.target.value;
            setUser(newUserInfo);
        }
    }
    const handleSubmit = (e) => {
        console.log(user.email, user.password)
        if (newUser && user.email && user.password) {
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
                .then((res) => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = '';
                    newUserInfo.success = true;
                    setUser(newUserInfo);
                    updateUserName(user.name);
                })
                .catch(error => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = error.message;
                    newUserInfo.success = false;
                    setUser(newUserInfo);
                });
        }

        if (!newUser && user.email && user.password) {
            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
                .then((res) => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = '';
                    newUserInfo.success = true;
                    setUser(newUserInfo);
                    setLoggedInUser(newUserInfo);
                    history.replace(from);
                    console.log('sign in user info', res.user);
                })
                .catch((error) => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = error.message;
                    newUserInfo.success = false;
                    setUser(newUserInfo);
                });
        }

        e.preventDefault();
    }

    const updateUserName = (name) => {
        var user = firebase.auth().currentUser;

        user.updateProfile({
            displayName: name,
        }).then(function () {
            console.log('user name updated successfully')
        }).catch(function (error) {
            console.log(error)
        });
    }

    return (
        <div style={{ textAlign: 'center' }}>
            <div className='form-style'>
                <h3>{newUser ? 'Create an account' : 'Login'}</h3>

                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        {newUser && <input class="form-label" name="name" type="text" onBlur={handleBlur} placeholder="Your name" />}
                    </div>
                    <div className='mb-3'>
                        <input class="form-label" type="email" name="email" onBlur={handleBlur} placeholder="Your Email" required />
                    </div>
                    <div className='mb-3'>
                        <input class="form-label" type="password" id="password" name="password" onBlur={handleBlur} placeholder="Your Password" onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <div className='mb-3'>
                        {newUser && <input class="form-label" type="password" id="confirmPassword" name="confirmPassword" onBlur={handleBlur} placeholder="Confirm Password" onChange={(e) => checkValidation(e)} required />}
                    </div>
                    <button type="submit" class="btn btn-custom">{newUser ? 'Sign up' : 'Sign in'}</button>
                </form>
                <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id="newUser" />
                <label htmlFor="newUser">Don't have an account?</label>
            </div>
            <div className="error-handle">
                {isError}
            </div>

            <div className="button-fix">
                {
                    user.isSignedIn ? <button onClick={handleSignOut}>Sign Out</button> :
                        <button className="inner-button-fix" onClick={handleGoogleSignIn}><FontAwesomeIcon icon={faGoogle} /> Sign In using Google</button>
                }
            </div>
            <div className="button-fix">
                {
                    <button className="inner-button-fix" onClick={handleFbSignIn}><FontAwesomeIcon icon={faFacebook} /> Sign in using Facebook</button>
                }
            </div>

            <p style={{ color: 'red' }}>{user.error}</p>
            {user.success && <p style={{ color: 'green' }}>User {newUser ? 'Created' : 'Logged In'} Successfully</p>}
        </div>
    );
}

export default Login;
