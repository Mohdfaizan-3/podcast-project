import { doc, getDoc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { db, storage } from "../../utils/firebase.utils";
import "./style.css"

const Profile = () => {
  const user = useSelector((state) => state.user.user);
  const [isSubmitting, setSubmitting] = useState(false)
  const [userData, setUserData] = useState({
    displayName: "",
    picture: null,
  });

  useEffect(() => {
    const getUserData = async () => {
      try {
        const userDocRef = doc(db, "users", user.uid);

        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          const userDataFromFirestore = userDocSnap.data();

          setUserData(userDataFromFirestore);
        } else {
          toast.error("error in getting profile data");
        }
      } catch (error) {
        console.error("error:", error);
      }
    };

    getUserData();
  },[user.uid, isSubmitting]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true)
    try {
      const userDocRef = doc(db, "users", user.uid);

      const userImageRef = ref(storage, `users/${user.uid}/${Date.now()}`);
      await uploadBytes(userImageRef, userData?.picture);
      const userImageUrl = await getDownloadURL(userImageRef);
      const updatedUserData = { ...userData, picture: userImageUrl };
      await updateDoc(userDocRef, updatedUserData);
      setUserData(updatedUserData);

      toast.success("Profile updated successfully!");
      setSubmitting(false)
    } catch (error) {
      toast.error("Error updating profile:", error);
      setSubmitting(false)
    }

    setUserData({
      displayName: "",
      picture: null,
    });
  };

  const onFileHandler = (e) => {
    const { name, files } = e.target;
    if (files.length > 0) {
      const file = files[0];
      setUserData({
        ...userData,
        [name]: file,
      });
    }
  };
  return (
    <div >
    <div style={{ textAlign: "center" }}>
    <h1>Profile</h1>
      {userData.picture ? (
        <div>
          <img src={userData.picture} alt="profile" />
        </div>
      ) : null}
      {userData.displayName && <p>{userData.displayName}</p>}
    {  userData.email && <p>{userData.email}</p>}
    </div>
     
      <form className="container" onSubmit={handleFormSubmit}>
        <label htmlFor="displayName">Name</label>
        <input
          name="displayName"
          type="text"
          value={userData.displayName}
          onChange={handleInputChange}
          id="displayName"
        />
        <label htmlFor="user-input-image" className="input">
          {userData.picture === undefined || userData?.picture === null ? (
            <span
              style={{ fontWeight: "bold", fontSize: "1rem", color: "red" }}
            >
              image not added
            </span>
          ) : (
            <span
              style={{ fontWeight: "bold", fontSize: "1rem", color: "green" }}
            >
              image added
            </span>
          )}
        </label>

        <input
          name="picture"
          type="file"
          accept="image/*"
          id="user-input-image"
          style={{ display: "none" }}
          onChange={onFileHandler}
          required={false}
        />
        <button type="submit" disabled={isSubmitting}>{isSubmitting ? "submitting" : "update profile"}</button>
      </form>
    </div>
  );
};

export default Profile;
