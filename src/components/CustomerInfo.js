import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import Commerce from '@chec/commerce.js'
import { Accordion, Icon, Header, Container, Button, Divider, Input, Loader, Image } from 'semantic-ui-react';

// Component Import
import CheckoutItems from './CheckoutItems'

//Image Import
import gif from '../img/loader.gif'

const CustomerInfo = (props) => {
    console.log(props, 'props from Customer Info')

    const commerce = new Commerce(process.env.REACT_APP_PUBLICKEY_SANDBOX)

    const [activeIndex, setActiveIndex] = useState(0)
    const [liveObject, setLiveObject] = useState()
    const [tokenId, setTokenId] = useState()
    const [paidFor, setPaidFor] = useState()
    const [loaded, setLoaded] = useState()
    const [discountCode, setDiscountCode] = useState()
    const [noDiscountCode, setNoDiscountCode] = useState()
    const [invalidDiscountCode, setInvalidDiscountCode] = useState()
    const [processing, setProcessing] = useState(false)
    const [email, setEmail] = useState()

    let cartId = props.match.params.id

    let paypalRef = useRef()

    let history = useHistory()

    useEffect(() => {

        /* *** Getting Checkout Token - Set Live Object in State *** */
        
        commerce.checkout.generateToken(cartId, { type: 'cart' })
            .then(res => {
                // console.log(res, 'response from generating checkout Token')
                setTokenId(res.id)
                commerce.checkout.checkShippingOption(res.id, {
                    id: res.shipping_methods[0].id,
                    country: "US"
                })
                    .then(res => {  
                        console.log(res, 'res from appplying shipping')
                        setLiveObject(res.live)
                    })
                    .catch(err => console.log(err, 'ERROR!!'))
            })
            .catch(err => {
                console.log(err, 'ERROR!!')
            })

        /* *** Loading Paypal Script *** */
        const script = document.createElement('script')
        script.src = `https://www.paypal.com/sdk/js?client-id=${process.env.REACT_APP_PAYPAL_SANDBOX}&disable-funding=credit`
        // script.src = `https://www.paypal.com/sdk/js?client-id=${process.env.REACT_APP_PAYPAL_LIVE}&disable-funding=credit`
        script.addEventListener('load', () => setLoaded(true))
        document.body.appendChild(script)
    },[props.receipt])

    useEffect(() => {

        console.log(liveObject, 'liveobject inside generating buttonss!!!!!!')

        if(loaded && liveObject) {
            // console.log(loaded, 'value for boolean loaded')
            window.paypal.Buttons({
                createOrder: (data, actions) => {
                    // console.log(data, 'data from paypal createOrder Function')
                    return actions.order.create({
                        purchase_units: [
                            {
                                description: "Seities Apparel - Show Yourself!",
                                amount: {
                                    currency_code: "USD",
                                    value: liveObject.total.formatted,
                                    shipping: {
                                        currency_code: "USD",
                                        value: liveObject.shipping.price.formatted
                                    },
                                    discount: {
                                        currency_code: "USD",
                                        value: liveObject.discount.length !== 0 && liveObject.shipping.price.formatted
                                    }
                                }
                            }
                        ]
                    })
                },
                onShippingChange: (data, actions) => {
                    if (data.shipping_address.country_code !== 'US') {
                        return actions.reject();
                    }
            
                    return actions.resolve();
                },
                onApprove: async (data, actions) => {
                    setActiveIndex(0)
                    setProcessing(true)

                    console.log("Right before await call!!!!")
                    
                    const order = await actions.order.capture()

                    setPaidFor(true)
                    setEmail(order.payer.email_address)

                    let final = {}

                    final.line_items = lineItemsParse()

                    final.fulfillment = {
                        shipping_method: "ship_Op1YoVPxglXLv9"
                    }

                    final.customer = {
                        firstname: order.payer.name.given_name,
                        lastname: order.payer.name.surname,
                        email: order.payer.email_address
                    }

                    final.shipping = {
                        name: order.purchase_units[0].shipping.name.full_name,
                        street: order.purchase_units[0].shipping.address.address_line_1,
                        town_city: order.purchase_units[0].shipping.address.admin_area_2,
                        county_state: order.purchase_units[0].shipping.address.admin_area_1,
                        postal_zip_code: order.purchase_units[0].shipping.address.postal_code,
                        country: order.purchase_units[0].shipping.address.country_code  
                    }

                    final.payment = {
                        gateway: "test_gateway",
                        card: {
                            number: "4242424242424242",
                            expiry_month: "02",
                            expiry_year: "2025",
                            cvc: 123,
                            postal_zip_code: "37388",
                        }
                    }

                    console.log(order, 'order from paypal capture')
                    console.log(final, 'final for capture')

                    commerce.checkout.capture(tokenId, final)
                        .then(res => {
                                console.log(res, 'res from CAPTURING CHECKOUT!!!')
                                props.setReceipt(res)
                                setProcessing(false)
                                setTimeout(() => localStorage.removeItem('cart-id'), 3000)
                        })
                        .catch(err => {
                                window.alert(err.data.error.message)
                        })
                }
            }).render(paypalRef)
        }

        // Selecting Child Nodes of Pay-Box
        // Looping through and only displaying the last render

        let x = document.querySelector('.paypal-box')

        if (x.childNodes.length > 1) {
            for(let i=0; i<x.childNodes.length-1; i++) {
                x.childNodes[i].style.display = "none"
            }
        }

    },[loaded, liveObject])

    const lineItemsParse = () => {
        /* 
            Takes Line Items from props and strutures the data 
            Object added to state   
        */

       let lineItems = {}

       liveObject.line_items.forEach(item => {

           lineItems = {
               ...lineItems,
               [item.id]: {
                   quantity: item.quantity,
                   variants: {
                       [item.variants[0].variant_id]: item.variants[0].option_id
                   }
               }
           }
       })

       return lineItems
    }

    const handleAccordDrop = (e, titleProps) => {

        const { index } = titleProps
        const newIndex = activeIndex === index ? -1 : index

        setActiveIndex(newIndex)
    }

    const handleDiscountCode = (e, {value}) => {
        /* Putting Discount Code in State */
        setDiscountCode(value)
    }

    const handleDiscountClick = (e) => {

        /* *** Checking to Make Sure Discount Code is Valid *** */

        e.preventDefault()

        if (!discountCode) {
            setNoDiscountCode(true)
            setInvalidDiscountCode(false)
        } else {
            commerce.checkout.checkDiscount(tokenId, {code: discountCode})
                .then(res => {  
                    // console.log(res, 'res from checking discount code')
                    if (!res.valid) {
                        setInvalidDiscountCode(true)
                    } else {
                        setInvalidDiscountCode(false)
                        setLiveObject(res.live)
                        setDiscountCode(null)
                    }
                    
                    setNoDiscountCode(false)
                })
                .catch(err => console.log(err))
        }
    }

    const goToCart = e => {
        history.push("/")
        props.setCartVisible(true)
    }


    return (
        <>
            <Accordion 
                className='summary-drop'
                fluid 
                styled
            >
                <div className='summary-content'>
                    <Accordion.Title 
                        className='summary-title'
                        onClick={handleAccordDrop}
                        index={0}
                        active={activeIndex === 0}
                    >
                        <Icon name='cart arrow down' size='large'/>
                        Show Order Summary
                        <Icon name='dropdown' size='large'/>
                    </Accordion.Title>
                    <Accordion.Content 
                        active={activeIndex === 0}
                        className='active-container'
                    >
                        {liveObject && liveObject.line_items.map(item => (
                            <Container className='item-data-container' key={item.id}>
                                <CheckoutItems item={item}/>
                            </Container>
                        ))}
                        <Container>
                            {!paidFor && (
                                <>
                                    <Divider horizontal>Discount Code</Divider>

                                    <form className='discount-code' onSubmit={handleDiscountClick}>
                                        <Input size='large' onChange={handleDiscountCode} />
                                        <Button color='black'>Apply</Button>     
                                    </form>
                                </>
                            )}
                            {noDiscountCode && <p>No Discount Code Entered</p>}
                            {invalidDiscountCode && <p>Invalid Code!</p>}
                            <Divider horizontal>Cart Totals</Divider>
                            {!paidFor && <p className='shipping-message'>Currently we only ship to United States with a flat rate of $4.50</p>}
                            {liveObject && (
                                <div className='cart-totals'>
                                    <section>
                                        <p>Subtotal</p>
                                        <p>{liveObject.subtotal.formatted_with_symbol}</p>
                                    </section>
                                    <section>
                                        <p>Shipping</p>
                                        <p>{liveObject.shipping.price.formatted_with_symbol}</p>
                                    </section>
                                    {liveObject.discount.length !== 0 && (
                                        <section className='freeshipping'>
                                            <p>FREESHIPPING</p>
                                            <p>- {liveObject.discount.amount_saved.formatted}</p>
                                        </section>
                                    )}
                                    <section>
                                        <Header>Total</Header>
                                        <Header>{liveObject.total.formatted_with_symbol}</Header>                
                                    </section>
                                </div>
                            )}
                        </Container>
                    </Accordion.Content>
                </div>
                {liveObject && <Header>{liveObject.total.formatted_with_symbol}</Header>}
            </Accordion>
            {/* {true && (
                <>
                    <div className='loader-box'></div>
                    <Image size='tiny' className='payment-loader' src={gif} />
                </>
            )} */}
            {paidFor ? (
                <>
                    {processing && (
                        <>
                            <div className='loader-box'></div>
                            <Image size='tiny' className='payment-loader' src={gif} />
                        </>
                    )}
                    {!processing && (
                        <>
                            <Container className='payment-complete'>
                                <div className='top-items'>
                                    <Icon name='check circle outline' size='huge' color='green'/>
                                    <p>{liveObject.total.formatted_with_symbol}</p>
                                    <p>Paid</p>
                                </div>
                                <iframe src="https://giphy.com/embed/3osxYdXvsGw6wT5lIY" frameBorder="0" class="giphy-embed" width="100%" height="315"></iframe>
                                <p>
                                    A copy of your receipt has been emailed to <span>{email && email}</span>
                                </p>
                                <p>
                                    Thanks for supporting all efforts in helping the 
                                    Tullahoma Daycare Center! You can check out the latest news and
                                    events here: <a href="http://tullahomadaycare.com/">tullahomadaycare.com</a>
                                </p>
                                <Link to='/'><Button primary size='big' fluid>Shop Again</Button></Link>
                            </Container>
                        </>
                    )}
                </>
            ) : (
                <>
                    <Container><div className='paypal-box' ref={v => paypalRef = v} /></Container>
                    <Header textAlign='center' onClick={goToCart}>
                        <Icon name='pointing left' />
                        Return to Cart
                    </Header>
                </>
            )
            }
        </>
    );
};

export default CustomerInfo;





