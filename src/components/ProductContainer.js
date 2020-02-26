import React, { useState, useEffect } from 'react';
import Commerce from '@chec/commerce.js'

import ProductCard from '../components/ProductCard'

const ProductContainer = () => {

    const commerce = new Commerce(process.env.REACT_APP_PUBLICKEY_SANDBOX)
    const [products, setProducts] = useState([])

    useEffect(() => {
        
        commerce.products.list()
          .then(res => {
            setProducts(res.data)
          })
          .catch(err => console.log(err))
    },[])
    
    return (
        <div className='products-container'>
            {products.map(product => <ProductCard product={product} key={product.id}/>)}
        </div>
    );
};

export default ProductContainer;