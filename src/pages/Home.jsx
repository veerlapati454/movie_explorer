import { useState, useMemo, useEffect } from "react";
import { Link, useNavigate, useOutletContext, useSearchParams } from "react-router-dom";
import AOS from "aos";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { movies, allGenres } from "../data/movies.js";
import MovieGrid from "../components/MovieGrid.jsx";

const byRating = [...movies].sort((a, b) => b.rating - a.rating);
const byYear = [...movies].sort((a, b) => b.year - a.year);
const avg = movies.reduce((s, x) => s + x.rating, 0) / movies.length;
const stats = [
  { label: "Movies to explore", to: movies.length, dec: 0 },
  { label: "Genres", to: allGenres.length, dec: 0 },
  { label: "Average rating", to: avg, dec: 1 },
  { label: "Directors", to: new Set(movies.map((x) => x.director)).size, dec: 0 },
];
const features = [
  { icon: "⌕", title: "Find it fast", text: "Search by title, narrow by genre and sort by rating or release year in one place." },
  { icon: "♥", title: "Keep a watchlist", text: "Save favourites with one tap. They stay on your device, even after a refresh." },
  { icon: "★", title: "Know before you watch", text: "Open any movie to see its rating, director, cast and a short synopsis." },
];
const quotes = [
  { text: "I found tonight's movie in under a minute. The genre filter does the work for me.", who: "Sample viewer, Hyderabad" },
  { text: "Saving favourites is instant, and my list is still there the next day.", who: "Sample viewer, Pune" },
  { text: "Clean, fast and easy to read on my phone. Exactly what a movie guide should be.", who: "Sample viewer, Chennai" },
];

function Head({ title, sub, children }) {
  return (
    <div className="sec-head" data-aos="fade-up">
      <div><h2>{title}</h2>{sub && <p className="sub">{sub}</p>}</div>
      {children}
    </div>
  );
}

