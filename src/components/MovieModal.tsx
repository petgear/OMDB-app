import type { Movie } from "./types";
type MovieModalProps = {
  selectedMovie: Movie;
  onClose: () => void;
  }

export default function MovieModal({selectedMovie, onClose}: MovieModalProps) {
  const cap = "/cap.png"
    return (
      <div className="modal">
        <div className="modal-background" onClick={onClose}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2 className="modal-movie-title">{selectedMovie.Title}</h2>
            <img src={selectedMovie.Poster} className="modal-poster" onError={(e) => {e.currentTarget.src = cap; e.currentTarget.className='poster-cap'}}/>
            <p className="modal-year">{selectedMovie.Year}</p>
            <p className="modal-genre">{selectedMovie.Genre}</p>
            <p className="modal-plot">{selectedMovie.Plot}</p>
            <button onClick={onClose} className="modal-close-btn">X</button>
          </div>
        </div>
      </div>
    )
  }