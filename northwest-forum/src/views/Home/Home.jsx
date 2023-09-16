import { projectInfo } from "../../common/constants";
import UserCount from "../../components/UserCount/userCount";
import PostCount from "../../components/PostCount/PostCount";
import MostRecentPosts from "../../components/MostRecentPosts/MostRecentPosts";
import MostCommentedPosts from "../../components/MostCommentedPosts/MostCommentedPosts";
import OneRepMaxCalculator from "../../components/1RepMaxCalculator/OneRepMaxCalculator";
import CalorieCalculator from "../../components/CalorieCalculator/CalorieCalculator";
import "./Home.css"


const Home = () => (
  <div className="homecontainer">
    <div className="home-info">
      <h2>Northwest Fitness Forum</h2>
      <h3>{projectInfo}</h3>
    </div>
    <div className="counts">
      <div className="current-users">
        <UserCount />
      </div>
      <div className="current-posts">
        <PostCount />
      </div>
    </div>
    <div className="recent-posts">
      <MostRecentPosts />
    </div>
    <div className="top-posts">
      <MostCommentedPosts />
    </div>
    <div className="calorie-calculator">
      <CalorieCalculator/>
    </div>
    <div className="calculator">
      <OneRepMaxCalculator />
    </div>
    
  </div>
);

export default Home;
