import React from 'react';

const CheckoutItems = (props) => {
    // console.log(props, 'props from checkout container')
    
    return (
        <>
            <div className='item-group-name-size'>
                <h3>{props.item.product_name}</h3>
                {props.item.variants[0].option_name} &nbsp;x
                {props.item.quantity}
            </div>
            <h4>{props.item.line_total.formatted_with_symbol}</h4>
        </>
    );
};

export default CheckoutItems;



