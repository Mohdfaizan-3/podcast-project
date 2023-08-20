import { addDoc, collection } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { db, storage } from "../../utils/firebase.utils";

const defaultFormFeilds = {
  title: "",
  description: "",
  audioFile: null,
};
const CreateEpisode = () => {
  const [formFeilds, setFormFeilds] = useState(defaultFormFeilds);
  const { title, description, audioFile } = formFeilds;
  const [isSubmitting, setSubmitting] = useState(false);
  const currentUser = useSelector((state) => state.user.user);
  const { id } = useParams();
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const audioRef = ref(
        storage,
        `podcasts-episodes/${currentUser.uid}/${Date.now()}`
      );

      await uploadBytes(audioRef, audioFile);
      const audioUrl = await getDownloadURL(audioRef);

      const episodeData = {
        title,
        description,
        audio: audioUrl,
      };

      const docRef = await addDoc(collection(db, "podcasts",id,"episodes"), episodeData);
      toast.success("created");
      setSubmitting(false);

      navigate(`/podcasts/${id}`)

      setFormFeilds(defaultFormFeilds);

    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  const handleChange = (e) => {
    try {
      const { name, value } = e.target;
      setFormFeilds({
        ...formFeilds,
        [name]: value,
      });
    } catch (error) {
      console.log(error);
    }
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
  console.log(formFeilds);
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
        <label htmlFor="audio-input" className="input">
          {audioFile === null ? (
            "audio"
          ) : (
            <span
              style={{ fontWeight: "bold", fontSize: "1rem", color: "white" }}
            >
              {audioFile.name}
            </span>
          )}
        </label>

        <input
          type="file"
          accept="audio/*"
          id="audio-input"
          style={{ display: "none" }}
          onChange={(e) => onFileHandler(e)}
          name="audioFile"
          required
        />

        <button type="submit" disabled={isSubmitting || audioFile === null}>
          {!isSubmitting ? "create now" : "submitting..."}
        </button>
      </form>
    </div>
  );
};

export default CreateEpisode;
