import { Link, useOutletContext } from "react-router-dom";
import { movies } from "../data/movies.js";
import MovieGrid from "../components/MovieGrid.jsx";
export default function Favourites() {
  const { favIds, onToggleFav, onOpen } = useOutletContext();
  const favs = movies.filter((x) => favIds.includes(x.id));
  return (
    <section className="section light">
      <h2>Your Favourites</h2>
      {favs.length ? (
        <MovieGrid movies={favs} favIds={favIds} onToggleFav={onToggleFav} onOpen={onOpen} showGenres />
      ) : (
        <div className="empty"><p>No favourites yet. Tap the heart on any movie to save it here.</p>
          <Link className="btn" to="/#explore">Explore Movies</Link></div>
      )}
    </section>
  );
}
