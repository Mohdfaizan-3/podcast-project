import { addDoc, collection } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { db, storage } from "../../utils/firebase.utils";
import "./style.css";
const defaultFormFeilds = {
  title: "",
  description: "",
  bannerImg: null,
  smallImg: null,
};
const CreatePodcast = () => {
  const [formFeilds, setFormFeilds] = useState(defaultFormFeilds);
  const { title, description, bannerImg, smallImg } = formFeilds;
  const [isSubmitting, setSubmitting] = useState(false);

  const currentUser = useSelector((state) => state.user.user);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormFeilds({
      ...formFeilds,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const bannerImageRef = ref(
        storage,
        `podcasts/${currentUser.uid}/${Date.now()}`
      );

      await uploadBytes(bannerImageRef, bannerImg);
      const bannerImageUrl = await getDownloadURL(bannerImageRef);

      const displayImageRef = ref(
        storage,
        `podcast/${currentUser.displayName}/${Date.now()}`
      );
      await uploadBytes(displayImageRef, smallImg);
      const displayImageUrl = await getDownloadURL(displayImageRef);

      const podcastData = {
        title,
        description,
        bannerImage: bannerImageUrl,
        displayImage: displayImageUrl,
        createdBy: currentUser.displayName,
      };
      const docRef = await addDoc(collection(db, "podcasts"), podcastData);
      toast.success("created");
    //   Navigate(`/podcast/${docRef}`);
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
    setSubmitting(false);

  };

  const onFileHandler = (e) => {
    const { name, files } = e.target;
    if (files.length > 0) {
      const file = files[0];
      setFormFeilds({
        ...formFeilds,
        [name]: file,
      });
    }
  };

  return (
    <div className="create-podcast-container">
      <h2>create a podcast</h2>
      <form onSubmit={handleSubmit}>
        <input
          autoComplete="true"
          type="text"
          placeholder="enter the name"
          onChange={handleChange}
          value={title}
          required
          name="title"
        />

        <input
          autoComplete="true"
          type="text"
          placeholder="description"
          onChange={handleChange}
          value={description}
          required
          name="description"
        />
        <label htmlFor="banner-input-image" className="input">
          {bannerImg === null ? (
            "banner Img"
          ) : (
            <span
              style={{ fontWeight: "bold", fontSize: "1rem", color: "white" }}
            >
              {bannerImg.name}
            </span>
          )}
        </label>

        <input
          type="file"
          accept="image/*"
          id="banner-input-image"
          style={{ display: "none" }}
          onChange={onFileHandler}
          name="bannerImg"
          required
        />

        <label htmlFor="small-input-image" className="input">
          {smallImg === null ? (
            "small Img"
          ) : (
            <span
              style={{ fontWeight: "bold", fontSize: "1rem", color: "white" }}
            >
              {smallImg.name}
            </span>
          )}
        </label>

        <input
          type="file"
          accept="image/*"
          id="small-input-image"
          style={{ display: "none" }}
          onChange={onFileHandler}
          name="smallImg"
          required
        />

        <button type="submit" disabled={isSubmitting}>
            {!isSubmitting ? "create now" : "submitting..."}
          </button>
      </form>
    </div>
  );
};

export default CreatePodcast;
