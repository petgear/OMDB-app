import type { Movie } from "./types"
import { useRef, useEffect } from "react"

type MovieListProps = {
  movies: Movie[];
  onSelect: (id: string) => void;
  onReachEnd: () => void
}

export default function MovieList({movies, onSelect, onReachEnd}: MovieListProps ) { 
  const lastMovieRef = useRef<HTMLLIElement | null>(null);

  useEffect(() => {
    if (!lastMovieRef.current) return;

    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        onReachEnd();
      }
    }, {threshold: 0.2});

    observer.observe(lastMovieRef.current);

    return () => observer.disconnect();
  }, [movies])

    const cap = "/cap.png"
    return (
    <ul>
      {movies.map((movie, index) => (
      <li 
      key={movie.imdbID}
      ref={index === movies.length - 1 ? lastMovieRef : null}
      className="movie-li"
      >
        <article className="movie-article" onClick={() => {onSelect(movie.imdbID)}}>
        <p className="movie-title">{movie.Title}</p>
        <img src={movie.Poster} className="movie-poster" onError={(e) => {e.currentTarget.src = cap}}/>
        <p className="movie-year">{movie.Year}</p>
        </article>
      </li>
    ))} 
    </ul>
    )  
  }
