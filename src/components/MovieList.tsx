import type { Movie } from "./types"

type MovieListProps = {
  movies: Movie[];
}

export default function MovieList({movies, onSelect}: MovieListProps & {onSelect: (id: string) => void}) {  
    return (
    <ul>
      {movies.map(movie => (
      <li key={movie.imdbID}>
        <article className="movie-article" onClick={() => {onSelect(movie.imdbID)}}>
        <p>{movie.Title}</p>
        <img src={movie.Poster} />
        <p>{movie.Year}</p>
        </article>
      </li>
    ))} 
    </ul>
    )  
  }