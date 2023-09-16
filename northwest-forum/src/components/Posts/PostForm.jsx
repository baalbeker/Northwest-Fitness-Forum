import { useState, useContext } from "react";
import { addDoc, collection,serverTimestamp } from "firebase/firestore";
import { db, auth } from "../../firebase";
import { refreshPage } from "../../services/Services";
import { AuthContext } from "../../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import PropTypes from 'prop-types';
import "./PostForm.css";

const PostForm = ({ categoryName, setIsOpen }) => {
  const [title, setTitle] = useState("");
  const [postText, setPostText] = useState("");

  const handleCancelClick = () => {
    setIsOpen(false);
  };
  const postsCollection = collection(db, "posts");
  const { isLoggedIn, isBlocked } = useContext(AuthContext);

  const createPost = async () => {
    if (
      postText.length > 32 &&
      postText.length < 8192 &&
      title.length > 16 &&
      title.length < 64
    ) {
      await addDoc(postsCollection, {
        title: title,
        postText: postText,
        category: categoryName,
        createdAt: serverTimestamp(),
        name: auth.currentUser.displayName,
        ids: auth.currentUser.uid,
        likes:0,
        dislikes:0,
        likedBy:null,
        dislikedBy:null,
      });
      setTitle("");
      setPostText("");
      refreshPage();
    } else if (postText.length < 32 || postText.length > 8192) {
      toast.error("Post should be between 32 and 8192 symbols !");
      setPostText("");
    } else if (title.length < 16 || title.length > 64) {
      toast.error("Title should be between 4 and 32 symbols !");
      setTitle('')
    }
  };

  return (
    <div>
      {isLoggedIn && isBlocked === false ? (
        <div className="postform">
          <h2>Add a New Post</h2>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
          <label htmlFor="content">Content:</label>
          <textarea
            id="posttext"
            value={postText}
            onChange={(event) => setPostText(event.target.value)}
          />
          <button id="post-submit" type="submit" onClick={createPost}>
            Submit
          </button>
          <button id="cancel" type="cancel" onClick={handleCancelClick}>
            Cancel
          </button>
        </div>
      ) : (
        <div className="notlogged">
          {isBlocked ? (
            <h2>You are blocked and cannot create posts !</h2>
          ) : (
            <h2>You must be logged in to create a post!</h2>
          )}
        </div>
      )}
      <ToastContainer position="top-center" style={{ zIndex: 2001, top: 30 }} />
    </div>
  );
};

PostForm.propTypes = {
  categoryName: PropTypes.string.isRequired,
  setIsOpen: PropTypes.func.isRequired
};

export default PostForm;
