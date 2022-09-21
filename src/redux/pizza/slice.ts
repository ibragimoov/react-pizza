import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { fetchPizzasSlice, PizzaItems, PizzaSliceState, Status } from "./types";

// все поля ключ-значение = строка

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

export const { setItems } = pizzaReducer.actions;

export default pizzaReducer.reducer;
