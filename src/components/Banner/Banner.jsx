import React, { useState, useEffect } from 'react';
import './Banner.css';
import axios from '../../axios';
import { API_KEY, baseUrl, imageUrl } from '../../Constance/constance';

const Banner = () => {
  const [movies, setMovies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    axios
      .get(`${baseUrl}/trending/all/week?api_key=${API_KEY}&language=en-US`)
      .then((response) => {
        setMovies(response.data.results); // Store the entire array of movies
      });
  }, []);

  useEffect(() => {
    // Set up the auto-slide interval
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % movies.length); // Loop through movies
    }, 5000); // Change slides every 5 seconds

    return () => clearInterval(interval); // Clean up interval on component unmount
  }, [movies]);

  const currentMovie = movies[currentIndex];

  return (
    <div
      style={{
        backgroundImage: `url(${currentMovie ? imageUrl + currentMovie.backdrop_path : ''})`,
      }}
      className="banner"
    >
      <div className="content">
        <h1>{currentMovie?.title || currentMovie?.name || 'Loading...'}</h1>
        <div className="banner_buttons">
          <button className="button">Play</button>
          <button className="button">My List</button>
        </div>
        <h1 className="description">{currentMovie?.overview || ''}</h1>
      </div>
      <div className="fade_bottom"></div>
    </div>
  );
};

export default Banner;
