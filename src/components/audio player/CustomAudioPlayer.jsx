import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import React, { useEffect, useRef, useState } from "react";
import "./styles.css";
const CustomAudioPlayer = ({ audioSrc, image }) => {
  const audioRef = useRef();
  const [isPlaying, setIsPlaying] = useState(true);
  const [duration, setDuration] = useState("");
  const [isMute, SetIsMute] = useState(false);
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    if (isMute) {
      audioRef.current.volume = 0;
    } else {
      audioRef.current.volume = 1;
    }
  }, [isMute]);

  useEffect(() => {
    const audio = audioRef.current;
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleMetaData);
    audio.addEventListener("ended", handleEnded);
    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleMetaData);
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleMetaData = () => {
    setDuration(audioRef.current.duration);
  };

  const handleEnded = () => {
    setCurrentTime(0);
    setIsPlaying(false);
  };

  const togglePlay = () => {
    if (isPlaying) {
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
    }
  };

  const handleMute = () => {
    if (isMute) {
      SetIsMute(false);
      setVolume((audioRef.current.volume = 1));
    } else {
      SetIsMute(true);
      setVolume((audioRef.current.volume = 0));
    }
  };

  const handleVolume = (e) => {
    const newVolume = parseFloat(e.target.value);
    audioRef.current.volume = newVolume;
    setVolume(newVolume);
    if (newVolume === 0) {
      SetIsMute(true);
    } else {
      SetIsMute(false);
    }
  };

  const handleDuration = (e) => {
    setCurrentTime(e.target.value);
    audioRef.current.currentTime = e.target.value;
  };
  return (
    <div className="audio-player">
      <img src={image} alt="banner" />
      <audio src={audioSrc} ref={audioRef} />

      <p onClick={togglePlay}>
        {" "}
        {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
      </p>
      <div className="range-container">
        <p>{formatTime(currentTime)}</p>
        <input
          type="range"
          step={0.01}
          max={duration}
          value={currentTime}
          onChange={handleDuration}
          className="duration"
        />
        <p>{formatTime(duration - currentTime)}</p>
        <p onClick={handleMute}>
          {isMute ? <VolumeOffIcon /> : <VolumeUpIcon />}
        </p>
        <input
          type="range"
          value={volume}
          min={0}
          max={1}
          step={0.01}
          onChange={handleVolume}
          className="volume-range"
        />
      </div>
    </div>
  );
};

export default CustomAudioPlayer;
