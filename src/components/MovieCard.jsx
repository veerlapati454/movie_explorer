export default function MovieCard({ movie, isFav, onToggleFav, onOpen }) {
  // subtle 3D tilt that follows the pointer
  const tilt = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
    e.currentTarget.style.setProperty("--ry", `${x * 10}deg`);
    e.currentTarget.style.setProperty("--rx", `${-y * 10}deg`);
  };
  const untilt = (e) => { e.currentTarget.style.setProperty("--ry", "0deg"); e.currentTarget.style.setProperty("--rx", "0deg"); };
  const hue = (movie.id * 47) % 360;
  return (
    <article className="card" data-aos="fade-up">
      <div className="thumb" onMouseMove={tilt} onMouseLeave={untilt} style={{ background: `linear-gradient(160deg, hsl(${hue} 40% 30%), hsl(${hue} 40% 14%))` }}>
        <button className="thumb-btn" onClick={() => onOpen(movie)} aria-label={`Details for ${movie.title}`}>
          <img src={movie.poster} alt={`${movie.title} poster`} loading="lazy"
            onError={(e) => { e.currentTarget.style.display = "none"; }} />
        </button>
        <span className="score">{Math.round(movie.rating * 10)}%</span>
        <button className={isFav ? "heart on" : "heart"} onClick={() => onToggleFav(movie.id)}
          aria-pressed={isFav} aria-label={isFav ? "Remove from favourites" : "Add to favourites"}>
          {isFav ? "♥" : "♡"}
        </button>
      </div>
      <div className="info">
        <h3>{movie.title}</h3>
        <p className="meta"><span>{movie.year}</span><span className="rate">★ {movie.rating}</span></p>
        {movie.showGenres && <p className="genres">{movie.genres.join(", ")}</p>}
      </div>
    </article>
  );
}
