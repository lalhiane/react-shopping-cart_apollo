import MainStyles from "../../main.module.css";

import Styles from "./Cart.module.css";

import { useCartProducts, useTotalPrice } from "../../apollo/cart";

const Cart = () => {

    const [cartProducts, , controlQuantity,
        
        deleteFromCart, clearCart] = useCartProducts();
    
    const [totalPrice, setTotalPrice] = useTotalPrice();

    // let totalPrice = cartProducts.reduce((acc, product) => {

    //     return acc + (product.price * product.quantity);

    // }, 0);

    return (<div className={MainStyles.container}>

        <div className={Styles["cart-info"]}>

            <div className={Styles["total-price"]}>
                
                Total: ${totalPrice.toFixed(2)}
            
            </div>

            <button
                
                className={MainStyles["btn"]}
                
                onClick={_ => {

                    clearCart();

                    setTotalPrice(0);

                }}
            
            >

                {`Clear (${cartProducts.length})`}
            
            </button>

        </div>

        <div className={Styles["products-cards"]}>{

            cartProducts.map(product => {

                const { id, title, category, price, image, quantity } = product;

                return (

                    <div key={id} className={Styles["product-card"]}>

                        <div className={Styles["product-info"]}>

                            <img src={image} alt={title} />

                            <div className={Styles["text-info"]}>

                                <h3 className={Styles["product-title"]}>
                                    
                                    {title?.substr(0, 15)}...
                                
                                </h3>

                                <h5 className={Styles["product-category"]}>
                                    
                                    {category}
                                
                                </h5>

                            </div>

                        </div>

                        <div className={Styles["product-actions"]}>

                            <div className={Styles["product-quantity"]}>

                                <span onClick={() => {

                                    controlQuantity("sub", product);
 
                                    if (quantity === 1) {

                                        deleteFromCart(product);

                                    }
                                    
                                }}>-</span>

                                <span>{quantity}</span>

                                <span onClick={() => {

                                    controlQuantity("add", product);
                                    
                                }}>+</span>

                            </div>

                            <span className={Styles["product-price"]}>
                                
                                ${(price* (quantity)).toFixed(2)}
                            
                            </span>
                    
                            <button
                                
                                className={Styles["delete-btn"]}

                                onClick={_ => {

                                    deleteFromCart(product);

                                }}
                            
                            >
                                
                                &times;
                            
                            </button>
                    
                        </div>

                    </div>

                );

            })
            
        }</div>

    </div>);

}

export default Cart;