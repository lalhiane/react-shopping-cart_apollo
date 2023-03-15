import { makeVar, useReactiveVar } from '@apollo/client';

type Rating = {
    rate: number,
    count: number
}

export interface Product {
    id?: number,
    title?: string,
    price: number,
    description?: string,
    category?: string,
    image?: string,
    rating?: Rating,
    quantity?: number
}

export const products = makeVar<Product[]>([]);

export const setProducts = async (url: string) => {

    const response = await fetch(url);

    const data = await response.json();

    products(data);

}

export const useProducts = (): [Product[], (url: string) => void] => {

    return [useReactiveVar(products), setProducts];

}