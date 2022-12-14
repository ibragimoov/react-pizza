import React from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectSort } from "../redux/filter/selectors";
import { setSort } from "../redux/filter/slice";
import { SortPropertyEnum } from "../redux/filter/types";

type SortItem = {
    name: string;
    sortType: SortPropertyEnum;
};

type PopupClick = Event & {
    path: Node[];
};

export const sortList: SortItem[] = [
    { name: "популярности", sortType: SortPropertyEnum.RATING },
    { name: "цене (дешевые)", sortType: SortPropertyEnum.PRICE_DESC },
    { name: "цене (дорогие)", sortType: SortPropertyEnum.PRICE_ASC },
    { name: "алфавиту", sortType: SortPropertyEnum.TITLE },
];

const SortPopup: React.FC = React.memo(() => {
    const dispatch = useDispatch();
    const sortType = useSelector(selectSort);
    const [isVisible, setIsVisible] = useState(false);
    const sortRef = useRef<HTMLDivElement>(null);

    const onChangeSort = (obj: SortItem) => {
        dispatch(setSort(obj));
    };

    useEffect(() => {
        const handleClickSort = (event: Event) => {
            const _event = event as PopupClick & {
                path: Node[];
            };
            if (sortRef.current && !_event.path.includes(sortRef.current)) {
                setIsVisible(false);
            }
        };
        document.body.addEventListener("click", handleClickSort);

        return () => {
            document.body.removeEventListener("click", handleClickSort);
        };
    }, []);

    return (
        <div ref={sortRef} className="sort">
            <div className="sort__label">
                <svg
                    width="10"
                    height="6"
                    viewBox="0 0 10 6"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
                        fill="#2C2C2C"
                    />
                </svg>
                <b>Сортировка по:</b>
                <span onClick={() => setIsVisible(!isVisible)}>
                    {sortType.name}
                </span>
            </div>
            {isVisible && (
                <div className="sort__popup">
                    <ul>
                        {sortList.map((obj, i) => (
                            <li
                                key={i}
                                onClick={() => {
                                    onChangeSort(obj);
                                    setIsVisible(!isVisible);
                                }}
                                className={
                                    sortType.sortType === obj.sortType
                                        ? "active"
                                        : ""
                                }
                            >
                                {obj.name}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
});

export default SortPopup;
