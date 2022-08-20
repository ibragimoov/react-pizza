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
            const findItem = state.items.find(
                (obj) => obj.id === action.payload.id
            );

            if (findItem) {
                findItem.count++;
            } else {
                state.items.push({
                    ...action.payload,
                    count: 1,
                });
            }

            state.totalPrice = state.items.reduce(
                (sum, obj) => obj.price * obj.count + sum,
                0
            );
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