export default function Home() {
  const ctx = useOutletContext();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [q, setQ] = useState("");
  const [tab, setTab] = useState("today");
  // Explore section state (search, genre, sort)
  const [query, setQuery] = useState(params.get("q") || "");
  const [genre, setGenre] = useState(params.get("genre") || "All");
  const [sort, setSort] = useState("");
  useEffect(() => { setQuery(params.get("q") || ""); setGenre(params.get("genre") || "All"); }, [params]);
  const clear = () => { setQuery(""); setGenre("All"); setSort(""); };
  const filtered = useMemo(() => {
    let list = movies.filter((x) =>
      x.title.toLowerCase().includes(query.trim().toLowerCase()) && (genre === "All" || x.genres.includes(genre)));
    if (sort === "rating") list = [...list].sort((a, b) => b.rating - a.rating);
    if (sort === "year") list = [...list].sort((a, b) => b.year - a.year);
    return list;
  }, [query, genre, sort]);
  useEffect(() => { AOS.refreshHard(); }, [filtered]);

  // GSAP: hero intro, hero parallax, stat counters, genre tiles
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctxG = gsap.context(() => {
      gsap.from(".hero-text > *", { y: 36, opacity: 0, duration: 0.9, stagger: 0.12, ease: "power3.out" });
      gsap.to(".hero", { backgroundPositionY: "75%", ease: "none",
        scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });
      gsap.utils.toArray(".count").forEach((el) => {
        const o = { v: 0 }, dec = +el.dataset.dec;
        gsap.to(o, { v: +el.dataset.to, duration: 1.8, ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 92%", once: true },
          onUpdate: () => { el.textContent = o.v.toFixed(dec); } });
      });
      gsap.from(".genre-tiles a", { scale: 0.9, opacity: 0, stagger: 0.06, duration: 0.6, ease: "back.out(1.4)",
        scrollTrigger: { trigger: ".genre-tiles", start: "top 88%", once: true } });
    });
    return () => ctxG.revert();
  }, []);

  const hero = byRating[0];
  const spotlight = movies.find((x) => x.id === 8);
  const trendList = tab === "today" ? byRating.filter((x) => x.trending) : movies.filter((x) => x.trending).sort((a, b) => b.year - a.year);
  const row = (list) => <MovieGrid scroll movies={list} {...ctx} />;

  return (
    <>
      <section className="hero" id="home" style={{ backgroundImage: `linear-gradient(90deg, #0b1220 20%, rgba(11,18,32,.45)), url(${hero.wide})` }}>
        <div className="hero-text">
          <p className="tag">Featured tonight · ★ {hero.rating}</p>
          <h1>{hero.title}</h1>
          <p className="desc">{hero.description}</p>
          <button className="btn" onClick={() => ctx.onOpen(hero)}>View details</button>
          <form className="hero-search" onSubmit={(e) => { e.preventDefault(); navigate(`/?q=${encodeURIComponent(q.trim())}#explore`); }}>
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search for a movie…" aria-label="Search for a movie" />
            <button className="btn">Search</button>
          </form>
        </div>
      </section>

      <section className="section dark2 stats">
        <div className="stat-grid">
          {stats.map((s) => (
            <div key={s.label} className="stat">
              <span className="count" data-to={s.to} data-dec={s.dec}>{s.to.toFixed(s.dec)}</span>
              <span className="muted">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      <div className="marquee" aria-hidden="true">
        <div className="track">{[...movies, ...movies].map((x, i) => <span key={i}>{x.title}</span>)}</div>
      </div>

      <section className="section light" id="trending">
        <Head title="Trending now" sub="What everyone is watching right now.">
          <div className="pills">
            <button className={tab === "today" ? "on" : ""} onClick={() => setTab("today")}>Today</button>
            <button className={tab === "week" ? "on" : ""} onClick={() => setTab("week")}>This week</button>
          </div>
        </Head>
        {row(trendList)}
      </section>

      <section className="section white" id="explore">
        <Head title="Explore movies" sub={`Showing ${filtered.length} of ${movies.length} movies.`} />
        <div className="filters" data-aos="fade-up">
          <input type="search" placeholder="Search by title…" value={query} onChange={(e) => setQuery(e.target.value)} aria-label="Search by title" />
          <select value={genre} onChange={(e) => setGenre(e.target.value)} aria-label="Filter by genre">
            <option>All</option>{allGenres.map((g) => <option key={g}>{g}</option>)}
          </select>
          <select value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Sort movies">
            <option value="">Sort by…</option>
            <option value="rating">Highest rating</option>
            <option value="year">Newest release</option>
          </select>
          <button className="btn ghost" onClick={clear} disabled={!(query || genre !== "All" || sort)}>Clear Filters</button>
        </div>
        {filtered.length ? (
          <MovieGrid movies={filtered} {...ctx} showGenres />
        ) : (
          <div className="empty"><p>No movies match your search. Try a different title or genre.</p><button className="btn" onClick={clear}>Clear Filters</button></div>
        )}
      </section>

      <section className="section light" id="top-rated">
        <Head title="Top rated" sub="The highest-scoring movies in our collection." />
        <ol className="ranked">
          {byRating.slice(0, 5).map((mv, i) => (
            <li key={mv.id} data-aos="fade-up" data-aos-delay={i * 80} style={{ "--r": `${mv.rating * 10}%` }}>
              <span className="rank">{i + 1}</span>
              <img className="mini" src={mv.poster} alt="" loading="lazy" onError={(e) => { e.currentTarget.style.display = "none"; }} />
              <button onClick={() => ctx.onOpen(mv)}>
                <strong>{mv.title}</strong>
                <span className="muted">{mv.year} · {mv.genres.join(", ")}</span>
              </button>
              <span className="rate">★ {mv.rating}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="section white" id="genres">
        <Head title="Browse by genre" sub="Jump straight into the kind of story you're in the mood for." />
        <div className="genre-tiles">
          {allGenres.map((g) => (
            <Link key={g} to={`/?genre=${g}#explore`}
              style={{ backgroundImage: `linear-gradient(180deg, rgba(11,18,32,.2), rgba(11,18,32,.85)), url(${movies.find((x) => x.genres.includes(g)).wide})` }}>{g}</Link>
          ))}
        </div>
      </section>

      <section className="section" id="spotlight">
        <div className="spotlight" data-aos="zoom-in-up" style={{ backgroundImage: `linear-gradient(100deg, #0b1220 30%, rgba(11,18,32,.3)), url(${spotlight.wide})` }}>
          <div>
            <p className="tag">Editor's pick</p>
            <h2>{spotlight.title}</h2>
            <p className="desc">{spotlight.description}</p>
            <p className="muted">Directed by {spotlight.director} · Starring {spotlight.cast.join(", ")}</p>
            <button className="btn" onClick={() => ctx.onOpen(spotlight)}>See the full story</button>
          </div>
        </div>
      </section>

      <section className="section light" id="new">
        <Head title="New releases" sub="Fresh from the latest seasons." />
        {row(byYear.slice(0, 6))}
      </section>

      <section className="section white" id="features">
        <Head title="Why Reelhouse" sub="Everything you need to pick a movie, nothing you don't." />
        <div className="features">
          {features.map((f, i) => (
            <div key={f.title} className="feature" data-aos="fade-up" data-aos-delay={i * 120}>
              <span className="icon">{f.icon}</span>
              <h3>{f.title}</h3>
              <p>{f.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section dark2" id="reviews">
        <Head title="What viewers say" sub="Sample feedback for this practice project." />
        <div className="quotes">
          {quotes.map((x, i) => (
            <figure key={x.who} className="quote" data-aos="zoom-in" data-aos-delay={i * 120}>
              <blockquote>“{x.text}”</blockquote>
              <figcaption className="muted">{x.who}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="cta" data-aos="fade-up">
        <h2>Build your own watchlist</h2>
        <p>Save movies with the heart button. Your list stays on this device.</p>
        <div className="cta-actions">
          <Link className="btn" to="/favourites">Open Favourites</Link>
          <Link className="btn ghost" to="/#explore">View All Movies</Link>
        </div>
      </section>
    </>
  );
}
