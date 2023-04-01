import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile } from "../ReduxStore/AuthSlice";
import { updateProfile } from "../ReduxStore/AuthSlice";
import classes from "./Profile.module.css";

const Profile = () => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

    const nameInputRef = useRef("");
    const urlInputRef = useRef("");

    useEffect(() => {
      if (auth.photoUrl && auth.displayName) {
        nameInputRef.current.value = auth.displayName;
        urlInputRef.current.value = auth.photoUrl;
      } else {
        dispatch(fetchProfile({ idToken: auth.token }));
      }
    }, [auth.displayName, auth.photoUrl]);

    const updateHandler = (e) => {
        e.preventDefault();

        const enteredName = nameInputRef.current.value;
        const enteredUrl = urlInputRef.current.value;
        dispatch(
          updateProfile({
            displayName: enteredName,
            photoUrl: enteredUrl,
            idToken: auth.token,
          })
      
      );
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