import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getAuth, GoogleAuthProvider, updateProfile} from "firebase/auth"
import { getDownloadURL, getStorage,ref,uploadBytes} from "firebase/storage"
import Loader from "./components/Loader/Loader";


const firebaseConfig = {
  apiKey: "AIzaSyCAwETf2WL9S6BOw8drs3quTdeEhl2-xsA",
  authDomain: "northwest-fitness-forum.firebaseapp.com",
  projectId: "northwest-fitness-forum",
  storageBucket: "northwest-fitness-forum.appspot.com",
  messagingSenderId: "56551829986",
  appId: "1:56551829986:web:fbda3eaa61a08b48f1c9bb",
  measurementId: "G-YY9EPJ1E6D"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()
const storage = getStorage()

export async function upload(file, currentUser) {
  const fileRef = ref(storage, currentUser,+".png")
  const snapshot = await uploadBytes(fileRef, file)
  const photoURL = await getDownloadURL(fileRef)
  const changeAvatar = await updateProfile(auth.currentUser, {photoURL: photoURL})
  Loader()
}