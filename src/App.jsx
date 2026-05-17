import { HashRouter, Routes, Route } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { FavoritesProvider } from "./contexts/FavoritesContext";
import { RecordsProvider } from "./contexts/RecordsContext";
import { Navbar } from "./components/Navbar/Navbar";
import { Home } from "./pages/Home/Home";
import { Explore } from "./pages/Explore/Explore";
import { Records } from "./pages/Records/Records";
import { Favorites } from "./pages/Favorites/Favorites";

function Layout() {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default function App() {
  return (
    <HashRouter>
      <FavoritesProvider>
        <RecordsProvider>
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="explore" element={<Explore />} />
              <Route path="records" element={<Records />} />
              <Route path="favorites" element={<Favorites />} />
            </Route>
          </Routes>
        </RecordsProvider>
      </FavoritesProvider>
    </HashRouter>
  );
}
