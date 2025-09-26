import React, { useState } from "react";
import './App.css'
import Control from "./components/Control";
import MovieList from "./components/MovieList";
import MovieModal from "./components/MovieModal";
import type { Movie } from "./components/types";

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1); 
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const findQuery = async (query: string) => {
    const url = `https://www.omdbapi.com/?apikey=eefdbc41&s=${query}&type=movie&page=${page}`;
    const res = await fetch(url);
    const data = await res.json();
    if (data.Response === 'True' && data.Search) {
      setMovies(prev => [...prev, ...data.Search]);
    }
  }
  
  const loadCurrentMovie = async (selectedId: string) => {
    const res = await fetch(`https://www.omdbapi.com/?apikey=eefdbc41&i=${selectedId}`);
    const data = await res.json();
    setSelectedMovie(data);
  }

  return (
    <div>
      <MovieList movies={movies} onSelect={(id) => loadCurrentMovie(id) } />
      <Control findQuery={findQuery} />
      {selectedMovie && (
        <MovieModal
        selectedMovie={selectedMovie}
        onClose={() => {setSelectedMovie(null)}}
        />
      )}
    </div>
  );
}