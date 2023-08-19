import { collection, onSnapshot, query } from "firebase/firestore";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PodcastCard from "../../components/PodcastCard/PodcastCard";
import { podcastAction } from "../../store/podcastSlice";
import { db } from "../../utils/firebase.utils";
import "./style.css"
const Podcast = () => {
  const dispatch = useDispatch();
  const podcastData = useSelector((state)=> state.podcastData.podcastData)
  console.log(podcastData)
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
      (error) =>{
        console.error(error)
      }
    );

    return () => unsubscribe();
  }, [dispatch]);

  return (
    <div className="wrapper" style={{marginTop:"2em"}}>
      <h2>Discover Podcast</h2>
      {podcastData.length > 0 ? (
        <div className="podcast-flex">
          {podcastData.map((item) => (
            <PodcastCard key={item.id} podcast={item} title={item.title} displayImage={item.displayImage} />
          ))}
        </div>
      ) : (
        <p>No podcasts</p>
      )}
    </div>
  );
};

export default Podcast;
