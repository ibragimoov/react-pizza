import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    categoryId: 0,
    sort: {
        name: "популярности",
        sortType: "rating",
    },
};

const filterReducer = createSlice({
    name: "filters",
    initialState,
    reducers: {
        setCategoryId(state, action) {
            state.categoryId = action.payload;
        },
        setSort(state, action) {
            state.sort = action.payload;
        },
    },
});

export const { setCategoryId, setSort } = filterReducer.actions;

export default filterReducer.reducer;
