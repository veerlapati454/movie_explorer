import MovieCard from "./MovieCard.jsx";
export default function MovieGrid({ movies, favIds, onToggleFav, onOpen, showGenres, scroll }) {
  return (
    <div className={scroll ? "grid scroll" : "grid"}>
      {movies.map((mv) => (
        <MovieCard key={mv.id} movie={{ ...mv, showGenres }} isFav={favIds.includes(mv.id)}
          onToggleFav={onToggleFav} onOpen={() => onOpen(mv)} />
      ))}
    </div>
  );
}
