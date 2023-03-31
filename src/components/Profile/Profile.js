import React, { useContext, useRef, useEffect } from 'react'
import AuthContext from '../Store/auth-context'
import classes from "./Profile.module.css";
const Profile = () => {
    const authCtx = useContext(AuthContext);

    const nameInputRef = useRef("");
    const urlInputRef = useRef("");

    useEffect(() => {
      fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDNVxXpsDegs-5H2vmDbmQSr_ngPiYwQwo",
        {
          method: "POST",
          body: JSON.stringify({
          idToken: authCtx.token,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            return res.json().then((data) => {
              let errMsg = "Authentication Failed";
              throw new Error(errMsg);
            });
          }
        })
        .then((data) => {
          nameInputRef.current.value = data.users[0].displayName;
          urlInputRef.current.value = data.users[0].photoUrl;
        })
        .catch((err) => alert(err.message));
    }, []);

    const updateHandler = (e) => {
        e.preventDefault();

        const enteredName = nameInputRef.current.value;
        const enteredUrl = urlInputRef.current.value;
        console.log(authCtx.token);

fetch(
    "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDNVxXpsDegs-5H2vmDbmQSr_ngPiYwQwo",
    {
        method: "POST",
        body: JSON.stringify({
          displayName: enteredName,
          photoUrl: enteredUrl,
          returnSecureToken: true,
          idToken: authCtx.token,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "Authentication Failed";
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => alert(err.message));
    };

  return (
    <div className={classes.profile}>
      <div className={classes.contact}>
        <div>Contact Details</div>
        <button>Cancel</button>
      </div>
      <div className={classes.inner}>
        <label>Full Name:</label>
        <input type="text" id="name" required ref={nameInputRef} />
        <label>Profile Photo URL:</label>
        <input type="url" id="profile" required ref={urlInputRef} />
        <div>
          <button onClick={updateHandler}>Update</button>
        </div>
      </div>
    </div>
  );
}

export default Profile