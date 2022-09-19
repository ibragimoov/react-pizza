import React from "react";

type CategoriesProps = {
    categoryType: number;
    onClickCategory: (i: number) => void;
};

const categories = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
];

const Categories: React.FC<CategoriesProps> = ({
    categoryType,
    onClickCategory,
}) => {
    return (
        <div className="categories">
            <ul>
                {categories.map((category, i) => (
                    <li
                        key={i}
                        onClick={() => onClickCategory(i)}
                        className={categoryType === i ? "active" : ""}
                    >
                        {category}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Categories;
