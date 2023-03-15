import { makeVar, useReactiveVar } from '@apollo/client';

export const categories = makeVar<string[]>([]);

export const setCategories = async (url: string) => {

    const response = await fetch(url);

    const data = await response.json();

    categories(["All", ...data]);

}

export const useCategories = (): [string[], (url: string) => void] => {

    return [useReactiveVar(categories), setCategories];

}