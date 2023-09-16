import { db } from "../../firebase";
import { getDocs, collection, query, where, deleteDoc,doc,updateDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import "./UserSearch.css"


const UserSearch = () => {
  const usersCollection = collection(db, "users");
  const [userList, setUserList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("name");

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchTypeChange = (event) => {
    setSearchType(event.target.value);
  };

  useEffect(() => {

    const getUsers = async () => {
      let q;
      if (searchTerm.trim() !== "") {
        if (searchType === "name") {
          q = query(usersCollection, where("name", "==", searchTerm));
        } else if (searchType === "email") {
          q = query(usersCollection, where("email", "==", searchTerm));
        } else if (searchType === "username") {
          q = query(usersCollection, where("username", "==", searchTerm));
        }
      } else {
        q = query(usersCollection);
      }
      const data = await getDocs(q);
      setUserList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getUsers();
  }, [searchTerm, searchType]);

  const handleDeleteUser = async (userId) => {
    await deleteDoc(doc(usersCollection, userId));
    setUserList(userList.filter(user => user.id !== userId));
  }

  const handleBlockUser = async (userId) => {
    const data = {isBlocked: true}
    const docRef = doc(db,"users",userId)
    await updateDoc(docRef, data);
    refreshPage()
  }

  const handleUnblockUser = async (userId) => {
    const data = {isBlocked: null}
    const docRef = doc(db,"users",userId)
    await updateDoc(docRef, data);
  }

  return (
    <div className="userscontainer">
      <form>
        <label className="searchby">
          Search by:
          <select value={searchType} onChange={handleSearchTypeChange}>
            <option value="name">Name</option>
            <option value="username">Username</option>
            <option value="email">Email</option>
          </select>
        </label>
        <label>
          Search term:
          <input className="inputt" type="text" value={searchTerm} onChange={handleSearchTermChange} />
        </label>
      </form>
      {userList.map((user) => {
        return (
          <div className="singlepost" key={user.id}>
            <h2>{user.name}</h2>
            <p>{user.username}</p>
            <p>{user.email}</p>
            <button className="deleteuser" onClick={() => handleDeleteUser(user.id)}>Delete</button>
            {user.isBlocked===true
            ? <button className="unblockuser" onClick={() => handleUnblockUser(user.id)}>Unblock</button>
            : <button className="blockuser" onClick={() => handleBlockUser(user.id)}>Block</button>
            }
          </div>
        )
      })}
    </div>
  )
}

export default UserSearch
