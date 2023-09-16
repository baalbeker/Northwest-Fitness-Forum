import { useState, useEffect } from "react";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import Loader from "../Loader/Loader";

const UserCount = () => {
  const [userCount, setUserCount] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const usersCollection = collection(db, "users");
      const usersSnapshot = await getDocs(usersCollection);
      setUserCount(usersSnapshot.size);
    };
    fetchUsers();
  }, []);

  return (
    <div>
      <h5>Total registered users:</h5>
      <h1>{userCount !== null ? userCount : Loader()}</h1>
    </div>
  );
};

export default UserCount;
