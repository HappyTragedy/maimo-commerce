import React, { useState, useContext } from "react";
import { Grid, Col } from "../components/Grid";
import CheckoutForm from "../components/CheckoutForm/CheckoutForm";
import { CartContext } from "../Contexts/CartContext";
import CartDetail from "../components/CartDetail/CartDetail";
import { getFirestore, getDate } from "../Services/firebase";
import { Container } from '../components/CartDetail/Styled'
import { H2 } from '../components/CheckoutForm/Styled'

const Checkout = () => {
    const { cart, getCartTotal, setCart } = useContext(CartContext);
    const [orderCreated, setOrderCreated] = useState(false);

    console.log(cart);

    const placeOrder = async (buyerData) => {
        //Vamos a preparar el pedido
        //Datos del usuario (values)

        //Estado del carrito

        //Orden en firebase

        try {
            const db = getFirestore();
            console.log(`order N ${buyerData.name}`);

            const cartItems = cart.map(({ id, name, price, quantity }) => {
                return { id, name, price, quantity };
            });

            console.log(cartItems)

            const order = {
                buyer: buyerData,
                items: cartItems,
                date: getDate(),
                total: getCartTotal(),
            };

            const res = await db.collection("orders").add(order);
            setCart([]);
            setOrderCreated(res.id);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <Container>
            {orderCreated ? (
                <H2>Checkout {`Order N ${orderCreated}`}</H2>
            ) : (
                <H2>Checkout</H2>
            )}

            <Grid>
                <Col desktop={6} tablet={6} mobile={12}>
                    <CartDetail getCartTotal={getCartTotal} cart={cart} />
                </Col>
                <Col desktop={6} tablet={6} mobile={12}>
                    <CheckoutForm handleSubmit={placeOrder} />
                </Col>
            </Grid>
        </Container>
    );
};

export default Checkout;