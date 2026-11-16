import { useEffect } from "react";
export default function MovieModal({ movie, isFav, onToggleFav, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);
  return (
    <div className="backdrop" onClick={onClose}>
      <div className="modal" role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
        <button className="close" onClick={onClose} aria-label="Close">×</button>
        <img className="modal-img" src={movie.wide} alt="" onError={(e) => { e.currentTarget.style.display = "none"; }} />
        <h2>{movie.title}</h2>
        <p className="meta"><span>{movie.year}</span><span className="rate">★ {movie.rating}</span><span>{movie.genres.join(", ")}</span></p>
        <p>{movie.description}</p>
        <p><strong>Director:</strong> {movie.director}</p>
        <p><strong>Cast:</strong> {movie.cast.join(", ")}</p>
        <button className="btn" onClick={() => onToggleFav(movie.id)}>
          {isFav ? "Remove from favourites" : "Add to favourites"}
        </button>
      </div>
    </div>
  );
}
