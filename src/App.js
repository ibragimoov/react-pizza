import "./scss/app.scss";

import Header from "./components/Header";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

import { Routes, Route } from "react-router-dom";
import { Cart } from "./pages/Cart";
import { createContext, useState } from "react";

export const SearchContext = createContext();

function App() {
  const [search, setSearch] = useState("");

  return (
    <div className="wrapper">
      <SearchContext.Provider value={{ search, setSearch }}>
        <Header />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home search={search} />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </SearchContext.Provider>
    </div>
  );
}

export default App;
