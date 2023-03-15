import { useEffect } from "react";

import { useProducts } from "../../apollo/getProducts";

import { useSelectedCategory } from "../../apollo/selectCategory";

import { useAppSelector } from "../../store/store";

import Styles from "./products.module.css";

import SingleProduct from "./SingleProduct";

const AllProducts = () => {

    const [products, setProducts] = useProducts();

    const [selectedCategory] = useSelectedCategory();

    const settingPrice = useAppSelector(state => state.settinPrice.price);

    const searchTerm = useAppSelector(state => state.searchTerm.term);
    
    useEffect(() => {

        if (selectedCategory === "All" || selectedCategory === "") {

            setProducts("https://fakestoreapi.com/products");

        } else {

            setProducts(
                
                `https://fakestoreapi.com/products/category/${selectedCategory}`
            
            );

        }

    }, [selectedCategory]);

    let cardsEl = products.map(product => {

        if (searchTerm !== "") {

            if (product.title?.toLowerCase().startsWith(searchTerm.toLowerCase())) {

                if (settingPrice.minPrice && settingPrice.maxPrice) {

                    if (product.price) {

                        if ((product.price >= +settingPrice.minPrice) &&
                            (product.price < +settingPrice.maxPrice)) {

                            return <SingleProduct key={product.id} product={product} />

                        }

                    }
        
                } else {

                    return <SingleProduct key={product.id} product={product} />

                }

            }

        } else {

            if (settingPrice.minPrice && settingPrice.maxPrice) {

                if (product.price) {

                    if ((product.price >= +settingPrice.minPrice) &&
                        (product.price < +settingPrice.maxPrice)) {

                        return <SingleProduct key={product.id} product={product} />

                    }

                }
    
            } else {

                return <SingleProduct key={product.id} product={product} />

            }

        }

    });

    return (
        
        <div className={Styles["all-products"]}>{ cardsEl }</div>
    
    );

}

export default AllProducts;