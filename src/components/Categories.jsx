export default function Categories({ categoryType, onClickCategory }) {
    const categories = [
        "Все",
        "Мясные",
        "Вегетарианская",
        "Гриль",
        "Острые",
        "Закрытые",
    ];

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
}
