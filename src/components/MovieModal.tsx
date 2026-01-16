import type { Movie } from "./types";
type MovieModalProps = {
  selectedMovie: Movie;
  onClose: () => void;
  }

export default function MovieModal({selectedMovie, onClose}: MovieModalProps) {
  const cap = "/cap.png"
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center" onClick={onClose}>
        <div className="bg-zinc-900 p-6 rounded-lg max-w-md w-full relative">
          <button className="absolute top-2 right-2 text-red-400 bg-black/20" onClick={onClose}>X</button>
          <div className="flex flex-col gap-4" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-xl text-white font-semibold mb-4 ">{selectedMovie.Title}</h2>
            <img src={selectedMovie.Poster} className="w-auto h-auto rounded-md" onError={(e) => {e.currentTarget.src = cap; e.currentTarget.className='poster-cap'}}/>
            <p className="text-zinc-300">{selectedMovie.Plot}</p>
            <p className="text-zinc-400">{selectedMovie.Genre}</p>
            <p className="text-zinc-400">{selectedMovie.Year}</p>
          </div>
        </div>
      </div>
    )
  }