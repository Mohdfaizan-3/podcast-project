import React from "react";

const EpisodeDetails = ({
  sNo,
  title,
  description,
  audioFile,
  handleClick,
}) => {
  return (
    <div>
      <h2 style={{ marginBottom: "0em", paddingBottom: "0em" }}>
        {sNo}. {title}
      </h2>
      <p
        style={{ marginBottom: "0em", paddingBottom: "0em", marginLeft: "2em" }}
      >
        {description}
      </p>
      <button
        style={{
          color: "white",
          width: "150px",
          padding: "0.5em",
          marginLeft: "2em",
          marginTop: "2.7em",
        }}
        text={"Play"}
        onClick={() => handleClick(audioFile)}
      >
        Play
      </button>
    </div>
  );
};

export default EpisodeDetails;
