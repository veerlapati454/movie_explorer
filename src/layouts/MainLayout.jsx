import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import MovieModal from "../components/MovieModal.jsx";
import useFavourites from "../hooks/useFavourites.js";

// Header on top, the active page (dynamic) in the middle via <Outlet />, Footer at the bottom.
export default function MainLayout() {
  const { favIds, toggleFav } = useFavourites();
  const [selected, setSelected] = useState(null);
  const { pathname, hash, search } = useLocation();

  useEffect(() => {
    AOS.init({ duration: 700, easing: "ease-out-cubic", once: true, offset: 60,
      disable: () => window.matchMedia("(prefers-reduced-motion: reduce)").matches });
  }, []);

  // Scroll progress bar, header shrink and back-to-top visibility
  useEffect(() => {
    const on = () => {
      const y = window.scrollY, h = document.documentElement.scrollHeight - window.innerHeight;
      document.documentElement.style.setProperty("--progress", h > 0 ? y / h : 0);
      document.body.classList.toggle("scrolled", y > 20);
      document.body.classList.toggle("past", y > 600);
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  // Scroll to a #section after navigation, otherwise jump to the top of the new page.
  useEffect(() => {
    if (!hash) { window.scrollTo(0, 0); return; }
    const t = setTimeout(() => document.querySelector(hash)?.scrollIntoView({ behavior: "smooth", block: "start" }), 80);
    return () => clearTimeout(t);
  }, [pathname, hash, search]);

  return (
    <div className="layout">
      <div className="progress" aria-hidden="true" />
      <Header favCount={favIds.length} />
      <main className="layout-main">
        <Outlet context={{ favIds, onToggleFav: toggleFav, onOpen: setSelected }} />
      </main>
      <Footer />
      <button className="to-top" aria-label="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>↑</button>
      {selected && (
        <MovieModal movie={selected} isFav={favIds.includes(selected.id)}
          onToggleFav={toggleFav} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}
