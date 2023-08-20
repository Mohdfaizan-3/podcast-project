import React from 'react'

const EpisodeDetails = ({title,description,audioFile,handleClick}) => {
  return (
    <div><h2>{title}</h2>
    <p>{description}</p>
     <button text={"Play"} onClick={()=> handleClick(audioFile)}></button>
    </div>
  )
}

export default EpisodeDetails