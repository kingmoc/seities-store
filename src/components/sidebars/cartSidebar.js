import React, { useState, useEffect } from 'react';
import Commerce from '@chec/commerce.js'
import { Icon, Header, Button } from 'semantic-ui-react';

const CartSidebar = (props) => {

    const commerce = new Commerce(process.env.REACT_APP_PUBLICKEY_SANDBOX)

    useEffect(() => {
        commerce.cart.contents()
            .then(res => {
                console.log(res, 'response from cart retrieve method')
            })
    }, [props.cartQuanity])

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
            <div className='cart-total'>
                <Header color='grey' size='medium'>Subtotal</Header>
                <Header color='grey' size='medium'>$0.00</Header>
            </div>
            <Header size='small' textAlign='center' color='red'>Shipping and Taxes calculated at checkout</Header>
            <Button inverted color='green' size='big' className='cart-button'>
                Checkout
                <Icon name='arrow right' />
            </Button>
        </>
    ); 
};

export default CartSidebar;