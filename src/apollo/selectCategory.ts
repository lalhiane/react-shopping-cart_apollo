import { makeVar, useReactiveVar } from '@apollo/client';

export const selectedCategory = makeVar<string>("");

export const setSelectedCategory = (category: string) => {

    selectedCategory(category);

}

export const useSelectedCategory = (): [string, (category: string) => void] => {

    return [useReactiveVar(selectedCategory), setSelectedCategory];

}