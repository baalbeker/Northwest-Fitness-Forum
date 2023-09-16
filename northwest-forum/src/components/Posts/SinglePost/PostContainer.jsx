import { postLike, postDislike, deletePost } from "../../../services/PostServices";
import PropTypes from 'prop-types';

const PostContainer = ({ post, showEditInputForm, handleShowEditInputForm, changedPost, setChangedPost, editPost, userID, isAdmin, setPost }) => {

  return (
 
    <div className="postcontainer">
    <h3 className="post-username">@{post.name}</h3>
    <h2 id="singletitle">{post.title}</h2>
    <div className="singleposttext">{post.postText}</div>
    <div className="post-date">
      {post.createdAt && post.createdAt.toDate().toLocaleString("en-GB", { day: "2-digit", month: "2-digit", year: "2-digit", hour: "2-digit", minute: "2-digit" }).split('/').join('.')}
    </div>
    <div className="buttons-likes">
      <div className="likesdislikes">
        <button
          id="likepostbutton"
          onClick={() => postLike(post.id, userID, setPost)}
          disabled={post.likedBy && post.likedBy.includes(userID)}
        >Like</button>
        <div className="postlikesnum">{post.likes} Likes</div>

        <button
          id="dislikepostbutton"
          onClick={() => postDislike(post.id, userID, setPost)}
          disabled={post.dislikedBy && post.dislikedBy.includes(userID)}
        >Dislike</button>
        <div className="postdislikesnum">{post.dislikes} Dislikes</div>
      </div>

      <div className="edit-delete-buttons">
      {isAdmin || userID === post.ids && (
        <button id="deletePostbtn" onClick={() => { deletePost(post.id) }}>Delete</button>
      )}
      {userID === post.ids && (
        <button id="edit-button" onClick={() => { handleShowEditInputForm(post.id, post.postText); }}>
          {showEditInputForm ? "Cancel" : "Edit"}
        </button>
      )}
    </div>
    </div>
    
    {showEditInputForm && (
      <div className="editpostform">
        <h2>Edit post:</h2>
        <textarea id="edittextarea" value={changedPost} onChange={(event) => setChangedPost(event.target.value)} />
        <button id="donebutton" onClick={() => editPost(post.id)}>Done</button>
      </div>
    )}
  </div>
  )
}

PostContainer.propTypes = {
  post: PropTypes.object.isRequired,
  showEditInputForm: PropTypes.bool.isRequired,
  handleShowEditInputForm: PropTypes.func.isRequired,
  changedPost: PropTypes.string.isRequired,
  setChangedPost: PropTypes.func.isRequired,
  editPost: PropTypes.func.isRequired,
  userID: PropTypes.string.isRequired,
  isAdmin: PropTypes.bool.isRequired,
};

export default PostContainer;