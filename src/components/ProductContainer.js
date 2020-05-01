import React, { useState, useEffect } from 'react';
import Commerce from '@chec/commerce.js'

import ProductCard from '../components/ProductCard'

const ProductContainer = () => {

    const commerce = new Commerce(process.env.REACT_APP_PUBLICKEY_SANDBOX)
    const [products, setProducts] = useState([])
    const [imgLink, setImgLink] = useState(["99Dt8f6/Shot6-color3.png", "FJ3H8bH/Shot5-color.png"])


    useEffect(() => {
        
        commerce.products.list()
          .then(res => {
            setProducts(res.data)
          })
          .catch(err => console.log(err))
    },[])
    
    return (
        <div className='products-container'>
            {products.map((product, i) => (
                <ProductCard
                    imgLink={imgLink} 
                    product={product}
                    index={i} 
                    key={product.id}
                />
            ))}
        </div>
    );
};

export default ProductContainer;