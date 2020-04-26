import React from 'react';
import { useHistory } from "react-router-dom";
import { Icon, Header, Button, List, Segment } from 'semantic-ui-react';

import CartItems from './cartItems'

const CartSidebar = (props) => {

    // console.log(props, 'props from cart')

    let history = useHistory()

    const goToCheckout = e => {
        history.push(`/checkout/${props.cart.id}`)
        localStorage.setItem('cart-id', props.cart.id)
        props.setCartVisible(false)
    }

    // const removeIcons = () => {
    //     let hamburger = document.querySelector('.hamburger')
    //     console.log(hamburger, 'class selection!!!!')
    //     hamburger.style.display = 'none'
    // }

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