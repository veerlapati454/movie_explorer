import { useState, useEffect } from "react";
const KEY = "movie-explorer:favourites";
export default function useFavourites() {
  const [favIds, setFavIds] = useState(() => {
    try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch { return []; }
  });
  useEffect(() => { localStorage.setItem(KEY, JSON.stringify(favIds)); }, [favIds]);
  const toggleFav = (id) =>
    setFavIds((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));
  return { favIds, toggleFav };
}
