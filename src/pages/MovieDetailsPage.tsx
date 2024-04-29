import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  fetchMovieDetails,
  fetchSimilarMovies,
  fetchMovieGenres,
} from "../api/tmdb";
import { format } from "date-fns";

interface MovieDetails {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
  release_date: string;
  vote_average: number;
  popularity: number;
  genre_ids?: number[];
}

interface SimilarMovie {
  id: number;
  title: string;
  poster_path: string;
}

interface MovieGenre {
  id: number;
  name: string;
}

const MovieDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [similarMovies, setSimilarMovies] = useState<SimilarMovie[]>([]);
  const [genres, setGenres] = useState<MovieGenre[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const movieData = await fetchMovieDetails(Number(id));
      setMovie(movieData);

      const similarMoviesData = await fetchSimilarMovies(Number(id));
      setSimilarMovies(similarMoviesData);

      const genresData = await fetchMovieGenres();
      setGenres(genresData);
    };
    fetchData();
  }, [id]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4 flex flex-col">
      <div className="flex flex-row justify-between">
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-4">{movie.title}</h1>
          <p>
            <strong>Дата выхода:</strong>{" "}
            {format(new Date(movie.release_date), "dd.MM.yyyy")}
          </p>
          <p>
            <strong>Популярность:</strong> {movie.popularity}
          </p>
          <p>
            <strong>Рейтинг:</strong> {movie.vote_average}
          </p>
          <p className="mt-4">{movie.overview}</p>
        </div>
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="rounded-lg ml-4 justify-center"
          style={{ maxWidth: "300px" }}
        />
      </div>
      {similarMovies.length > 0 && (
        <div className="flex flex-col mt-8">
          <h2 className="text-2xl font-bold mb-4">Похожие фильмы</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {similarMovies.map((similarMovie) => (
              <Link key={similarMovie.id} to={`/movie/${similarMovie.id}`}>
                <div className="bg-gray-200 flex flex-col justify-between h-full rounded-lg overflow-hidden">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${similarMovie.poster_path}`}
                    alt={similarMovie.title}
                    className="w-full h-auto"
                  />
                  <p className="p-2 text-center align-middle">
                    {similarMovie.title}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetailsPage;
