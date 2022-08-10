import "./scss/app.scss";

import Header from "./components/Header";
import Categories from "./components/Categories";
import Sort from "./components/Sort";
import PizzaBlock from "./components/PizzaBlock";

import Skeleton from "./components/PizzaBlock/Skeleton";

import { useEffect, useState } from "react";

function App() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("https://62f10ae025d9e8a2e7c49dfa.mockapi.io/items").then((res) =>
      res.json().then((data) => {
        setItems(data);
        setIsLoading(false);
      })
    );
  }, []);

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {isLoading
              ? [...new Array(4)].map((_, index) => <Skeleton key={index} />)
              : items.map((pizza) => <PizzaBlock key={pizza.id} {...pizza} />)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
