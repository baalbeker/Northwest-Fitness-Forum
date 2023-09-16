import { createContext } from "react";

/**
 * Context object for managing authentication-related data.
 * @typedef {Object} AuthContextType
 * @property {boolean} isLoggedIn - Flag indicating whether the user is logged in.
 * @property {Function} setIsLoggedIn - Function to set the logged-in status.
 * @property {string} currentUserEmail - The email of the current user.
 * @property {Function} setCurrentUserEmail - Function to set the current user's email.
 * @property {boolean} isAdmin - Flag indicating whether the user is an admin.
 * @property {Function} setIsAdmin - Function to set the admin status.
 * @property {Function} signOut - Function to sign out the user.
 * @property {string} email - The email value.
 * @property {Function} setEmail - Function to set the email value.
 * @property {string} password - The password value.
 * @property {Function} setPassword - Function to set the password value.
 * @property {string} name - The name value.
 * @property {Function} setName - Function to set the name value.
 * @property {string} photoURL - The photoURL value.
 * @property {Function} setPhotoURL - Function to set the photoURL value.
 * @property {string} username - The username value.
 * @property {Function} setUsername - Function to set the username value.
 * @property {string} family - The family value.
 * @property {Function} setFamily - Function to set the family value.
 * @property {string} userID - The user ID value.
 * @property {Function} setUserID - Function to set the user ID value.
 * @property {string} isBlocked - The block status value.
 * @property {Function} setIsBlocked - Function to set the block status value.
 */
export const AuthContext = createContext({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  currentUserEmail: "",
  setCurrentUserEmail: () => {},
  isAdmin: false,
  setIsAdmin: () => {},
  signOut: () => {},
  email: "",
  setEmail: () => {},
  password: "",
  setPassword: () => {},
  name: "",
  setName: () => {},
  photoURL: "",
  setPhotoURL: () => {},
  username: "",
  setUsername: () => {},
  family: "",
  setFamily: () => {},
  userID: "",
  setUserID: () => {},
  isBlocked: "",
  setIsBlocked: () => {}
});
