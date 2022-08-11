import React from "react";
import { useEffect, useState } from "react";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";

const Home = ({ search }) => {
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [categoryId, setCategoryId] = useState(0);
    const [sort, setSort] = useState({
        name: "популярности",
        sortType: "rating",
    });

    useEffect(() => {
        const sortBy = sort.sortType.replace("-", "");
        const order = sort.sortType.includes("-") ? "desc" : "asc";
        const category = categoryId > 0 ? `category=${categoryId}` : ``;
        const searchFor = search ? `&search=${search}` : ``;

        setIsLoading(true);
        fetch(
            `https://62f10ae025d9e8a2e7c49dfa.mockapi.io/items?${category}&sortBy=${sortBy}&order=${order}${searchFor}`
        ).then((res) =>
            res.json().then((data) => {
                setItems(data);
                setIsLoading(false);
            })
        );
        window.scrollTo(0, 0);
    }, [categoryId, sort, search]);

    const pizzasElements = items.map((pizza) => (
        <PizzaBlock key={pizza.id} {...pizza} />
    ));

    const skeletonsElements = [...new Array(4)].map((_, index) => (
        <Skeleton key={index} />
    ));

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
                {isLoading ? skeletonsElements : pizzasElements}
            </div>
        </div>
    );
};

export default Home;
