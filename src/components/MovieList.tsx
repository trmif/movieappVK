import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchMovies } from "../api/tmdb";
import { renderRatingStars } from "./RatingStars";
import InfiniteScroll from "react-infinite-scroll-component";
import LazyLoad from "react-lazyload";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
}

interface MoviePageProps {
  pageId: number;
}

export const MovieList: React.FC<MoviePageProps> = ({ pageId }) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchMoviesData = async () => {
      const data = await fetchMovies(pageId);
      setMovies((prevMovies) => [...prevMovies, ...data]);
    };
    fetchMoviesData();
  }, [pageId]);

  const loadMoreMovies = async () => {
    const nextPage = pageId + 1;
    const data = await fetchMovies(nextPage);
    if (data.length === 0) {
      setHasMore(false);
    } else {
      setMovies((prevMovies) => [...prevMovies, ...data]);
    }
  };

  return (
    <div>
      <InfiniteScroll
        dataLength={movies.length}
        next={loadMoreMovies}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={<p>No more movies to load</p>}
        className="grid auto-rows-max grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4"
      >
        {movies.map((movie) => (
          <LazyLoad key={movie.id} height={200} once>
            <Link to={`/movie/${movie.id}`}>
              <ul className="bg-opacity-25 h-full p-4 rounded-lg shadow-lg backdrop-blur-lg backdrop-filter">
                <li className="h-full flex flex-col justify-between">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="w-full h-auto rounded-lg"
                  />
                  <div>
                    <p className="mt-2 text-center">{movie.title}</p>
                    <div className="flex justify-center items-center mt-2">
                      <span className="text-gray-300 text-lg">
                        {(movie.vote_average / 2).toFixed(1)}
                      </span>
                      <span className="mr-1 text-yellow-400 text-lg">
                        {renderRatingStars(movie.vote_average)}
                      </span>
                    </div>
                  </div>
                </li>
              </ul>
            </Link>
          </LazyLoad>
        ))}
      </InfiniteScroll>
    </div>
  );
};
