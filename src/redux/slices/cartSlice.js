import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [],
    totalPrice: 0,
};

const cartReducer = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addItem: (state, action) => {
            state.items.push(action.payload);
        },
        removeItem: (state, action) => {
            state.items.filter((item) => item.id !== action.payload);
        },
        clearItems: (state, action) => {
            state.items = [];
        },
    },
});

export const { addItem, removeItem, clearItems } = cartReducer.actions;

export default cartReducer.reducer;
