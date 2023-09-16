import { NavLink } from "react-router-dom";
import { FaHome, FaNewspaper, FaInfoCircle, FaUser } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";
import { HiOutlineLogout } from "react-icons/hi";
import { onAuthStateChanged } from "firebase/auth";
import { AuthContext } from "../../Context/AuthContext";
import { auth } from "../../firebase";
import { useContext } from "react";
import defaultUserPhoto from "../../assets/images/default.png";
import logo from "../../assets/images/1234.png";
import "./Navigation.css";

const Navigation = () => {
  const { isLoggedIn, signOut, isAdmin, setEmail, name, setName } =
    useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [userPhoto, setUserPhoto] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    }
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setEmail(user.email);
        setName(user.displayName);
        setUserPhoto(user.photoURL);
      } else {
        setEmail("");
        setUserPhoto("");
      }
      setIsLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, [isLoggedIn]);

  return (
    <div className="navigation">
      <nav className="navbar">
        <NavLink className="logo" to="/">
          <img src={logo} alt="Logo" />
        </NavLink>
        <ul className="main-nav">
          <li>
            <NavLink activeclassname="active" to="/">
              <FaHome /> Home
            </NavLink>
          </li>
          <li>
            <NavLink activeclassname="active" to="/dashboard">
              <FaNewspaper /> Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink activeclassname="active" to="/about">
              <FaInfoCircle /> About
            </NavLink>
          </li>
          {isLoggedIn ? (
            <li className="user-profile" ref={dropdownRef}>
              <div className="dropdown" onClick={() => setDropdownOpen(!dropdownOpen)}>
                <div className="name-avatar">
                  <span>{name}</span>
                  <img
                    src={userPhoto || defaultUserPhoto}
                    alt="User"
                    onError={(e) => {
                      e.target.src = defaultUserPhoto;
                    }}
                  />
                </div>
                {dropdownOpen && (
                  <ul className="dropdown-menu">
                    {isAdmin && (
                      <li>
                        <div className="usersearch">
                          <NavLink to="/users"> Users </NavLink>
                        </div>
                      </li>
                    )}
                    <li onClick={(event) => event.stopPropagation()}>
                      <a href="/account"><FaUser /> Profile</a>
                    </li>
                    <li onClick={(event) => event.stopPropagation()}>
                      <button className="btn-signout" onClick={signOut}>
                        <HiOutlineLogout /> Sign out
                      </button>
                    </li>
                  </ul>
                )}
              </div>
            </li>
          ) : (
            <li>
              <div className="login-button">
                <NavLink to="/login" className="nav-link">
                  Login
                </NavLink>
              </div>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Navigation;
