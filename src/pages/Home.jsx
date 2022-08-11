import React from "react";
import { useEffect, useState } from "react";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";

const Home = () => {
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [categoryId, setCategoryId] = useState(0);
    const [sort, setSort] = useState({
        name: "популярности",
        sortType: "rating",
    });

    useEffect(() => {
        setIsLoading(true);
        console.log(categoryId, sort.sortType);
        fetch(
            `https://62f10ae025d9e8a2e7c49dfa.mockapi.io/items?${
                categoryId > 0 ? `category=${categoryId}` : ``
            }&sortBy=${sort.sortType}&order=desc`
        ).then((res) =>
            res.json().then((data) => {
                setItems(data);
                setIsLoading(false);
            })
        );
        window.scrollTo(0, 0);
    }, [categoryId, sort]);

    return (
        <div className="container">
            <div className="content__top">
                <Categories
                    categoryType={categoryId}
                    onClickCategory={(id) => setCategoryId(id)}
                />
                <Sort
                    sortType={sort}
                    onChangeSort={(sortObj) => setSort(sortObj)}
                />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {isLoading
                    ? [...new Array(4)].map((_, index) => (
                          <Skeleton key={index} />
                      ))
                    : items.map((pizza) => (
                          <PizzaBlock key={pizza.id} {...pizza} />
                      ))}
            </div>
        </div>
    );
};

export default Home;
