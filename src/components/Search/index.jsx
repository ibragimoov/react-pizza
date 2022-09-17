import React, { useCallback, useContext, useRef, useState } from "react";
import { SearchContext } from "../../App";
import debounce from "lodash.debounce";

import styles from "./Search.module.scss";
import { useDispatch } from "react-redux";
import { setSearchValue } from "../../redux/slices/filterSlice";

const Search = () => {
    const dispatch = useDispatch();
    const [value, setValue] = useState("");
    const inputRef = useRef();

    const clearSearch = () => {
        setValue("");
        dispatch(setSearchValue(""));
        inputRef.current.focus();
    };

    const updateSearch = useCallback(
        debounce((str) => {
            dispatch(setSearchValue(str));
        }, 150),
        []
    );

    const onChangeInput = (event) => {
        setValue(event.target.value);
        // updateSearch(event.target.value);
        updateSearch(event.target.value);
    };

    return (
        <div className={styles.root}>
            <svg
                className={styles.icon}
                fill="none"
                height="24"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
            >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" x2="16.65" y1="21" y2="16.65" />
            </svg>
            <input
                ref={inputRef}
                value={value}
                onChange={onChangeInput}
                className={styles.input}
                placeholder="Поиск"
            />
            {value && (
                <svg
                    onClick={clearSearch}
                    className={styles.clear}
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <line x1="18" x2="6" y1="6" y2="18" />
                    <line x1="6" x2="18" y1="6" y2="18" />
                </svg>
            )}
        </div>
    );
};

export default Search;
