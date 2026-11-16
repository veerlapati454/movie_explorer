import { useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/stackly_logo.webp"
export default function Header({ favCount }) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const navigate = useNavigate();
  const { pathname, hash } = useLocation();
  const onHome = pathname === "/";
  const exploreActive = onHome && hash === "#explore";
  const close = () => setOpen(false);
  const goExplore = () => { close(); document.getElementById("explore")?.scrollIntoView({ behavior: "smooth" }); };
  const submit = (e) => {
    e.preventDefault();
    navigate(`/?q=${encodeURIComponent(q.trim())}#explore`);
    setQ(""); close();
  };
  const goTop = () => {
  close();
  window.scrollTo({ top: 0, behavior: "smooth" });
};
  return (
    <header className="nav">
      <Link to="/" className="logo" onClick={goTop} aria-label="Home">
        <img className="logo-img" src={logo} alt="Logo" />
      </Link>
      <button className="burger" aria-label="Toggle menu" aria-expanded={open} onClick={() => setOpen(!open)}>
        <span /><span /><span />
      </button>
      <div className={open ? "menu open" : "menu"}>
        <nav className="links">
          <Link to="/" className={onHome && !exploreActive ? "active" : ""} onClick={close}>Home</Link>
          <Link to="/#explore" className={exploreActive ? "active" : ""} onClick={goExplore}>Explore Movies</Link>
          <NavLink to="/favourites" onClick={close}>Favourites{favCount > 0 && <b className="badge">{favCount}</b>}</NavLink>
        </nav>
        <form className="nav-search" onSubmit={submit}>
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search movies…" aria-label="Search movies" />
          <button aria-label="Search">⌕</button>
        </form>
      </div>
    </header>
  );
}
