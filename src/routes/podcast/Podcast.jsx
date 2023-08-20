import { collection, onSnapshot, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PodcastCard from "../../components/PodcastCard/PodcastCard";
import SearchBox from "../../components/search box/searchBox";
import { podcastAction } from "../../store/podcastSlice";
import { db } from "../../utils/firebase.utils";
import "./style.css";
const Podcast = () => {
  const dispatch = useDispatch();
  const podcastData = useSelector((state) => state.podcastData.podcastData);
  const [filteredPodcast, setFilteredPodcast] = useState(podcastData);
  const [searchField, setSearchField] = useState("");

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, "podcasts")),
      (querySnapshot) => {
        const podcastData = [];
        querySnapshot.forEach((doc) => {
          podcastData.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        dispatch(podcastAction.setPodcast(podcastData));
      },
      (error) => {
        console.error(error);
      }
    );
    return () => unsubscribe();
  }, [dispatch]);

  useEffect(() => {
    const newFilteredPodcast = podcastData.filter((podcast) => {
      return podcast.title.toLocaleLowerCase().includes(searchField);
    });
    setFilteredPodcast(newFilteredPodcast);
  }, [podcastData, searchField]);
  const onSearchChange = (event) => {
    const searchFieldString = event.target.value.toLocaleLowerCase();
    setSearchField(searchFieldString);
  };

  return (
    <div className="wrapper" style={{ marginTop: "2em" }}>
      <SearchBox className="search-box" placeholder="search by Title" onChangeHandler={onSearchChange} />
      <h2 style={{textAlign:"center"}}>Discover Podcast</h2>
      {filteredPodcast.length > 0 ? (
        <div className="podcast-flex">
          {filteredPodcast.map((item) => (
            <PodcastCard
            key={item.id}
              id={item.id}
              title={item.title}
              displayImage={item.displayImage}
            />
          ))}
        </div>
      ) : (
        <p style={{textAlign:"center"}}>{searchField ? "Podcast Not Found" : "No podcasts"}</p>
      )}
    </div>
  );
};

export default Podcast;
