import React, { useState, useEffect } from 'react';
import Commerce from '@chec/commerce.js'
import ImageGallery from 'react-image-gallery';

const ProductDetails = (props) => {

    const [product, setProduct] = useState([])
    const [images, setImages] = useState([])
    // let test = []

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

    return (
        <div>
            {/* {buildGallery()} */}
            {/* <h1>Hello from ProductDetails {product.id}</h1> */}
            <ImageGallery items={images} showFullscreenButton={false} showPlayButton={false} />
        </div>
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

