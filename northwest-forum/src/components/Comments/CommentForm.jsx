import { useState,useContext } from "react";
import { db } from "../../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ToastContainer, toast } from 'react-toastify';
import { AuthContext } from "../../context/AuthContext";
import PropTypes from 'prop-types';
import 'react-toastify/dist/ReactToastify.css';

const CommentForm = ({ postId, user }) => {
  const [commentText, setCommentText] = useState("");
  const { isBlocked } = useContext(AuthContext);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
  
    if (commentText.trim() === "") {
      toast.error("Please add a comment!");
      return;
    }

    const commentsCollectionRef = collection(db, `posts/${postId}/comments`);
  
    await addDoc(commentsCollectionRef, {
      text: commentText,
      authorId: user.uid,
      authorName: user.displayName,
      createdAt: serverTimestamp(),
      dislikes: [],
    });
    setCommentText("");
  };

  return (
    <div className="commentform">
      {!isBlocked && (
        <form className="formincomments" onSubmit={handleCommentSubmit}>
        <textarea
          id="txtareacomments"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Add a comment..."
        ></textarea>
        <button id="commentsubmitbutton" type="submit">
          Add
        </button>
      </form>
      )}
      {isBlocked && (
        <div className="commentblocked">
          <h2>You are blocked and cannot post comments !</h2>
        </div>
      )}
      <ToastContainer position="top-center" style={{ zIndex: 2001, top: 30 }} />
    </div>
  );
};

CommentForm.propTypes = {
  postId: PropTypes.string.isRequired,
  user: PropTypes.shape({
    uid: PropTypes.string.isRequired,
    displayName: PropTypes.string.isRequired
  }).isRequired
};

export default CommentForm;
