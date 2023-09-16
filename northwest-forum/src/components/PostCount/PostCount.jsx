import { useState, useEffect } from "react";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import Loader from "../Loader/Loader";

const PostCount = () => {
  const [postCount, setPostCount] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      const postsCollection = collection(db, "posts");
      const postsSnapshot = await getDocs(postsCollection);
      setPostCount(postsSnapshot.size);
    };
    fetchPosts();
  }, []);

  return (
    <div>
      <h5>Total posts created:</h5>
      <h1>{postCount !== null ? postCount : Loader()}</h1>
    </div>
  );
};

export default PostCount;
