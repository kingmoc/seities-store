import React from 'react';
import { Icon, Header, Button, Item, List, Segment } from 'semantic-ui-react';

import CartItems from './cartItems'

const CartSidebar = (props) => {

    console.log(props, 'props from cart')

    return (
        <>
            <div className='cart-side'>
                <Header color='grey' size='huge'>Shopping Cart</Header>
                <Icon 
                    color='grey'
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
                        It would make you very happy if you added an item to the cart
                    </p>
                </Segment>
            )}
            {props.cart && props.cart.total_items && (
                <>
                    <Header size='small' textAlign='center' color='red'>Shipping and Taxes calculated at checkout</Header>
                    <Button inverted color='green' size='huge' className='cart-button'>
                        Checkout
                        <Icon name='arrow right' />
                    </Button>
                </>
            )}
        </>
    ); 
};

export default CartSidebar;