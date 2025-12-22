import React, { useEffect, useMemo, useRef, useState } from 'react'
import './TitleCards.css'
import { Link } from 'react-router-dom'

const TitleCards = ({ title, category }) => {

  const [apiData, setApiData] = useState([])
  const cardsRef = useRef()



  const handleWheel = (event) => {
    event.preventDefault()
    if (cardsRef.current) {
      cardsRef.current.scrollLeft += event.deltaY
    }
  }

  useEffect(() => {

    const options = useMemo(() => ({
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MGIwODQxNDFhMTU0NzEyMzE5NTY3YTFlM2ZkMjIyMSIsIm5iZiI6MTc1NDg0MzI3OS4yMzIsInN1YiI6IjY4OThjODhmNjc5MTg3MmUxYTZkNmEwZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.0w-GhiBNGI4PqxYCi_kBSE4ZVArgZ2zM6Xp-PilmsfA'
      }
    }), [])

    fetch(`https://api.themoviedb.org/3/movie/${category ? category : "now_playing"}?language=en-US&page=1`, options)
      .then(res => res.json())
      .then(res => setApiData(res.results || []))
      .catch(err => console.error(err))

    const cards = cardsRef.current;
    if (!cards) return;

    cards.addEventListener("wheel", handleWheel);

    return () => {
      cards.removeEventListener("wheel", handleWheel);
    };
  }, [category,options])

  return (
    <div className='title-cards'>
      <h2>{title || "Popular on MovieSphere"}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card, index) => (
          <Link to={`/player/${card.id}`} className="card" key={index}>
            <img
              src={`https://image.tmdb.org/t/p/w500${card.backdrop_path}`}
              alt={card.original_title}
            />
            <p>{card.original_title}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default TitleCards
