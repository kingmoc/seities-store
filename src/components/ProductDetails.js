import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import Commerce from '@chec/commerce.js'
import ImageGallery from 'react-image-gallery';
import { Header, Button, Dropdown, Label, Container, Message, Divider, Menu, Image } from 'semantic-ui-react';

import {numOfShirts} from '../misc/quanityOptions'

// Image Imports
import imgSizeBlue from '../img/sizing-blue.png'
import imgSizeGreen from '../img/sizing-green.png'
import gif from '../img/seities.gif'
import pic1 from '../img/seities1.png'
import picGirl from '../img/seities2-girl.JPG'
import picBoth from '../img/seities3-both.JPG'

const ProductDetails = (props) => {

    // console.log(props, 'some props')

    const commerce = new Commerce(process.env.REACT_APP_PUBLICKEY_SANDBOX)

    const [variantInfo, setVariantInfo] = useState(1)
    const [product, setProduct] = useState([])
    const [images, setImages] = useState([])
    const [numShirts, setNumShirts] = useState(1)    
    const [inCart, setInCart] = useState(false)
    const [activeItem, setActiveItem] = useState('details')

    let productId = props.match.params.id

    useEffect(() => {
        commerce.products.retrieve(productId)
          .then(res => {
            console.log(res, 'data from retreive products ...')
            setProduct(res)
          })
          .catch(err => console.log(err))

        // localStorage.removeItem('cart-id')
        
        // commerce.cart.contents()
        // .then(res => {
        //     console.log(res, 'response from cart retrieve method In product details')
        //     // props.setCartQaunity(res.length)
        // })
        
    },[])

    useEffect(() => {

        let gallery = []
        let thumbs = {}
        let mainPhoto = {}

        if(product.length !== 0) {

            product.assets.forEach((asset) => {

                // console.log(asset, 'asset from forEeach')

                if(asset.data.ext === 'jpg') {
                    gallery = [...gallery, {
                        original: asset.url,
                        thumbnail: ''
                    }]
                }

                if(asset.data.ext === 'png') {
                    thumbs[asset.data.name.charAt(0)] = asset.url
                }
            })
            
            gallery.forEach((pic, i) => {
                let url = pic.original
                let urlInfo = url.match(/[|][0-9]/)
                let key = urlInfo[0].charAt(1)
                pic.thumbnail = thumbs[key]
            })

            if (productId === process.env.REACT_APP_MELON_ID) {

                mainPhoto = {
                    original: "https://i.ibb.co/99Dt8f6/Shot6-color3.png",
                    thumbnail: "https://i.ibb.co/99Dt8f6/Shot6-color3.png",
                }
            }

            if (productId === process.env.REACT_APP_PINE_ID) {

                mainPhoto = {
                    original: "https://i.ibb.co/FJ3H8bH/Shot5-color.png",
                    thumbnail: "https://i.ibb.co/FJ3H8bH/Shot5-color.png",
                }
            }

            // let mainPhoto = {
            //     original: product.media.source,
            //     thumbnail: product.media.source,
            // }

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

        setInCart(false)

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
        setInCart(false)
        setNumShirts(value)
    }

    const handleButtonAddCart = e => {
        e.preventDefault()
        if(variantInfo && variantInfo !== 1) {
            props.addToCart(productId, numShirts, variantInfo)
        } else {
            setVariantInfo(false)
        }
        setNumShirts(1)
    } 
    
    const handleTabs = (e, {name}) => {
        setActiveItem(name)
    }

    return (
        <>  
            <section className='navigate-menu'>
                <Link className='shop-link' to='/'>Shop /</Link>
                <p to='/'>{product.name}</p>
            </section>
            <ImageGallery items={images} showFullscreenButton={false} showPlayButton={false} />
            <Container>
                <Header 
                    textAlign='center' 
                    size='large'
                    style={{marginTop: '20px'}}
                >
                    {product.name}
                </Header>
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
                                        // size='big' 
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
                        {inCart && (
                            <Label
                                className='label-sizes' 
                                basic 
                                color='red' 
                            >
                                Item Already in Cart! 
                            </Label>
                        )}
                    </>
                )}
                <Button 
                    onClick={handleButtonAddCart}
                    // fluid 
                    className='add-cart-button'
                    size='big' 
                    color='green'
                >
                    Add to Cart
                </Button>
                {/* <p>
                    Seities frees you to be yourself: a little bit weird, a little bit subversive, and with a 
                    whole world of choice. These are designs that are infinitely wearable and created to inject humour, 
                    unusual little details, and plenty of fun into your wardrobe. 
                </p> */}
                {/* <Divider /> */}
                <Menu pointing secondary fluid widths={3}>
                    <Menu.Item
                        name='details'
                        active={activeItem === 'details'}
                        onClick={handleTabs}
                    />
                    <Menu.Item
                        name='sizing'
                        active={activeItem === 'sizing'}
                        onClick={handleTabs}
                    />
                    <Menu.Item
                        name='shipping'
                        active={activeItem === 'shipping'}
                        onClick={handleTabs}
                    />
                </Menu>
                {activeItem === 'details' && (
                    <>
                        <ul>
                            <li>100% Organic Cotton</li>
                            <li>Earth Friendly Inks & Dyes</li>
                            <li>Uniquely Designed</li>
                            <li>Minimalist Style for Any Occassion</li>
                        </ul>
                    </>
                )}
                {activeItem === 'sizing' && (
                    <>
                        <Image src={imgSizeGreen}/>
                        {/* <Image src={imgSizeBlue}/> */}
                    </>
                )}                
                {activeItem === 'shipping' && (
                    <>
                        <Container>
                            <p>
                                Currently we only provide shipping to the United States &#128532;
                            </p>
                            <p>
                                Shipping cost will be a flat rate: <strong>$4.50</strong>  
                            </p>
                            <p>
                                If you want to make a bulk 
                                order (10 or more) - please contact us to arrange shipping.
                            </p>
                            <p>
                                We want you to be 100% satisfied with your Seities Apparel purchase. 
                                Items can be returned or exchanged within 30 days of delivery.
                            </p>
                        </Container>
                    </>
                )}
                <Message className='back-story'>
                    <Container>
                    <Message.Header>Back Story</Message.Header>
                        <p>
                            Seities was established to bring discrete character to versatile tees.
                        </p>
                        <p>
                            All of the Seities designs are short run, meaning that each highly 
                            desirable design is limited: when you choose a Seities tee you’re unlikely 
                            to see anyone else wearing the same style as you.
                        </p>
                        <Link to='#'>Read More ...</Link>
                    </Container>
                </Message>
                <Header textAlign='center'>What is your Seities ...?</Header>
                <p>
                    Seities frees you to be yourself: a little bit weird, a little bit subversive, and with a 
                    whole world of choice. These are designs that are infinitely wearable and created to inject humour, 
                    unusual little details, and plenty of fun into your wardrobe. 
                </p>
                <Image rounded src={gif} style={{margin: '0 auto'}} />
                <div className='pics-bottom'>
                    <Image rounded src={picGirl} />
                    <Image rounded src={pic1} />
                    <Image rounded src={picBoth} />
                </div>
                <Header textAlign='center'>Ready to Show Yourself!</Header>
                {product.length !==0 && (
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
                )}
                <Button 
                    onClick={handleButtonAddCart}
                    className='add-cart-button fade-in'
                    size='big' 
                    color='green'
                >
                    Add to Cart
                </Button>
            </Container>
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
