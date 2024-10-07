import s from "./MovieList.module.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchAllMovies } from "../../services/api";

const MovieList = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const getAllMovies = async () => {
      const data = await fetchAllMovies();
      setMovies(data);
    };
    getAllMovies();
  }, []);

  return (
    <div>
      <ul className={s.moviesWrapper}>
        {movies.map((movie) => (
          <li className={s.item} key={movie.id}>
            <Link to={`/movies/${movie.id.toString()}`}>
              <img
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt={movie.title}
                width={200}
              />
              <p className={s.movieTitle}>{movie.title}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieList;
