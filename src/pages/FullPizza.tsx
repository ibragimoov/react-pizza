import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const FullPizza: React.FC = () => {
    const [pizza, setPizza] = useState<{
        imageUrl: string;
        title: string;
        price: number;
    }>();
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchPizza() {
            try {
                const { data } = await axios.get(
                    "https://62f10ae025d9e8a2e7c49dfa.mockapi.io/items/" + id
                );
                setPizza(data);
            } catch (e) {
                alert("Ошибка при получении питсы");
                navigate("/");
            }
        }

        fetchPizza();
    }, []);

    if (!pizza) {
        return <>Загрузка. . .</>;
    }

    return (
        <div className="container">
            <img src={pizza.imageUrl} />
            <h2>{pizza.title}</h2>
            <h4>{pizza.price}</h4>
        </div>
    );
};

export default FullPizza;
