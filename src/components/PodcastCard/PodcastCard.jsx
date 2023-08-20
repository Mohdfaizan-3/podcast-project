import React from 'react'
import { Link } from 'react-router-dom'
import "./style.css"
const PodcastCard = ({id, title, displayImage}) => {
  return (
    <div className='podcast-card'>
        <Link to={`/podcasts/${id}`}>
            <div className='podcast-card'>
                <img className="display-img-podcast" src={displayImage} alt="" />
                <p className='title-podcast'>{title}</p>
            </div>
        </Link>
    </div>
  )
}

export default PodcastCard