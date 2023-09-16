import { useState, useEffect, useContext } from "react";
import { auth, db } from "../../firebase";
import {getDocs,collection,where,query,deleteDoc,doc,} from "firebase/firestore";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/AuthContext";
import PostForm from "./PostForm";
import "./Posts.css";

const Posts = () => {
  const [postList, setPostList] = useState([]);
  const [open, setIsOpen] = useState(false);
  const categoryData = useParams("");
  const postsCollection = collection(db, "posts");
  const categoryName = categoryData["category"];
  let navigate = useNavigate();
  const { isLoggedIn, isAdmin, isAuth } = useContext(AuthContext);

  useEffect(() => {
    const getPosts = async () => {
      const q = query(postsCollection, where("category", "==", categoryName));
      const data = await getDocs(q);
      setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getPosts();
  }, [categoryName]);

  const deletePost = async (postId) => {
    const postRef = doc(db, "posts", postId);
    await deleteDoc(postRef);
  };

  const handleGoBack = () => {
    navigate("/dashboard");
  };

  const openPost = (id) => {
    navigate(`/dashboard/${categoryName}/${id}`);
  };

  const openForm = () => setIsOpen(true);

  const [sortType, setSortType] = useState("ascending");
  const [sortByField, setSortByField] = useState("title");
  const [result, setResult] = useState("");
  const [state, setstate] = useState({
    query: "",
    list: postList,
  });

  const handleChange = (e) => {
    const results = postList.filter((post) => {
      if (e.target.value === "") return postList;
      return post[sortByField]
        .toLowerCase()
        .includes(e.target.value.toLowerCase());
    });
    setResult(results);
    setstate({
      query: e.target.value,
      list: sortFunc(results, sortType, sortByField),
    });
  };

  const truncateText = (text, limit) => {
    return text.length > limit ? text.substring(0, limit) + "..." : text;
  };
 
  function sortFunc(results, sortType, sortByField) {
    if (sortType === "ascending") {
      results.sort((a, b) => (a[sortByField] < b[sortByField] ? -1 : 1));
    } else if (sortType === "descending") {
      results.sort((a, b) => (b[sortByField] > a[sortByField] ? 1 : -1));
    }
    return results;
  }

  function updatePosts(e) {
    setSortType(e);
    setstate({
      query: state.query,
      list: !result
        ? sortFunc(postList, e, sortByField)
        : sortFunc(result, e, sortByField),
    });
  }

  const handleAddPostClick = () => {
    if (!isLoggedIn) {
      toast.error("You must be logged in to create a post!");
      navigate('/login');
      return;
    }
    openForm();
  };

  function sortBy(e) {
    setSortByField(e);
    setstate({
      query: state.query,
      list: !result
        ? sortFunc(postList, sortType, e)
        : sortFunc(result, sortType, e),
    });
  }

  const [isiton, setIt] = useState(false);

  function turnon() {
    setIt((isiton) => !isiton);
    window.scrollTo(0, 0);
  }

  return (
    <div className="categoryPosts">
      <div className="cat-name">{categoryName}</div>

      <div className="search">
        <button id="searchbutton" onClick={turnon}>
          Search
        </button>
        {isiton ? (
          <div>
            <form className="searchform">
              <span>Search:</span>
              <input
                onChange={handleChange}
                value={state.query}
                type="search"
              />
              <div className="filtersort">
                <span>Filter By:</span>
                <select
                  defaultValue={"title"}
                  onChange={(e) => sortBy(e.target.value)}
                >
                  <option value="title" disabled>
                    None
                  </option>
                  <option value="title">Title</option>
                  <option value="description">Description</option>
                </select>

                <span>Sort By:</span>
                <select
                  defaultValue={"DEFAULT"}
                  onChange={(e) => updatePosts(e.target.value)}
                >
                  <option value="DEFAULT" disabled>
                    None
                  </option>
                  <option value="ascending">Ascending</option>
                  <option value="descending">Descending</option>
                </select>
              </div>
            </form>
            {state.list.map((post, index) => {
              return (
                <div key={index} className="searchingpost">
                  <h3 className="postUsername"> @{post.name} </h3>
                  <div>
                    <div className="poststitle">{post.title}</div>
                    <div className="buttons">
                      {((isAuth && auth.currentUser && post.ids === auth.currentUser.uid) || isAdmin) && (
                        <button id="deletePost" onClick={() => { deletePost(post.id); }}>Delete</button>
                      )}
                      <div className="postText"> {post.postText} </div>
                      <div className="post-date">
                        {post.createdAt && post.createdAt.toDate().toLocaleString("en-GB", { day: "2-digit", month: "2-digit", year: "2-digit", hour: "2-digit", minute: "2-digit" }).split('/').join('.')}
                      </div>
                      <button id="viewpostbutton" onClick={() => { openPost(post.id) }}>View Post</button>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        ) : (
          <div>
            {postList.map((post, index) => {
              return (
                <div key={index} className="singlepost">
                  <h3 className="postUsername"> @{post.name} </h3>
                  <div className="poststitle">{post.title}</div>
                  <div className="postText">
                    {truncateText(post.postText, 300)}
                  </div>
                  <div className="post-date">
                    {post.createdAt && post.createdAt.toDate().toLocaleString("en-GB", { day: "2-digit", month: "2-digit", year: "2-digit", hour: "2-digit", minute: "2-digit" }).split('/').join('.')}
                  </div>
                  <div className="deshboardpostsbuttons">
                    {((isLoggedIn &&
                      auth.currentUser &&
                      post.ids === auth.currentUser.uid) ||
                      isAdmin) && (
                        <button
                          id="deletePost"
                          onClick={() => {
                            deletePost(post.id);
                          }}
                        >
                          Delete
                        </button>
                      )}

                    <button
                      id="viewpostbutton"
                      onClick={() => {
                        openPost(post.id);
                      }}
                    >
                      View Post
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <button id="goback" onClick={handleGoBack}>
        Go Back
      </button>
      <div className="addpostbutton">
        {!open && (
          <button id="formbutton" onClick={handleAddPostClick}>
            Add Post
          </button>
        )}
      </div>
      <div>
        {open && <PostForm categoryName={categoryName} setIsOpen={setIsOpen} />}
      </div>
    </div>
  );
};

export default Posts;
