import { handleCommentLike, handleCommentDislike, deleteComment } from "../../../services/Postservices";
import PropTypes from 'prop-types';


const CommentList = ({ comments, id, userID, isAdmin, handleGoBack, post }) => {

  return (
    <ul>
      {comments.map((comment) => (
        <div className="commentscontainer" key={comment.id}>
          <button id="goback" onClick={handleGoBack}>
            Go Back
          </button>
          <li key={comment.id} id="commentbox">
            <div className="commentauthor">by @{comment.authorName}</div>
            <div className="commenttitle">{comment.text}</div>
            <div className="likesdislikes">

              <button
                id="likecommentbutton"
                onClick={() => handleCommentLike(comment.id, id, userID)}
                disabled={comment.likedBy && comment.likedBy.includes(userID)}
              >Like
              </button>
              <div className="likesnum">{comment.likes} Likes</div>

              <button
                id="dislikecommentbutton"
                onClick={() => handleCommentDislike(comment.id, id, userID)}
                disabled={comment.dislikedBy && comment.dislikedBy.includes(userID)}
              >
                Dislike
              </button>
              <div className="dislikesnum">{comment.dislikes} Dislikes</div>

              {userID === comment.authorId || isAdmin ? (
                <button id="deleteComment" onClick={() => deleteComment(post.id, comment.id)}>
                  Delete
                </button>
              ) : null}


              {comment.createdAt && (
                <div className="commentdate">
                  <span className="date">
                    {comment.createdAt.toDate().toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit", year: "2-digit" }).split('/').join('.')}
                  </span>
                  <span className="time">
                    {comment.createdAt.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}
                  </span>
                </div>
              )}


            </div>
          </li>
        </div>
      ))}
    </ul>
  )
}

CommentList.propTypes = {
  comments: PropTypes.array.isRequired,
  id: PropTypes.string.isRequired,
  userID: PropTypes.string.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  handleGoBack: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

export default CommentList;