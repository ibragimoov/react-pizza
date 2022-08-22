import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    categoryId: 1,
    currentPage: 1,
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
        setCurrentPage(state, action) {
            state.currentPage = action.payload;
        },
        setFilters(state, action) {
            state.currentPage = Number(action.payload.currentPage);
            state.categoryId = Number(action.payload.categoryId);
            state.sort = action.payload.sort;
        },
    },
});

export const { setCategoryId, setSort, setCurrentPage, setFilters } =
    filterReducer.actions;

export default filterReducer.reducer;
