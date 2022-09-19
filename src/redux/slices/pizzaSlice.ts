import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";

// все поля ключ-значение = строка
type fetchPizzasSlice = Record<string, string>;

type PizzaItems = {
    id: string;
    title: string;
    price: number;
    imageUrl: string;
    type: number[];
    size: number[];
    count: number;
};

export type SearchPizzaParams = {
    sortBy: string;
    order: string;
    category: string;
    searchFor: string;
    currentPage: string;
};

enum Status {
    LOADING = "loading",
    SUCCESS = "success",
    ERROR = "error",
}

interface PizzaSliceState {
    items: PizzaItems[];
    status: Status;
}

const initialState: PizzaSliceState = {
    items: [],
    status: Status.LOADING,
};

export const fetchPizzas = createAsyncThunk(
    "pizza/fetchPizzas",
    async (params: fetchPizzasSlice) => {
        const { sortBy, order, category, searchFor, currentPage } = params;
        const { data } = await axios.get<PizzaItems[]>(
            `https://62f10ae025d9e8a2e7c49dfa.mockapi.io/items?page=${currentPage}&limit=8&${category}&sortBy=${sortBy}&order=${order}${searchFor}`
        );
        return data as PizzaItems[];
    }
);

const pizzaReducer = createSlice({
    name: "pizza",
    initialState,
    reducers: {
        setItems(state, action) {
            state.items = action.payload;
        },
    },
    extraReducers(builder) {
        builder.addCase(fetchPizzas.pending, (state) => {
            state.status = Status.LOADING;
            state.items = [];
        });
        builder.addCase(fetchPizzas.fulfilled, (state, action) => {
            state.items = action.payload;
            state.status = Status.SUCCESS;
        });
        builder.addCase(fetchPizzas.rejected, (state) => {
            state.status = Status.ERROR;
            state.items = [];
        });
    },
});

export const selectPizzaData = (state: RootState) => state.pizza;

export const { setItems } = pizzaReducer.actions;

export default pizzaReducer.reducer;
