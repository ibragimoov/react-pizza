import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPizzas = createAsyncThunk(
    "pizza/fetchPizzas",
    async (params) => {
        const { sortBy, order, category, searchFor, currentPage } = params;
        const { data } = await axios.get(
            `https://62f10ae025d9e8a2e7c49dfa.mockapi.io/items?page=${currentPage}&limit=8&${category}&sortBy=${sortBy}&order=${order}${searchFor}`
        );
        return data;
    }
);

const initialState = {
    items: [],
    status: "loading", // loading | success | error
};

const pizzaReducer = createSlice({
    name: "pizza",
    initialState,
    reducers: {
        setItems(state, action) {
            state.items = action.payload;
        },
    },
    extraReducers: {
        [fetchPizzas.pending]: (state, action) => {
            state.status = "loading";
            state.items = [];
        },
        [fetchPizzas.fulfilled]: (state, action) => {
            state.items = action.payload;
            state.status = "success";
        },
        [fetchPizzas.rejected]: (state, action) => {
            state.status = "error";
            state.items = [];
        },
    },
});

export const { setItems } = pizzaReducer.actions;

export default pizzaReducer.reducer;
