import { Link } from "react-router-dom";
import { allGenres } from "../data/movies.js";
import logo from "../assets/stackly_logo.webp"

const stroke = { fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round" };
// Social links intentionally go to the 404 page until real profiles are added.
const socials = [
  { name: "Facebook", icon: <path d="M14 8h2V4.5h-2.5C11.3 4.5 10 6 10 8v2H8v3.5h2V20h3.5v-6.5H16l.5-3.5h-3V8.5c0-.3.2-.5.5-.5z" /> },
  { name: "Instagram", icon: <><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r=".6" /></> },
  { name: "X", icon: <path d="M4 4l16 16M20 4L4 20" /> },
  { name: "YouTube", icon: <><rect x="2.5" y="5" width="19" height="14" rx="4" /><path d="M10 9.5l5 2.5-5 2.5z" /></> },
  { name: "LinkedIn", icon: <><rect x="3" y="3" width="18" height="18" rx="3" /><path d="M8 11v6M8 7.5v.01M12 17v-6M12 13c0-1.5 1-2 2-2s2 .8 2 2v4" /></> },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="foot-grid">
        <div>
          <Link to="/" className="logo" aria-label="Home"><img className="logo-img" src={logo} alt="Logo" /></Link>
          <p className="muted">Find what to watch tonight. Search, filter and save the movies you love.</p>
          <div className="social">
            {socials.map((s) => (
              <Link key={s.name} to="/404" aria-label={s.name} title={s.name}>
                <svg viewBox="0 0 24 24" width="18" height="18" {...stroke}>{s.icon}</svg>
              </Link>
            ))}
          </div>
        </div>
        <div><h4>Navigate</h4>
          <Link to="/">Home</Link><Link to="/#explore">Explore Movies</Link><Link to="/favourites">Favourites</Link></div>
        <div><h4>Genres</h4>
          {allGenres.slice(0, 4).map((g) => <Link key={g} to={`/?genre=${g}#explore`}>{g}</Link>)}</div>
        <div><h4>Address</h4>
          <address className="addr">
            Stackly<br />
            4th Floor, Plot 21, Road No. 36<br />
            Jubilee Hills, Hyderabad<br />
            Telangana 500033, India
          </address>
          <span className="muted">hello@stackly.com</span>
          <span className="muted">+91 8907654561</span>
        </div>
      </div>
      <p className="copy">© {new Date().getFullYear()} Your Company Name. All rights reserved.</p>
    </footer>
  );
}
