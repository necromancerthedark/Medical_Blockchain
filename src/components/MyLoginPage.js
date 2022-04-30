import MyButton from "./MyButton";
import "./MyLoginPage.css";
import { FaFacebook, FaGoogle, FaTwitter } from 'react-icons/fa';
import { useEffect, useState } from "react";
import { signup, useAuth, logout, signin } from "../firebase";
import { useNavigate } from 'react-router-dom';


const MyLoginPage = () => {

    // Use State Variables
    const [isSignUpContainerActive, setIsSignUpContainerActive] = useState(false);
    const [enteredName, setEnteredName] = useState("");
    const [enteredEmail, setEnteredEmail] = useState("");
    const [enteredPassword, setEnteredPassword] = useState("1111111");

    const currentUser = useAuth();
    const navigate = useNavigate();


    useEffect(() => {
        console.log("Logged In User :- ", currentUser);
    }, [])

    // Taking inputs
    const nameChangeHandler = (e) => { setEnteredName(e.target.value) };
    const emailChangeHandler = (e) => { setEnteredEmail(e.target.value) };
    const passwordChangeHandler = (e) => setEnteredPassword(e.target.value);

    // For Transitions
    const showSignUpContainer = (e) => setIsSignUpContainerActive(true);

    const showSignInContainer = (e) => setIsSignUpContainerActive(false);

    // SignUp and SignIn user Logic
    const signInHandler = (e) => {
        e.preventDefault();
        console.log("Logging you in...");
        signin(enteredEmail, enteredPassword)
            .then((data) => {
                console.log("Sign In successfull");
                console.log("Logged In User :- ", currentUser);
                navigate("/");
            })
            .catch((err) => {
                console.log("Error : " + err);
            });
        setEnteredEmail("");
        setEnteredPassword("");
    };

    const signUpHandler = (e) => {
        e.preventDefault();
        console.log("Registering you in...");
        signup(enteredEmail, enteredPassword)
            .then((data) => {
                console.log("Sign up successfull");
                navigate("/");
            })
            .catch((err) => console.log("Error : " + err));

        setEnteredName("");
        setEnteredEmail("");
        setEnteredPassword("");
    };

    return (
        <div className="body-container">
            <h1>Storing Medical Records On Blockchain</h1>
            <p>Currently logged in as {currentUser ? currentUser.email : "No user"}</p>
            {/* Contains Everything */}
            <div className={isSignUpContainerActive ? "container right-panel-active" : "container"} id="container">

                {/* Will be shown on right-side */}
                <div className="form-container sign-up-container">
                    <form action="#">
                        <h1>Create Account</h1>
                        <div className="social-container">
                            <a href="https://www.google.com/" className="social"><FaFacebook size='24' /></a>
                            <a href="https://www.google.com/" className="social"><FaGoogle size='24' /></a>
                            <a href="https://www.google.com/" className="social"><FaTwitter size='24' /></a>
                        </div>
                        <span>or use your email for registration</span>
                        <input type="text" placeholder="Name" value={enteredName} onChange={nameChangeHandler} />
                        <input type="email" placeholder="Email" value={enteredEmail} onChange={emailChangeHandler} />
                        <input type="password" placeholder="Password" value={enteredPassword} onChange={passwordChangeHandler} />
                        <MyButton className="main-btn" text="Sign Up" onClick={signUpHandler} />
                    </form>
                </div>

                {/* Will be shown on left-side */}
                <div className="form-container sign-in-container">
                    <form action="#">
                        <h1>Sign in</h1>
                        <div className="social-container">
                            <a href="https://www.google.com/" className="social"><FaFacebook size='24' /></a>
                            <a href="https://www.google.com/" className="social"><FaGoogle size='24' /></a>
                            <a href="https://www.google.com/" className="social"><FaTwitter size='24' /></a>
                        </div>
                        <span>or use your account</span>
                        <input type="email" placeholder="Email" list="emailAutoInputValues" value={enteredEmail} onChange={emailChangeHandler} />
                        <datalist id="emailAutoInputValues">
                            <option value="test@gmail.com" />
                            <option value="prakash@gmail.com" />
                        </datalist>
                        <input type="password" placeholder="Password" value={enteredPassword} onChange={passwordChangeHandler} />
                        <a href="#">Forgot your password?</a>
                        <MyButton className="main-btn" text="Sign In" onClick={signInHandler} />
                    </form>
                </div>


                <div className="overlay-container">
                    <div className="overlay">

                        {/* Will be shown on left-side */}
                        <div className="overlay-panel overlay-left">
                            <h1>Welcome Back!</h1>
                            <p>To keep connected with us please login with your personal info</p>
                            <MyButton className="ghost" id="signIn" text="Sign In" onClick={showSignInContainer} />
                        </div>

                        {/* Will be shown on right-side */}
                        <div className="overlay-panel overlay-right">
                            <h1>Hello, Friend!</h1>
                            <p>Enter your personal details and start journey with us</p>
                            <MyButton className="ghost" id="signUp" text="Sign Up" onClick={showSignUpContainer} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyLoginPage;