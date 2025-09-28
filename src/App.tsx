import React, { useState } from "react";
import './App.css'
import MovieList from "./components/MovieList";
import MovieModal from "./components/MovieModal";
import type { Movie } from "./components/types";
import AutoComplete from "./components/Autocomplete";

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1); 
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [currentQuery, setCurrentQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const findQuery = async (query: string, page: number) => {
    setLoading(true);
    try {
    const url = `https://www.omdbapi.com/?apikey=eefdbc41&s=${query}&type=movie&page=${page}`;
    const res = await fetch(url);
    const data = await res.json();
    if (data.Response === 'True' && data.Search) {
      if (page === 1) setMovies(data.Search);
      else setMovies(prev => [...prev, ...data.Search]);
    }
    } finally {
      setLoading(false);
    }
  }
  
  const loadCurrentMovie = async (selectedId: string) => {
    const res = await fetch(`https://www.omdbapi.com/?apikey=eefdbc41&i=${selectedId}`);
    const data = await res.json();
    setSelectedMovie(data);
  }

   const handleSearch = (query: string) => {
    setCurrentQuery(query);
    setPage(1);
    findQuery(query, 1);
  }

  return (
    <div>
      {loading && <p>Загрузка...</p>}
      <MovieList
       movies={movies}
       onSelect={(id) => loadCurrentMovie(id) }
       onReachEnd={() => {
        const nextPage = page + 1;
        setPage(prev => prev + 1);
        findQuery(currentQuery, nextPage);
        }}
       />
      <AutoComplete onSearch={handleSearch} />
      {selectedMovie && (
        <MovieModal
        selectedMovie={selectedMovie}
        onClose={() => {setSelectedMovie(null)}}
        />
      )}
    </div>
  );
}