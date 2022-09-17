import React from "react";
import qs from "qs";
import { useEffect, useState, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

import {
    setCategoryId,
    setCurrentPage,
    setFilters,
} from "../redux/slices/filterSlice";
import { fetchPizzas, selectPizzaData } from "../redux/slices/pizzaSlice";

import Categories from "../components/Categories";
import Sort, { sortList } from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Pagination from "../components/Pagination";
import { SearchContext } from "../App.js";

const Home = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isSearch = useRef(false);
    const isMounted = useRef(false);

    const { categoryId, sort, currentPage, searchValue } = useSelector(
        (state) => state.filter
    );
    const { items, status } = useSelector(selectPizzaData);

    const onClickCategory = (id) => {
        dispatch(setCategoryId(id));
    };

    const getPizzas = async () => {
        const sortBy = sort.sortType.replace("-", "");
        const order = sort.sortType.includes("-") ? "desc" : "asc";
        const category = categoryId > 0 ? `category=${categoryId}` : ``;
        const searchFor = searchValue ? `&search=${searchValue}` : ``;

        const { data } = await axios.get(
            `https://62f10ae025d9e8a2e7c49dfa.mockapi.io/items`
        );

        dispatch(
            fetchPizzas({
                sortBy,
                order,
                category,
                searchFor,
                currentPage,
            })
        );

        setPageCount(Math.ceil(data.length / 8));
    };

    const [pageCount, setPageCount] = useState(0);

    useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1));

            const sort = sortList.find((obj) => obj.sortType === params.sortBy);

            dispatch(
                setFilters({
                    ...params,
                    sort,
                })
            );

            isSearch.current = false;
        }
    }, []);

    useEffect(() => {
        if (!isSearch.current) {
            getPizzas();
        }

        isSearch.current = false;
        // window.scrollTo(0, 0);
    }, [categoryId, sort.sortType, searchValue, currentPage]);

    useEffect(() => {
        if (isMounted.current) {
            const queryString = qs.stringify({
                sortBy: sort.sortType,
                categoryId,
                currentPage,
            });

            navigate(`?${queryString}`, { replace: true });
        }
        isMounted.current = true;
    }, [categoryId, sort, currentPage]);

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
            {status === "error" ? (
                <div className="content__error_info">
                    <h2>Произошла ошибка 😓</h2>
                    <p>
                        К сожалению, не удалось получить питсы. Повторите
                        попытку позже.
                    </p>
                </div>
            ) : (
                <div className="content__items">
                    {status === "loading" ? skeletonsElements : pizzasElements}
                </div>
            )}
            <Pagination
                pageCount={2}
                onChangePage={(i) => dispatch(setCurrentPage(i))}
            />
        </div>
    );
};

export default Home;
