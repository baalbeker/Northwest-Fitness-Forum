import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import Loader from "../Loader/Loader";
import "./MostCommentedPosts.css";

const MostCommentedPosts = () => {
  const [postList, setPostList] = useState([]);

  useEffect(() => {

    const fetchPosts = async () => {
      const postsCollection = collection(db, "posts");
      const { docs } = await getDocs(postsCollection);
      const promises = docs.map(async (doc) => {
        const post = { ...doc.data(), id: doc.id };
        const commentsCollectionRef = collection(db,`posts/${post.id}/comments`);
        const commentsData = await getDocs(commentsCollectionRef);
        const commentCount = commentsData.size;
        return { ...post, commentCount };
      });
      const updatedPostList = await Promise.all(promises);
      const sortedPostList = updatedPostList.sort((a, b) => b.commentCount - a.commentCount);
      const slicedPostList = sortedPostList.slice(0, 10)
      setPostList(slicedPostList);
    };
    fetchPosts();
  }, []);

  return postList.length ? (
    <div className="mostcommented">
      <div>Top 10 most commented posts:</div>
      {postList.map((post) => (
        <div key={post.id}>
          <ul className="mostcommentedlist">
            <li className="commentedlinktitle">
              <Link to={`/dashboard/${post.category}/${post.id}`}>
                {post.title}
                <span className="commented-count">{post.commentCount}</span>
                <span className="commented-icon" />
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

export default MostCommentedPosts;
