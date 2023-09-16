import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { signOut } from "firebase/auth";
import { getDocs, collection, where, query } from "firebase/firestore";
import { auth, db } from "./firebase";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./Context/AuthContext";
import "./App.css";

import Home from "./views/Home/Home";
import About from "./views/About/About";
import NotFound from "./views/NotFound/NotFound";
import Navigation from "./components/Navigation/Navigation";
import Login from "./views/Authentication/Login/Login";
import Register from "./views/Authentication/Register/Register";
import Dashboard from "./views/Dashboard/Dashboard";
import SinglePost from "././components/Posts/SinglePost/SInglePost";
import Posts from "./components/Posts/Posts";
import Account from "./views/Account/Account";
import UserSearch from "./components/Admin/UserSearch";
import Footer from "./components/Footer/Footer";

function App() {
  const adminEmail = "samuil_mnt@abv.bg";
  const [isAuth, setIsAuth] = useState(
    localStorage.getItem("isAuth") === "true"
  );
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setAdmin] = useState(false);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [family, setFamily] = useState("");
  const [photoURL, setPhotoURL] = useState(
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
  );
  const [userID, setUserID] = useState("");
  const [isBlocked, setIsBlocked] = useState(false);
  const navigate = useNavigate();

  const usersCollection = collection(db, "users");

  useEffect(() => {
    const getUsers = async () => {
      const q = query(usersCollection, where("id", "==", userID));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        if (doc.data().isBlocked === true) {
          setIsBlocked(true);
        }
      });
    };
    getUsers();
  }, [userID]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setEmail(user.email);
        setIsAuth(true);
        setAdmin(user.email === adminEmail);
        setPhotoURL(user.photoURL || photoURL);
        setUserID(user.uid);
      } else {
        setEmail("");
        setIsAuth(false);
        setAdmin(false);
        setIsBlocked(false);
      }
    });
    return unsubscribe;
  }, [adminEmail]);


  const signUserOut = () => {
    signOut(auth)
      .then(() => {
        localStorage.setItem("isAuth", false);
        setIsAuth(false);
        setEmail("");
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isAuth,
        setIsLoggedIn: setIsAuth,
        email: email,
        setEmail,
        isAdmin,
        setIsAdmin: setAdmin,
        signOut: signUserOut,
        password,
        setPassword,
        name,
        setName,
        photoURL,
        setPhotoURL,
        username,
        setUsername,
        family,
        setFamily,
        userID,
        setUserID,
        isBlocked,
        setIsBlocked,
      }}
    >
      <div className="App">
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/:category" element={<Posts />} />
          <Route path="/dashboard/:category/:id" element={<SinglePost />} />
          <Route path="/login" element={<Login />} />
          <Route path="/account" element={<Account />} />
          <Route path="/register" element={<Register />} />
          <Route path="/users" element={<UserSearch />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </div>
    </AuthContext.Provider>
  );
}

export default App;
