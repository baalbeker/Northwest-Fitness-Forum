import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import Loader from "../Loader/Loader";
import './MostRecentPosts.css'

const MostRecentPosts = () => {
  const [postList, setPostList] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const postsCollection = collection(db, "posts");
      const data = await getDocs(postsCollection);
      const postsSnapshot = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      const sortedPosts = postsSnapshot.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
      const tenRecentPosts = sortedPosts.slice(0, 10);
      setPostList(tenRecentPosts);
    };
    fetchPosts();
  }, []);

  return postList.length ? (
    <div className="mostrecent">
      <div>Top 10 most recent posts:</div>
      {postList.map((post) => (
        <div key={post.id}>
        <ul className="mostrecentlist">
          <li>
            <Link to={`/dashboard/${post.category}/${post.id}`}>
                {post.title}
                <span className="recent-icon"></span>
            </Link>
          </li>
        </ul>
        </div>
      ))}
    </div>
  ) : (
    <Loader />
  );
};

export default MostRecentPosts;
