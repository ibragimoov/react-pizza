import React from "react";
import { useEffect, useState, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";

import { setCategoryId } from "../redux/slices/filterSlice";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Pagination from "../components/Pagination";
import { SearchContext } from "../App";

const Home = () => {
    const dispatch = useDispatch();
    const { categoryId, sort } = useSelector((state) => state.filter);

    const onClickCategory = (id) => {
        dispatch(setCategoryId(id));
    };

    const { search } = useContext(SearchContext);
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageCount, setPageCount] = useState(0);

    useEffect(() => {
        const sortBy = sort.sortType.replace("-", "");
        const order = sort.sortType.includes("-") ? "desc" : "asc";
        const category = categoryId > 0 ? `category=${categoryId}` : ``;
        const searchFor = search ? `&search=${search}` : ``;

        setIsLoading(true);
        fetch(`https://62f10ae025d9e8a2e7c49dfa.mockapi.io/items`).then((res) =>
            res.json().then((data) => {
                setPageCount(Math.ceil(data.length / 8));
            })
        );
        fetch(
            `https://62f10ae025d9e8a2e7c49dfa.mockapi.io/items?page=${currentPage}&limit=8&${category}&sortBy=${sortBy}&order=${order}${searchFor}`
        ).then((res) =>
            res.json().then((data) => {
                setItems(data);
                setIsLoading(false);
            })
        );
        // window.scrollTo(0, 0);
    }, [categoryId, sort, search, currentPage]);

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
                    onClickCategory={onClickCategory}
                />
                <Sort />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {isLoading ? skeletonsElements : pizzasElements}
            </div>
            <Pagination
                pageCount={pageCount}
                onChangePage={(i) => setCurrentPage(i)}
            />
        </div>
    );
};

export default Home;
