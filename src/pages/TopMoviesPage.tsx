import React, { useState } from "react";
import { MovieList } from "../components/MovieList";

const TopMoviesPage = () => {
  const [page, setPage] = useState<number>(1);

  const loadNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mt-4 mb-2">Популярные фильмы</h1>
      <MovieList pageId={page} />
      <button
        className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={loadNextPage}
      >
        Загрузить больше
      </button>
    </div>
  );
};

export default TopMoviesPage;
