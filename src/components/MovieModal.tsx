import type { Movie } from "./types";
type MovieModalProps = {
  selectedMovie: Movie;
  onClose: () => void;
  }

export default function MovieModal({selectedMovie, onClose}: MovieModalProps) {
    return (
      <div className="modal">
        <div className="modal-background" onClick={onClose}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2 className="modal-movie-title">{selectedMovie.Title}</h2>
            <img src={selectedMovie.Poster} className="modal-poster"/>
            <p>{selectedMovie.Year}</p>
            <p>{selectedMovie.Genre}</p>
            <p>{selectedMovie.Plot}</p>
            <button onClick={onClose} className="modal-close-btn">X</button>
          </div>
        </div>
      </div>
    )
  }