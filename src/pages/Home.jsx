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

import Categories from "../components/Categories";
import Sort, { sortList } from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Pagination from "../components/Pagination";
import { SearchContext } from "../App";

const Home = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isSearch = useRef(false);
    const isMounted = useRef(false);

    const { categoryId, sort, currentPage } = useSelector(
        (state) => state.filter
    );

    const onClickCategory = (id) => {
        dispatch(setCategoryId(id));
    };

    const fetchPizzas = () => {
        const sortBy = sort.sortType.replace("-", "");
        const order = sort.sortType.includes("-") ? "desc" : "asc";
        const category = categoryId > 0 ? `category=${categoryId}` : ``;
        const searchFor = search ? `&search=${search}` : ``;

        setIsLoading(true);
        axios
            .get(`https://62f10ae025d9e8a2e7c49dfa.mockapi.io/items`)
            .then((res) => {
                setPageCount(Math.ceil(res.data.length / 8));
            });
        axios
            .get(
                `https://62f10ae025d9e8a2e7c49dfa.mockapi.io/items?page=${currentPage}&limit=8&${category}&sortBy=${sortBy}&order=${order}${searchFor}`
            )
            .then((res) => {
                setItems(res.data);
                setIsLoading(false);
            });
    };

    const { search } = useContext(SearchContext);
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
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
            console.log(1);
            fetchPizzas();
        }

        isSearch.current = false;
        // window.scrollTo(0, 0);
    }, [categoryId, sort.sortType, search, currentPage]);

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
            <div className="content__items">
                {isLoading ? skeletonsElements : pizzasElements}
            </div>
            <Pagination
                pageCount={pageCount}
                onChangePage={(i) => dispatch(setCurrentPage(i))}
            />
        </div>
    );
};

export default Home;
