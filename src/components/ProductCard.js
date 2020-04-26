import React from 'react';
import { useHistory } from "react-router-dom";
import { Card, Button, Image } from 'semantic-ui-react';

const ProductCard = ({product}) => {

    let history = useHistory()

    const goToDetails = e => {
        history.push(`/products/${product.id}`)
    }


    return (
        <Card className='product-card'>
            <Image 
                src={product.media.source}
                onClick={goToDetails} 
            />
            <Card.Header className='product-title'>{product.name}</Card.Header>
            <Card.Meta className='product-meta'>{product.price.formatted_with_symbol}</Card.Meta>
        </Card>
    );
};

export default ProductCard;


// description={product.description.replace(/(<([^>]+)>)/ig,"")}
