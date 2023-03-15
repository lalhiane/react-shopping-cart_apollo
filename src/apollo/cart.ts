import { makeVar, useReactiveVar } from '@apollo/client';

import { Product } from './getProducts';

interface Cart extends Product {

    quantity: number,

}

export const cartProducts = makeVar<Cart[]>([]);

export const totalPrice = makeVar<number>(0);

export const setTotalPrice = (price: number) => {

    totalPrice(price);

}

export const setCartProducts = (p: Product, v: number) => {

    let findProduct = cartProducts().find(item => {

        return item.id === p.id

    });

    if (findProduct) {

        findProduct.quantity += v;

        setTotalPrice(totalPrice() + findProduct.price);

    } else {

        let productClone = { ...p, quantity: v };

        cartProducts([...cartProducts(), productClone]);

        setTotalPrice(totalPrice() + (productClone.price * v));

    }

}

export const controlQuantity = (t: string, p: Cart) => {

    let findProduct = cartProducts().find(item => {

        return item.id === p.id;

    });

    if (findProduct) {

        if (t === "add") {

            findProduct.quantity += 1;
            
            setTotalPrice(totalPrice() + findProduct.price);

        }

        else {

            findProduct.quantity -= 1;

            setTotalPrice(totalPrice() - findProduct.price);

        }

        cartProducts([...cartProducts()]);

    }

}

export const deleteFromCart = (p: Cart) => {

    cartProducts(cartProducts().filter(item => item.id !== p.id));

    setTotalPrice(totalPrice() - (p.price * p.quantity));

}

export const clearCart = () => {

    cartProducts([]);

}

export const useTotalPrice = (): [number, (price: number) => void] => {

    return [useReactiveVar(totalPrice), setTotalPrice];

}

export const useCartProducts = (): [
    
    Cart[],
    
    (p: Product, v: number) => void,

    (t: string, p: Cart) => void,

    (p: Cart) => void,

    () => void

    ] => {

    return [
        
        useReactiveVar(cartProducts),
        
        setCartProducts,
        
        controlQuantity,

        deleteFromCart,

        clearCart
    
    ];

} 