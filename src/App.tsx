import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MovieDetail from "./pages/MovieDetail";
import ThemeToggle from "./components/ToggleTheme";

function App() {
  return (
    <div className="p-4 min-h-screen w-screen bg-gray-100 dark:bg-gray-900">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
      </Routes>
      <ThemeToggle />
    </div>
  );
}

export default App;
