import React, { useEffect, useMemo, useState } from 'react'
import './Player.css'
import back_arrow_icon from '../../assets/back_arrow_icon.png'
import { useNavigate, useParams } from 'react-router-dom'

const Player = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const [apiData, setApiData] = useState({
    name: "",
    key: "",
    published_at: "",
    typeof: ""
  })

  const options = useMemo(() => ({
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MGIwODQxNDFhMTU0NzEyMzE5NTY3YTFlM2ZkMjIyMSIsIm5iZiI6MTc1NDg0MzI3OS4yMzIsInN1YiI6IjY4OThjODhmNjc5MTg3MmUxYTZkNmEwZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.0w-GhiBNGI4PqxYCi_kBSE4ZVArgZ2zM6Xp-PilmsfA'
    }
  }), []);

  useEffect(() => {

    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
      .then(res => res.json())
      .then(res => setApiData(res.results[0]))
      .catch(err => console.error(err));
  }, [id, options])



  return (
    <div className='player'>
      <img src={back_arrow_icon} alt="" onClick={() => { navigate(-2) }} />
      <iframe
        width="90%"
        height="90%"
        src={apiData.key ? `https://www.youtube.com/embed/${apiData.key}` : ""}
        title="trailer"
        frameBorder="0"
        allowFullScreen
      />
      <div className="player-info">
        <p>{apiData.published_at.slice(0, 10)}</p>
        <p>{apiData.name}</p>
        <p>{apiData.typeof}</p>
      </div>
    </div>
  )
}

export default Player
