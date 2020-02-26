import React, { useState, useEffect } from 'react';
import Commerce from '@chec/commerce.js'
import ImageGallery from 'react-image-gallery';
import { Header, Button, Dropdown } from 'semantic-ui-react';

import {numOfShirts} from '../misc/quanityOptions'

const ProductDetails = (props) => {

    // console.log(props, 'some props')

    const commerce = new Commerce(process.env.REACT_APP_PUBLICKEY_SANDBOX)

    const [product, setProduct] = useState([])
    const [images, setImages] = useState([])
    const [numShirts, setNumShirts] = useState()
    const [variantInfo, setVariantInfo] = useState()

    let productId = props.match.params.id

    useEffect(() => {
        commerce.products.retrieve(productId)
          .then(res => {
            console.log(res, 'data from call')
            setProduct(res)
          })
          .catch(err => console.log(err))
        
        commerce.cart.contents()
        .then(res => {
            console.log(res, 'response from cart retrieve method In product details')
            props.setCartQaunity(res.length)
        })
        
    },[])

    useEffect(() => {

        let gallery = []
        let thumbs = {}

        if(product.length !== 0) {

            product.assets.forEach((asset) => {

                if(asset.data.ext === 'png') {
                    gallery = [...gallery, {
                        original: asset.url,
                        thumbnail: ''
                    }]
                }

                if(asset.data.ext === 'jpg') {
                    thumbs[asset.data.name.charAt(0)] = asset.url
                }
            })
            
            gallery.forEach((pic, i) => {
                let url = pic.original
                let urlInfo = url.match(/[|][0-9]/)
                let key = urlInfo[0].charAt(1)
                pic.thumbnail = thumbs[key]
            })

            let mainPhoto = {
                original: product.media.source,
                thumbnail: product.media.source,
            }

            gallery.unshift(mainPhoto)
            setImages(gallery)
        }
    },[product])

    const clearActive = () => {
        let btn = document.querySelectorAll('.button-sizes')
        // console.log(btn, 'buttons')
        btn.forEach(el => {
            console.log(el.className, 'class list')
            el.classList.remove('active')
        })
    }

    const handleClick = e => {

        const variantId = e.target.id
        const variantOption = e.target.value

        if (!e.target.classList.contains('active')) {
            console.log('inside if')
            setVariantInfo({[variantId]: variantOption})
            clearActive()
        }

        if (e.target.classList.contains('active')) {
            console.log('in side second if')
            setVariantInfo(null)
        }
        
        e.target.classList.toggle('active')
    
    }

    const getSelectedInput = (e, {value}) => {
        console.log(value, 'value')
        setNumShirts(value)
    }

    const addToCart = e => {
        e.preventDefault()
        commerce.cart.add(product.id, numShirts, variantInfo)
            .then(res => {
                console.log(res, 'response from adding to Cart')
                props.setCartVisible(true)
                props.setCartQaunity(props.cartQuanity + 1)
            })
    }

    return (
        <>
            <ImageGallery items={images} showFullscreenButton={false} showPlayButton={false} />
            <Header>{product.name}</Header>
            {product.length !==0 && (
                <>
                    <Header>{product.price.formatted_with_symbol}</Header>
                    <Dropdown
                        onChange={getSelectedInput} 
                        // value={numShirts}
                        fluid
                        placeholder='How Many' 
                        selection
                        options={numOfShirts}
                    />
                    {product.variants[0].options.map(size => {
                        return(
                            <Button 
                                className='button-sizes'
                                basic 
                                key={size.id}
                                onClick={handleClick}
                                value={size.id}
                                id={product.variants[0].id}
                            >
                                {size.name}
                            </Button>
                        )
                    })}
                </>
            )}
            <Button onClick={addToCart} size='large' color='green'>Add to Cart</Button>
        </>
    );      
};

export default ProductDetails;



// Format of Image object
// const images = [
//     {
//       original: 'https://picsum.photos/id/1018/1000/600/',
//       thumbnail: 'https://picsum.photos/id/1018/250/150/',
//     },
//     {
//       original: 'https://picsum.photos/id/1015/1000/600/',
//       thumbnail: 'https://picsum.photos/id/1015/250/150/',
//     },
//     {
//       original: 'https://picsum.photos/id/1019/1000/600/',
//       thumbnail: 'https://picsum.photos/id/1019/250/150/',
//     },
//   ];

// commerce.cart.add(
//     'prod_QG375vVPR5rMOg',
//     // optional: the number of items to add
//     1,
//     // optional: if your product has variants, the variant and option ID to add
//     { vrnt_RyWOwmPO9lnEa2: 'optn_zkK6oLpvEoXn0Q' }
//   )

// commerce.cart.add('productId', [num of items], {vrtn: vrtnID})
