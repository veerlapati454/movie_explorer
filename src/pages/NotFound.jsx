import { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { gsap } from "gsap";

const floaters = ["🍿", "🎬", "🎞️", "🎟️", "⭐", "🎥"];

function Reel() {
  return (
    <svg className="nf-reel" viewBox="0 0 120 120" aria-hidden="true">
      <circle cx="60" cy="60" r="54" fill="#131c30" stroke="#f5b94a" strokeWidth="4" />
      {[0, 60, 120, 180, 240, 300].map((a) => (
        <circle key={a} cx={60 + 32 * Math.cos((a * Math.PI) / 180)} cy={60 + 32 * Math.sin((a * Math.PI) / 180)} r="11" fill="#0b1220" stroke="#e5484d" strokeWidth="3" />
      ))}
      <circle cx="60" cy="60" r="9" fill="#f5b94a" />
    </svg>
  );
}

export default function NotFound() {
  const root = useRef(null);
  const navigate = useNavigate();
  // React Router stores the position in history.state.idx: > 0 means there is a previous page in this app.
  const goBack = () => (window.history.state?.idx > 0 ? navigate(-1) : navigate("/"));

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.timeline({ defaults: { ease: "power3.out" } })
        .from(".nf-digit", { y: -240, opacity: 0, rotate: -25, duration: 1, stagger: 0.18, ease: "bounce.out" })
        .from(".nf-clap", { scale: 0.6, opacity: 0, duration: 0.5 }, "-=0.4")
        .from(".nf-arm", { rotate: -38, duration: 0.3, ease: "power2.in" })
        .from(".nf-copy > *", { y: 26, opacity: 0, stagger: 0.1, duration: 0.6 })
        .from(".nf-actions .btn", { scale: 0.8, opacity: 0, stagger: 0.12, duration: 0.5, ease: "back.out(2)" })
        .to(".nf-arm", { rotate: -16, duration: 0.2, yoyo: true, repeat: -1, repeatDelay: 2.6, ease: "power2.in" });
      gsap.to(".nf-float", { y: "random(-60,-20)", x: "random(-40,40)", rotate: "random(-30,30)",
        duration: "random(3,5)", repeat: -1, yoyo: true, ease: "sine.inOut", stagger: 0.25 });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section className="nf" ref={root}>
      <div className="nf-beam" aria-hidden="true" />
      {floaters.map((f, i) => (
        <span key={i} className="nf-float" style={{ left: `${8 + i * 16}%`, top: `${12 + (i % 3) * 22}%` }} aria-hidden="true">{f}</span>
      ))}

      <div className="nf-content">
        <div className="nf-digits" role="img" aria-label="Error 404">
          <span className="nf-digit">4</span>
          <span className="nf-digit"><Reel /></span>
          <span className="nf-digit">4</span>
        </div>

        <div className="nf-clap" aria-hidden="true">
          <div className="nf-arm" />
          <div className="nf-board"><span>SCENE 404</span><span>TAKE 1</span></div>
        </div>

        <div className="nf-copy">
          <h1>This scene was cut from the final edit</h1>
          <p>The page you're looking for doesn't exist or has moved. Let's get you back to the main feature.</p>
        </div>

        <div className="nf-actions">
          <button className="btn" onClick={goBack}>← Go back</button>
          <Link className="btn ghost" to="/">Home</Link>
        </div>
      </div>
      <div className="nf-strip" aria-hidden="true" />
    </section>
  );
}
