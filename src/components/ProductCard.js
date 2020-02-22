import React from 'react';
import { Card } from 'semantic-ui-react';

const ProductCard = ({product}) => {

    return (
        <Card 
            image={product.media.source}
            header={product.name}
            meta={product.price.formatted_with_symbol}
            description={product.description.replace(/(<([^>]+)>)/ig,"")}
        />
    );
};

export default ProductCard;