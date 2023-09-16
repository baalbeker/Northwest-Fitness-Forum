import { updateEmail } from "firebase/auth";
import { useState, useContext } from "react";
import { upload, auth } from "../../firebase";
import { AuthContext } from "../../Context/AuthContext";
import { refreshPage } from "../../services/Services";
import "./Account.css";


const Account = () => {
  const { email, setEmail, name, photoURL, userID } = useContext(AuthContext);
  const [changedEmail, setChangedEmail] = useState("");
  const [showInputForm, setShowInputForm] = useState(false);
  const [showEmailInputForm, setShowEmailInputForm] = useState(false);

  function handleShowInputForm() {
    setShowInputForm((showInputForm) => !showInputForm);
  }

  function handleShowEmailInputForm() {
    setShowEmailInputForm((showEmailInputForm) => !showEmailInputForm);
  }

  function handleUploadPhoto(photo) {
    if (photo) {
      upload(photo, userID);
    }
  }

  function handleChangeEmail(event) {
    setChangedEmail(event);
  }

  function changeTheEmail() {
    updateEmail(auth.currentUser, changedEmail).then(() => {
      setEmail(changedEmail);
      setShowEmailInputForm(false);
    });
  }

  return (
    <div className="accountcontainer">
      <div className="avatarcontainer">
        <img className="avatar" src={photoURL} alt="Avatar" />
        {showInputForm && (
          <>
            <input
              className="avatarinputform"
              type="file"
              onChange={(e) => handleUploadPhoto(e.target.files[0])}
            />
            <button id="uploadbutton" onClick={() => refreshPage()}>
              Upload
            </button>
          </>
        )}

        <button id="changebutton" onClick={handleShowInputForm}>
          {showInputForm ? "Cancel" : "Change avatar"}
        </button>
      </div>
      <div className="accinfo">
        <h1>Account Information:</h1>
        <h3>Account name: {name}</h3>
        <h3>Account email: {email}</h3>
        <div className="changeemail">
        {showEmailInputForm && (
            <>
              <input
                className="emailinputform"
                placeholder="Enter your new email"
                type="email"
                onChange={(e) => handleChangeEmail(e.target.value)}
              />
              <button id="change" onClick={() => changeTheEmail()}>
                Change
              </button>
            </>
          )}
          <button
            className="changeemailbutton"
            onClick={handleShowEmailInputForm}
          >
            {showEmailInputForm ? "Cancel" : "Change email"}
          </button>
          
        </div>
      </div>
    </div>
  );
};

export default Account;
