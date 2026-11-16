import { Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound.jsx";
import MainLayout from "./layouts/MainLayout.jsx";
import Home from "./pages/Home.jsx";
import Favourites from "./pages/Favourites.jsx";
export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/favourites" element={<Favourites />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
