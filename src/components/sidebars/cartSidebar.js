import React, { useState, useEffect } from 'react';
import Commerce from '@chec/commerce.js'
import { useHistory } from "react-router-dom";
import { Icon, Header, Button, List, Segment } from 'semantic-ui-react';

import CartItems from './cartItems'

const CartSidebar = (props) => {

    // console.log(props, 'props from cart')

    const commerce = new Commerce(process.env.REACT_APP_PUBLICKEY_SANDBOX)
    const [proceedToCheckout, setProcceedToCheckout] = useState()
    const [productName, setProductName] = useState()
    const [currentQuantity, setCurrentQuantity] = useState()
    const [size, setSize] = useState()

    let history = useHistory()

    useEffect(() => {

        let quantityInfo = {}
        let productIdFromCart = new Set()
        setProcceedToCheckout(true)

        props.cart && props.cart.line_items.forEach(item => {
            quantityInfo[item.variants[0].option_id] = item.quantity
            productIdFromCart.add(item.product_id)
        })

        for (const productId of productIdFromCart) {

            commerce.products.retrieve(productId)
                .then(res => {
                    // console.log(res, 'res from checkQuantity')
                    res.variants[0].options.forEach(option => {
                        // console.log(option, 'option from variants looping!')
                        if (quantityInfo[option.id] && quantityInfo[option.id] > option.quantity) {
                            // console.log('CANNOT CHECKOUT')
                            setProcceedToCheckout(false)
                            setProductName(res.name)
                            setCurrentQuantity(option.quantity)
                            setSize(option.name)
                        }
                    })
                })
                .catch(err => console.log(err))

            if (proceedToCheckout) {
                setProcceedToCheckout(true)
            }
        }

    }, [props.cart && props.cart.total_items])

    const goToCheckout = e => {

        if (proceedToCheckout) {
            history.push(`/checkout/${props.cart.id}`)
            localStorage.setItem('cart-id', props.cart.id)
            props.setCartVisible(false)
        } else {
            window.alert(`${productName} with size: ${size} has only ${currentQuantity} left in stock`)
        }
    }

    return (
        <>
            <div className='cart-side'>
                <Header size='huge'>Shopping Cart</Header>
                <Icon
                    name='x' 
                    size='big'
                    onClick={() => props.setCartVisible(false)}
                />
            </div>
            {props.cart && props.cart.total_unique_items > 0 && (
                <List inverted>
                   {props.cart.line_items.map(item => (
                       <List.Item className='cart-item' key={item.id}>
                           <CartItems item={item} />
                       </List.Item>
                   ))}
                </List>
            )}
            <div className='cart-total'>
                <h2>Subtotal</h2>
                <h2>{props.cart && props.cart.subtotal.formatted_with_symbol}</h2>
            </div>
            {props.cart && !props.cart.total_items && (
                <Segment className='empty-cart-segment' secondary>
                    <Header>Your Cart is currently Empty</Header>
                    <p>
                        It would make you very happy if you added an item to the cart!
                    </p>
                </Segment>
            )}
            {props.cart && props.cart.total_items > 0 && (
                <>
                    <Header size='small' textAlign='center' color='red'>Shipping calculated at checkout</Header>
                    <Button 
                        color='green' 
                        size='huge' 
                        className='cart-button'
                        onClick={goToCheckout}
                    >
                        Checkout
                        <Icon name='arrow right' />
                    </Button>
                </>
            )} 
        </>
    ); 
};

export default CartSidebar;