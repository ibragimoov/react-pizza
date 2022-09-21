import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { FilterSliceState, Sort, SortPropertyEnum } from "./types";

const initialState: FilterSliceState = {
    searchValue: "",
    categoryId: 0,
    currentPage: 1,
    sort: {
        name: "популярности",
        sortType: SortPropertyEnum.RATING,
    },
};

const filterReducer = createSlice({
    name: "filters",
    initialState,
    reducers: {
        setSearchValue(state, action: PayloadAction<string>) {
            state.searchValue = action.payload;
        },
        setCategoryId(state, action: PayloadAction<number>) {
            state.categoryId = action.payload;
        },
        setSort(state, action: PayloadAction<Sort>) {
            state.sort = action.payload;
        },
        setCurrentPage(state, action: PayloadAction<number>) {
            state.currentPage = action.payload;
        },
        setFilters(state, action: PayloadAction<FilterSliceState>) {
            state.currentPage = action.payload.currentPage;
            state.categoryId = action.payload.categoryId;
            state.sort = action.payload.sort;
        },
    },
});

export const selectSort = (state: RootState) => state.filter.sort;

export const selectFilter = (state: RootState) => state.filter;

export const {
    setCategoryId,
    setSort,
    setCurrentPage,
    setFilters,
    setSearchValue,
} = filterReducer.actions;

export default filterReducer.reducer;
