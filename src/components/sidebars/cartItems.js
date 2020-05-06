import React, { useContext, useEffect, useState } from 'react';
import { Header, Button, Icon, Input, Image, List } from 'semantic-ui-react';
import Commerce from '@chec/commerce.js'

import { CartItemsContext } from '../../App'

const CartItems = (props) => {
    // console.log(props, 'props from sidebar for items')

    const [noQuantity, setNoQuantity] = useState()
    
    const helpFnc = useContext(CartItemsContext)

    const imgLinkSrc = (productID) => {

        if (productID === process.env.REACT_APP_MELON_ID) {
            return process.env.REACT_APP_WATER_SRC
        }

        if (productID === process.env.REACT_APP_PINE_ID) {
            return process.env.REACT_APP_PINE_SRC
        }
    }   

    return (
        <>
            <Image
                rounded 
                size='tiny' 
                // src={props.item.media.source}
                src={imgLinkSrc(props.item.product_id)} 
            />
            <List.Content className='cart-item-container'>
                <h3 size='huge' color='green'>{props.item.name}</h3>
                <h4>{props.item.variants[0].option_name}</h4>
                <div className='quanity-group'>
                    <Button
                        // negative 
                        className='quan-buttons' 
                        onClick={() => {
                            let newQuantity = props.item.quantity - 1
                            helpFnc.subtractQuantity(props.item.id, newQuantity)
                        }}
                    > 
                        <Icon name='minus' /> 
                    </Button>
                    <Input 
                        className='input-quanity'
                        value={props.item.quantity} 
                    />
                    <Button
                        // positive 
                        className='quan-buttons'
                        onClick={() => {
                            let newQuanity = props.item.quantity + 1            
                            helpFnc.addQuantity(props.item.id, newQuanity)
                        }}
                    > 
                        <Icon name='plus' /> 
                    </Button>
                </div>
                {/* <h5 className='cart-item-total'>${props.item.line_total.formatted_with_symbol}</h5> */}
                {noQuantity && <p>Sorry - Only X left</p>}
            </List.Content>
        </>
    );
};

export default CartItems;