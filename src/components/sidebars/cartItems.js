import React, { useContext } from 'react';
import { Header, Button, Icon, Input, Image, List } from 'semantic-ui-react';

import { CartItemsContext } from '../../App'

const CartItems = (props) => {

    // console.log(props, 'props from sidebar for items')

    const helpFnc = useContext(CartItemsContext)

    return (
        <>
            <Image size='tiny' src={props.item.media.source} />
            <List.Content>
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
                <Header className='cart-item-total'>${props.item.line_total.formatted_with_symbol}</Header>
            </List.Content>
        </>
    );
};

export default CartItems;