import React, { useEffect, useState } from "react";
import axios from "./axios";
import "./Banner.css";
import requests from "./Requests";

const Banner = () => {
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    async function fetchDate() {
      const request = await axios.get(requests.fetchNetflixOriginals);
      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      );
    }

    fetchDate();
  }, []);

  const truncate = (string, n) => {
    return string?.length > n ? string.substr(0, n - 1) + "..." : string;
  };

  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie?.backdrop_path})`,
      }}
    >
      <div className="banner__contents">
        <h1 className="banner__title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <div className="banner__bottons">
          <button className="banner__botton">Play</button>
          <button className="banner__botton">My List</button>
        </div>
        <h1 className="banner__description">
          {truncate(movie?.overview || "", 150)}
        </h1>
      </div>
      <div className="banner--fedeBottom" />
    </header>
  );
};

export default Banner;
