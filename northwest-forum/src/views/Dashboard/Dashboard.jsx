import { Link } from "react-router-dom";
import { categories } from "../../common/constants"
import "./Dashboard.css"

const Dashboard = () => {
  return (
    <main>
      <div className="dashboard">
        <h2>Categories:</h2>
        <ul>
          {categories.map((category, index) => (
            <li key={index}>
              <Link to={`/dashboard/${category}`}>{category}</Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
};

export default Dashboard;
