import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TopMoviesPage from "./pages/TopMoviesPage";
import MovieDetailsPage from "./pages/MovieDetailsPage";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TopMoviesPage />} />
        <Route path="/movie/:id" element={<MovieDetailsPage />} />
      </Routes>
    </Router>
  );
};

export default App;
