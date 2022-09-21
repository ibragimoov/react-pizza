export enum SortPropertyEnum {
    RATING = "rating",
    PRICE_DESC = "price",
    PRICE_ASC = "-price",
    TITLE = "title",
}

export type Sort = {
    name: string;
    sortType: SortPropertyEnum;
};

export interface FilterSliceState {
    searchValue: string;
    categoryId: number;
    currentPage: number;
    sort: Sort;
}
