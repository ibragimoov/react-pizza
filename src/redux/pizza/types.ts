export type fetchPizzasSlice = Record<string, string>;

export type PizzaItems = {
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

export enum Status {
    LOADING = "loading",
    SUCCESS = "success",
    ERROR = "error",
}

export interface PizzaSliceState {
    items: PizzaItems[];
    status: Status;
}
