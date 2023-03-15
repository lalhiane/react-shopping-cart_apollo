import { makeVar, useReactiveVar } from '@apollo/client';

import { Product } from './getProducts';

export const singleProduct = makeVar<Product>({price: 0});

export const setSingleProduct = async (id: string | undefined) => {
    
    const response = await fetch(`https://fakestoreapi.com/products/${id}`);

    const data = await response.json();

    singleProduct(data);

}

export const useSingleProduct = (): [Product, (id: string | undefined) => void] => {

    return [useReactiveVar(singleProduct), setSingleProduct];

}