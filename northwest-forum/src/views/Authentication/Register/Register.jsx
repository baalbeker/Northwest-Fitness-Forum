import { db, auth } from "../../../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { addDoc, collection } from 'firebase/firestore'
import { AuthContext } from "../../../Context/AuthContext";
import { useContext, useState} from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import "./Register.css"

const Register = () => {

    const { email, setEmail, password, setPassword, name, setName, username, setUsername, family, setFamily } = useContext(AuthContext);
    const [confirmPassword, setConfirmPassword] = useState("");


    const usersCollection = collection(db, "users")
    const addNames = async () => {
        await addDoc(usersCollection, { name: name, family: family, username: username, role: "user", isBlocked: false, email: email, password: password, id: auth.currentUser.uid });
    }

    let navigate = useNavigate();
    const handleRegCancel = () => {
        navigate("/login")
    }

    const saveName = () => {
        updateProfile(auth.currentUser, {
            displayName: `${name} ${family}`
        })
    }

    const validateInputs = () => {
        if (name.trim() === '') {
          toast.error('Please enter your first name!');
          return false;
        }
      
        if (family.trim() === '') {
          toast.error('Please enter your family name!');
          return false;
        }
      
        if (username.trim() === '') {
          toast.error('Please enter a username!');
          return false;
        }
      
        if (email.trim() === '') {
          toast.error('Please enter your email!');
          return false;
        }

        if (password !== confirmPassword) {
            toast.error("Passwords do not match!");
            return;
          }
      
        return true;
      };
    const signUp = (e) => {
        e.preventDefault()
        if (!validateInputs()) {
            return;
          }
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                saveName();
            })
            .then(() => addNames())
            .then(navigate("/"))
            .catch((error) => console.log(error))
    }

    return (
        <>
        <div className="register-overlay"></div>
    
        <div className="register-page">
            
            <form className="register-form" onSubmit={signUp}>
                <h2>Create an Account</h2>
                <div className="register-row">
                    <label>First Name</label>
                    <input
                        type="text"
                        placeholder="Enter your first name"
                        value={name}
                        maxLength='32'
                        minLength='4'
                        onChange={(e) => setName(e.target.value)}
                    />

                    <label>Family Name</label>
                    <input
                        type="text"
                        placeholder="Enter your family name"
                        value={family}
                        maxLength='32'
                        minLength='4'
                        onChange={(e) => setFamily(e.target.value)}
                    />

                    <label>Username:</label>
                    <input
                        type="text"
                        placeholder="Enter a username"
                        value={username}
                        maxLength='20'
                        minLength='3'
                        onChange={(e) => setUsername(e.target.value)}
                    />

                    <label>Email</label>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <label>Password</label>
                    <input
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <label>Confirm Password</label>
                    <input
                        type="password"
                        placeholder="Confirm your password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>
                <div className="button-container">
                    <button className="btn-sign-up" type="submit">Sign up</button>
                    <button className="btn-cancel" type="cancel" onClick={handleRegCancel}>Cancel</button>
                </div>
            </form>
            <ToastContainer position="top-center" style={{ zIndex: 2001, top: 30 }} />
        </div>
        </>
    )
}

export default Register;