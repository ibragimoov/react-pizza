import "./scss/app.scss";

import Header from "./components/Header";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

import { Routes, Route } from "react-router-dom";
import { Cart } from "./pages/Cart";
import { useState } from "react";

function App() {
    const [search, setSearch] = useState("");

    console.log(search);

    return (
        <div className="wrapper">
            <Header search={search} setSearch={setSearch} />
            <div className="content">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </div>
        </div>
    );
}

export default App;
