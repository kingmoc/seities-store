import React, { useState, useEffect } from 'react';
import Commerce from '@chec/commerce.js'
import ImageGallery from 'react-image-gallery';
import { Header, Button } from 'semantic-ui-react';

const ProductDetails = (props) => {

    const [product, setProduct] = useState([])
    const [images, setImages] = useState([])

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
        // e.preventDefault()
        clearActive()
        e.target.classList.toggle('active')
        // console.log(e.target, 'works')
    }

    return (
        <>
            <ImageGallery items={images} showFullscreenButton={false} showPlayButton={false} />
            <Header>{product.name}</Header>
            {product.length !==0 && (
                <>
                    <Header>{product.price.formatted_with_symbol}</Header>
                    {product.variants[0].options.map(size => {
                        return(
                            <Button 
                                className='button-sizes'
                                basic 
                                key={size.id}
                                onClick={handleClick}
                            >
                                {size.name}
                            </Button>
                        )
                    })}
                </>
            )}
            <Button size='large' color='green'>Add to Cart</Button>
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

