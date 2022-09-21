import React from "react";
import qs from "qs";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

import Categories from "../components/Categories";
import Sort, { sortList } from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Pagination from "../components/Pagination";
import { useAppDispatch } from "../redux/store";
import { selectFilter } from "../redux/filter/selectors";
import { selectPizzaData } from "../redux/pizza/selectors";
import {
    setCategoryId,
    setCurrentPage,
    setFilters,
} from "../redux/filter/slice";
import { fetchPizzas } from "../redux/pizza/slice";
import { SearchPizzaParams } from "../redux/pizza/types";

const Home: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const isSearch = useRef(false);
    const isMounted = useRef(false);

    const { categoryId, sort, currentPage, searchValue } =
        useSelector(selectFilter);
    const { items, status } = useSelector(selectPizzaData);

    const onClickCategory = React.useCallback((id: number) => {
        dispatch(setCategoryId(id));
    }, []);

    const getPizzas = async () => {
        const sortBy = sort.sortType.replace("-", "");
        const order = sort.sortType.includes("-") ? "desc" : "asc";
        const category = categoryId > 0 ? `category=${categoryId}` : ``;
        const searchFor = searchValue ? `&search=${searchValue}` : ``;

        dispatch(
            fetchPizzas({
                sortBy,
                order,
                category,
                searchFor,
                currentPage: String(currentPage),
            })
        );

        const { data } = await axios.get(
            `https://62f10ae025d9e8a2e7c49dfa.mockapi.io/items`
        );

        setPageCount(Math.ceil(data.length / 8));
    };

    const [, setPageCount] = useState(0);

    useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(
                window.location.search.substring(1)
            ) as unknown as SearchPizzaParams;

            const sort = sortList.find((obj) => obj.sortType === params.sortBy);

            // if (sort) {
            //     params.sortBy = sort;
            // }

            dispatch(
                setFilters({
                    searchValue: params.searchFor,
                    categoryId,
                    currentPage: +params.currentPage,
                    sort: sort || sortList[0],
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

    const pizzasElements = items.map((pizza: any) => (
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
                onChangePage={(i: number) => dispatch(setCurrentPage(i))}
            />
        </div>
    );
};

export default Home;
