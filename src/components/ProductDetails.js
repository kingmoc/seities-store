import React, { useState, useEffect } from 'react';
import Commerce from '@chec/commerce.js'

const ProductDetails = (props) => {

    const [product, setProduct] = useState([])
    let productId = props.match.params.id

    useEffect(() => {
        const commerce = new Commerce(process.env.REACT_APP_PUBLICKEY_SANDBOX)
        commerce.products.retrieve(productId)
          .then(res => {
            console.log(res, 'data from call')
            setProduct(res)
          })
          .catch(err => console.log(err))
    },[])

    return (
        <div>
            <h1>Hello from ProductDetails {product.id}</h1>
        </div>
    );
};

export default ProductDetails;




