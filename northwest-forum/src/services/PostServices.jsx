import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import {doc,getDoc,updateDoc,increment,deleteDoc,} from "firebase/firestore";

export const postLike = async (postID, userID,setPost) => {
  const post = doc(db, `posts/${postID}`);
  const postSnapshot = await getDoc(post);
  const postData = postSnapshot.data();

  const alreadyLiked = postData.likedBy && postData.likedBy.includes(userID);
  const alreadyDisliked =postData.dislikedBy && postData.dislikedBy.includes(userID);

  if (alreadyLiked) {
    await updateDoc(post, {
      likes: increment(-1),
      likedBy: postData.likedBy.filter((id) => id !== userID),
    });
  } else {
    await updateDoc(post, {
      likes: increment(1),
      likedBy: [...(postData.likedBy || []), userID],
    });
  }

  if (alreadyDisliked) {
    await updateDoc(post, {
      dislikes: increment(-1),
      dislikedBy: postData.dislikedBy.filter((id) => id !== userID),
    });
  }

  const updatedPostSnapshot = await getDoc(post);
  const updatedPostData = updatedPostSnapshot.data();

  setPost((prevState) => ({
    ...prevState,
    likes: updatedPostData.likes,
    dislikes: updatedPostData.dislikes,
    likedBy: updatedPostData.likedBy || [],
    dislikedBy: updatedPostData.dislikedBy || [],
  }));

};

export const postDislike = async (postID, userID,setPost) => {
    const post = doc(db, `posts/${postID}`);
    const postSnapshot = await getDoc(post);
    const postData = postSnapshot.data();

    const alreadyLiked = postData.likedBy && postData.likedBy.includes(userID);
    const alreadyDisliked =postData.dislikedBy && postData.dislikedBy.includes(userID);
  
      if (alreadyDisliked) {
        await updateDoc(post, {
          dislikes: increment(-1),
          dislikedBy: postData.dislikedBy.filter((id) => id !== userID),
        });
      } else {
        await updateDoc(post, {
          dislikes: increment(1),
          dislikedBy: [...(postData.dislikedBy || []), userID],
        });
      }
  
      if (alreadyLiked) {
        await updateDoc(post, {
          likes: increment(-1),
          likedBy: postData.likedBy.filter((id) => id !== userID),
        });
      }

      const updatedPostSnapshot = await getDoc(post);
      const updatedPostData = updatedPostSnapshot.data();
    
      setPost((prevState) => ({
        ...prevState,
        likes: updatedPostData.likes,
        dislikes: updatedPostData.dislikes,
        likedBy: updatedPostData.likedBy || [],
        dislikedBy: updatedPostData.dislikedBy || [],
      }));
    };
  
export const handleCommentLike = async (commentId,postID,userID) => {
    const commentDocRef = doc(db, `posts/${postID}/comments/${commentId}`);
    const commentSnapshot = await getDoc(commentDocRef);
    const commentData = commentSnapshot.data();

    const alreadyLiked =commentData.likedBy && commentData.likedBy.includes(userID);
    const alreadyDisliked =commentData.dislikedBy && commentData.dislikedBy.includes(userID);

    if (alreadyLiked) {
        await updateDoc(commentDocRef, {
        likes: increment(-1),
        likedBy: commentData.likedBy.filter((id) => id !== userID),
        });
    } else {
        await updateDoc(commentDocRef, {
        likes: increment(1),
        likedBy: [...(commentData.likedBy || []), userID],
        });
    }

    if (alreadyDisliked) {
        await updateDoc(commentDocRef, {
        dislikes: increment(-1),
        dislikedBy: commentData.dislikedBy.filter((id) => id !== userID),
        });
    }
    };

export const handleCommentDislike = async (commentId,postID,userID) => {
    const commentDocRef = doc(db, `posts/${postID}/comments/${commentId}`);
    const commentSnapshot = await getDoc(commentDocRef);
    const commentData = commentSnapshot.data();
    const alreadyLiked = commentData.likedBy && commentData.likedBy.includes(userID);
    const alreadyDisliked = commentData.dislikedBy && commentData.dislikedBy.includes(userID);

    if (alreadyDisliked) {
      await updateDoc(commentDocRef, {
        dislikes: increment(-1),
        dislikedBy: commentData.dislikedBy.filter((id) => id !== userID),
      });
    } else {
      await updateDoc(commentDocRef, {
        dislikes: increment(1),
        dislikedBy: [...(commentData.dislikedBy || []), userID],
      });
    }

    if (alreadyLiked) {
      await updateDoc(commentDocRef, {
        likes: increment(-1),
        likedBy: commentData.likedBy.filter((id) => id !== userID),
      });
    }
  };

export const deletePost = async (postId) => {
    let navigate = useNavigate();
    const postRef = doc(db, "posts", postId);
    await deleteDoc(postRef);
    navigate(-1);
  };

export const deleteComment = async (postId, commentId) => {
    const commentRef = doc(db, `posts/${postId}/comments/${commentId}`);
    try {
      await deleteDoc(commentRef);
      console.log("Comment deleted successfully.");
    } catch (error) {
      console.error("Error deleting comment: ", error);
    }
  };