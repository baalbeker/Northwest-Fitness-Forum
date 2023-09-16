import { auth, provider } from "../../../firebase";
import { AuthContext }  from "../../../Context/AuthContext";
import { signInWithEmailAndPassword, signInWithPopup, onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useState} from "react";
import { useContext } from "react";
import { FcGoogle } from 'react-icons/fc';
import { Link } from "react-router-dom";
import "./Login.css"
import { ToastContainer, toast } from "react-toastify";


const Login = () => {
  const { isLoggedIn, setIsLoggedIn, email, setEmail, password, setPassword } = useContext(AuthContext);
  const [user, setUser] = useState("{}")

  onAuthStateChanged(auth, (currentUser) =>{
    setUser(currentUser)
  })

  let navigate = useNavigate();

  const signIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        localStorage.setItem("isAuth", true);
        setIsLoggedIn(true);
        navigate("/");
        console.log(userCredential.user.email);
      })
      .catch((error) => {
        console.log(error);
        if (error.code === "auth/invalid-email" || error.code === "auth/user-not-found" || error.code === "auth/wrong-password") {
          toast.error("Incorrect email or password! Please try again.");
        } else {
          toast.error("An error occurred. Please try again later.");
        }
      });
  };

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        localStorage.setItem("isAuth", true);
        setIsLoggedIn(true);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="login-overlay"></div>
      <div className="login-page">
        <form className="login-form" onSubmit={signIn}>
          <h2>Log In</h2>
          <div className="input-row">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></input>
          </div>
          <div className="input-row">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </div>
          <button className="login-submit" type="submit">Log in</button> 
          <div className="alternative-login">
            <label>Or sign in with:</label>
            <span
              className="login-with-google-btn"
              role="button"
              tabIndex={0}
              onClick={signInWithGoogle}
            >
              <FcGoogle className="google-icon" />
            </span>
          </div>
          <p className="register-prompt">
            Don&apos;t have an account?{" "}
            <Link to={"/register"}>Register now!</Link>
          </p>
        </form>
        <ToastContainer position="top-center" style={{ zIndex: 2001, top: 30 }} />
      </div>
    </>
  );
};

export default Login;
