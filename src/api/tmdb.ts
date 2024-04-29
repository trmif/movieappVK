import axios from "axios";

const API_KEY = "99a174ff572702312bfaf71a308dff36";
const BASE_URL = "https://api.themoviedb.org/3";

interface MovieDetails {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
  release_date: string;
  vote_average: number;
  genre_ids?: number[];
  popularity: number;
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

export const fetchMovies = async (pageId: number) => {
  try {
    const response = await axios.get<{ results: any[] }>(
      `${BASE_URL}/movie/popular`,
      {
        params: {
          api_key: API_KEY,
          language: "ru-RU",
          page: pageId,
        },
      }
    );
    return response.data.results;
  } catch (error) {
    console.error("Failed to fetch movies: ", error);
    return [];
  }
};

export const fetchMovieDetails = async (
  movieId: number
): Promise<MovieDetails | null> => {
  try {
    const response = await axios.get<MovieDetails>(
      `${BASE_URL}/movie/${movieId}`,
      {
        params: {
          api_key: API_KEY,
          language: "ru-RU",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch movie details: ", error);
    return null;
  }
};

export const fetchSimilarMovies = async (
  id: number
): Promise<SimilarMovie[]> => {
  try {
    const response = await axios.get<{ results: any[] }>(
      `${BASE_URL}/movie/${id}/similar`,
      {
        params: {
          api_key: API_KEY,
          language: "ru-RU",
          page: 1,
        },
      }
    );
    return response.data.results.map((movie: any) => ({
      id: movie.id,
      title: movie.title,
      poster_path: movie.poster_path,
    }));
  } catch (error) {
    console.error("Failed to fetch similar movies: ", error);
    return [];
  }
};

export const fetchMovieGenres = async (): Promise<MovieGenre[]> => {
  try {
    const response = await axios.get<{ genres: any[] }>(
      `${BASE_URL}/genre/movie/list`,
      {
        params: {
          api_key: API_KEY,
          language: "ru-RU",
        },
      }
    );
    return response.data.genres.map((genre: any) => ({
      id: genre.id,
      name: genre.name,
    }));
  } catch (error) {
    console.error("Failed to fetch movie genres: ", error);
    return [];
  }
};
