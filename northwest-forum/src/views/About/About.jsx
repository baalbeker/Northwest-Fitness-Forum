import team12Image from "../../assets/images/logonew.png";
import samiImage from "../../assets/images/sami.jpg";
import "./About.css"

const About = () => (
  <>
    <h2 style={{textAlign:"center"}}>
  <img src={team12Image} alt="Team Image" className="team-logo" /> 
  </h2>
    <div className="member-content">
  
      <div className="personcolumn">
        <div className="personcard">
          <img src={samiImage} alt="Samuil" style={{width:"100%"}} />
          <div className="personcontainer">
            <h2>Samuil Yoshkov</h2>
            <p className="title">JS Developer</p>
            <p>Nature person that loves hiking and coding.His comfort zone is React</p>
            <p>samuilmnt@gmail.com</p>
            <p><button className="about-button">Contact</button></p>
          </div>
        </div>
      </div>

    </div>
  </>
);

export default About;
