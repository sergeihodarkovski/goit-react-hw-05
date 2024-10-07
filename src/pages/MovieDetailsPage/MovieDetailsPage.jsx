import s from "./MovieDetailsPage.module.css";
import { useEffect, useState } from "react";
import { NavLink, Outlet, useParams } from "react-router-dom";
import { fetchMoviesById } from "../../services/api";
import clsx from "clsx";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);

  useEffect(() => {
    const getMovieDetails = async () => {
      const data = await fetchMoviesById(movieId);
      setMovieDetails(data);
    };
    getMovieDetails();
  }, [movieId]);

  const buildLinkClass = ({ isActive }) => {
    return clsx(s.link, isActive && s.activeLink);
  };

  if (!movieDetails) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className={s.posterWrapper}>
        <div>
          <img
            src={`https://image.tmdb.org/t/p/w200/${movieDetails.poster_path}`}
            alt={movieDetails.title}
          />
        </div>
        <div>
          <h1>{movieDetails.title}</h1>
          <p> Рейтинг фильма: {movieDetails.vote_average}</p>

          <p> Описание фильма: {movieDetails.overview}</p>
        </div>
      </div>
      <hr />

      <div className={s.linkWrapper}>
        <NavLink className={buildLinkClass} to="Reviews">
          Reviews
        </NavLink>
        <NavLink className={buildLinkClass} to="Cast">
          Cast
        </NavLink>
      </div>
      <hr />
      <Outlet />
    </>
  );
};

export default MovieDetailsPage;
