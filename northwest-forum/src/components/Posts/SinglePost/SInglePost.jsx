import { useState, useEffect, useContext } from "react";
import { db, auth } from "../../../firebase";
import { doc, getDoc, collection, query, orderBy, onSnapshot, updateDoc } from "firebase/firestore";
import { useParams, useNavigate } from "react-router-dom";
import CommentForm from "../../Comments/CommentForm";
import { AuthContext } from "../../../context/AuthContext";
import PostContainer from "./PostContainer";
import CommentList from "./CommentList"
import "./SinglePost.css";

const SinglePost = () => {
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [showEditInputForm, setShowEditInputForm] = useState(false);
  const [changedPost, setChangedPost] = useState("");
  const { id } = useParams();
  const { isLoggedIn, isAdmin, userID } = useContext(AuthContext);
  let navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      const postDoc = doc(db, "posts", id);
      const postSnapshot = await getDoc(postDoc);
      if (postSnapshot.exists()) {
        setPost({ id: postSnapshot.id, ...postSnapshot.data() });
      } else {
        console.log("No such post document!");
      }
    };
    fetchPost();
  }, [id]);

  useEffect(() => {
    const commentsCollectionRef = collection(db, `posts/${id}/comments`);
    const commentsQuery = query(commentsCollectionRef, orderBy("createdAt"));
    const unsubscribe = onSnapshot(commentsQuery, (querySnapshot) => {
      const newComments = [];
      querySnapshot.forEach((doc) => {
        newComments.push({ id: doc.id, ...doc.data() });
      });
      setComments(newComments);
    });
    return unsubscribe;
  }, [id]);

  const handleAddComment = (newComment) => {
    setComments([...comments, newComment]);
  };

  
  function handleShowEditInputForm(postId, postText) {
    setShowEditInputForm((showEditInputForm) => !showEditInputForm);
    setChangedPost(postText);
  }

  const editPost = async (postId) => {
    const postRef = doc(db, "posts", postId);
    await updateDoc(postRef, { postText: changedPost });
    setPost((prevState) => ({
      ...prevState,
      postText: changedPost
    }));
    setChangedPost("");
    setShowEditInputForm(false);
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="singlepostcontainer">
      <PostContainer
        post={post}
        setPost={setPost}
        showEditInputForm={showEditInputForm}
        handleShowEditInputForm={handleShowEditInputForm}
        changedPost={changedPost}
        setChangedPost={setChangedPost}
        editPost={editPost}
        userID={userID}
        isAdmin={isAdmin}
      />

      {isLoggedIn && post?.id && (<CommentForm postId={post.id} user={auth.currentUser} onAddComment={handleAddComment} />)}

      <div className="commentslabel">Comments:</div>
      <CommentList
        comments={comments}
        id={id}
        userID={userID}
        isAdmin={isAdmin}
        handleGoBack={handleGoBack}
        post={post}
      />

    </div>
  );
};

export default SinglePost;
