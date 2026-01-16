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
      <ul className="grid grid-cols-3 gap-4 p-10">
        {movies.map((movie, index) => (
        <li 
          key={movie.imdbID}
          ref={index === movies.length - 1 ? lastMovieRef : null}
          className="
            bg-zinc-900
            rounded-lg
            overflow-hidden
            shadow
            hover:shadow-lg
            transition-shadow
            cursor-pointer
            
          "
        >
          <article className="
            flex
            flex-col
            items-center
            p-4
            text-center
          "
          onClick={() => {onSelect(movie.imdbID)}}>
            <p className="
              text-white
              font-semibold
              mb-1
              truncate
              "
            >
            {movie.Title}</p>
            <img src={movie.Poster}
            className="
              w-full
              aspect-[2/3]
              object-cover
              mb-2
              rounded-md
            " 
            onError={(e) => {e.currentTarget.src = cap}}/>
            <p className="
              text-zinc-400
              text-sm
              "
            >
            {movie.Year}</p>
          </article>
        </li>
      ))} 
      </ul>
    )  
  }
