import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { db } from "../../utils/firebase.utils";
import EpisodeDetails from "./EpisodeDetails";
import "./styles.css";
const PodcastDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [podcast, setPodcast] = useState({});
  const currentUser = useSelector((state) => state.user.user);
  const [episodes, setEpisodes] = useState([]);

  useEffect(() => {
    const getEpisodesData = async () => {
      try {
        const podcastDocRef = doc(db, "podcasts", id);
        const podcastDocSnap = await getDoc(podcastDocRef);
  
        if (podcastDocSnap.exists()) {
          const podcastData = podcastDocSnap.data();
          setPodcast({ id, ...podcastData });
  
          // Access the episodes subcollection using collection reference
          const episodesCollectionRef = collection(podcastDocRef, "episodes");
          const episodesQuerySnapshot = await getDocs(episodesCollectionRef);
  
          const episodesData = episodesQuerySnapshot.docs.map((doc) => doc.data());
          setEpisodes(episodesData);
          toast.success("Episodes found");
        } else {
          toast.error("No podcast data found");
          navigate("/podcasts");
        }
      } catch (error) {
        console.error("Error fetching episodes data:", error);
      }
    };
  
    getEpisodesData();
  }, [id]);
  


  return (
    <div>
      {podcast?.id && (
        <div className="details-wrapper">
          <div style={{ display: "flex", justifyContent: "" }}>
            <h1>{podcast.title}</h1>
            {currentUser?.uid === podcast?.uid && (
              <button
                className="create-episode-btn"
                onClick={() => {
                  navigate(`/podcasts/${id}/create-episode`);
                }}
              >
                create episode
              </button>
            )}
          </div>
          <img className="banner-img" src={podcast.bannerImage} alt="banner" />
          <p className="podcast-description">{podcast.description}</p>
          <h2>Episodes</h2>
          {episodes.length > 0 ? (
            <ol>
              {episodes.map((episode) => {
                return (
                  <EpisodeDetails
                    title={episode.title}
                    description={episode.description}
                    audioFile={episode.audioFile}
                  />
                );
              })}
            </ol>
          ) : (
            <p>No episode</p>
          )}
        </div>
      )}
    </div>
  );
};

export default PodcastDetail;
