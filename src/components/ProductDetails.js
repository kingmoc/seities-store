import React, { useState, useEffect } from 'react';
import Commerce from '@chec/commerce.js'
import ImageGallery from 'react-image-gallery';
import { Header, Button, Dropdown, Label } from 'semantic-ui-react';

import {numOfShirts} from '../misc/quanityOptions'

const ProductDetails = (props) => {

    // console.log(props, 'some props')

    const commerce = new Commerce(process.env.REACT_APP_PUBLICKEY_SANDBOX)

    const [product, setProduct] = useState([])
    const [images, setImages] = useState([])
    const [numShirts, setNumShirts] = useState(1)
    const [variantInfo, setVariantInfo] = useState(1)

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

        btn.forEach(el => {
            el.classList.remove('active')
        })
    }

    const handleVariantInfo = e => {

        const variantId = e.target.id
        const variantOption = e.target.value

        if (!e.target.classList.contains('active')) {
            setVariantInfo({[variantId]: variantOption})
            clearActive()
        }

        if (e.target.classList.contains('active')) {
            setVariantInfo(null)
        }
        
        e.target.classList.toggle('active')
    }

    const getQuanity = (e, {value}) => {
        setNumShirts(value)
    }

    const addToCart = e => {
        // e.preventDefault()
        // commerce.cart.add(product.id, numShirts, variantInfo)
        //     .then(res => {
        //         console.log(res, 'response from adding to Cart')
        //         props.setCartVisible(true)
        //         props.setCartQaunity(props.cartQuanity + 1)
        //     })

        if (variantInfo !== 1) {
            console.log('add to cart!')
            clearActive()
        } else {
            setVariantInfo(false)
        }


        console.log(product.id, 'product ID')
        console.log(numShirts, 'quanity of shirt')
        console.log(variantInfo, 'variant information')
    }

    return (
        <>
            <ImageGallery items={images} showFullscreenButton={false} showPlayButton={false} />
            <Header>{product.name}</Header>
            {product.length !==0 && (
                <>
                    <div className='price-quanity'>
                        <Dropdown
                            className="quanity-drop"
                            onChange={getQuanity}
                            value={numShirts} 
                            fluid
                            placeholder='How Many' 
                            selection
                            options={numOfShirts}
                        />
                        <Header>{product.price.formatted_with_symbol}</Header>
                    </div>

                    <div className='all-btn-sizes'>
                        {product.variants[0].options.map(size => {
                            return(
                                <Button 
                                    className='button-sizes'
                                    basic 
                                    key={size.id}
                                    onClick={handleVariantInfo}
                                    value={size.id}
                                    id={product.variants[0].id}
                                >
                                    {size.name}
                                </Button>
                            )
                        })}
                    </div>
                    {!variantInfo && (
                        <Label
                            className='label-sizes' 
                            basic 
                            color='red' 
                        >
                            Please select size
                        </Label>
                    )} 
                </>
            )}
            <Button 
                onClick={addToCart}
                fluid 
                size='big' 
                color='green'
            >
                Add to Cart
            </Button>
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
