import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { Card, Button, Image } from 'semantic-ui-react';

const ProductCard = ({product, imgLink, index}) => {
    console.log(product, 'props from product list call')

    let history = useHistory()

    const goToDetails = e => {
        history.push(`/products/${product.id}`)
    }


    return (
        <Card className='product-card'>
            <Image 
                // src={product.media.source}
                // src={product.assets[0].url}
                src={`https://i.ibb.co/${imgLink[index]}`}
                onClick={goToDetails} 
            />
            <Card.Header className='product-title'>{product.name}</Card.Header>
            <Card.Meta className='product-meta'>{product.price.formatted_with_symbol}</Card.Meta>
        </Card>
    );
};

export default ProductCard;


// description={product.description.replace(/(<([^>]+)>)/ig,"")}
