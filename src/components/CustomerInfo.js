import React, { useState, useEffect, useRef } from 'react';
import { Link } from "react-router-dom";
import Commerce from '@chec/commerce.js'
import { Accordion, Icon, Header, Container, Button, Divider, Input } from 'semantic-ui-react';

// Component Import
import CheckoutItems from './CheckoutItems'

const CustomerInfo = (props) => {
    console.log(props, 'props from Customer Info')

    const commerce = new Commerce(process.env.REACT_APP_PUBLICKEY_SANDBOX)

    const [activeIndex, setActiveIndex] = useState(0)
    const [liveObject, setLiveObject] = useState()
    const [tokenID, setTokenId] = useState()
    const [paidFor, setPaidFor] = useState()
    const [loaded, setLoaded] = useState()
    const [discountCode, setDiscountCode] = useState()

    let paypalRef = useRef()

    useEffect(() => {

        /* *** Getting Checkout Token - Set Live Object in State *** */
        let cartId = props.match.params.id
        commerce.checkout.generateToken(cartId, { type: 'cart' })
            .then(res => {
                console.log(res, 'response from generating checkout Token')
                // setLiveObject(res.live)
                // setTokenId(res.id)
                commerce.checkout.checkShippingOption(res.id, {
                    id: res.shipping_methods[0].id,
                    country: "US"
                })
                    .then(res => {  
                        console.log(res, 'res from appplying shipping')
                        setLiveObject(res.live)
                        setTokenId(res.id) 
                    })
                    .catch(err => console.log(err, 'ERROR!!'))
            })
            .catch(err => {
                console.log(err, 'ERROR!!')
            })

        /* *** Loading Script *** */
        const script = document.createElement('script')
        script.src = `https://www.paypal.com/sdk/js?client-id=${process.env.REACT_APP_PAYPAL_SANDBOX}`
        script.addEventListener('load', () => setLoaded(true))
        document.body.appendChild(script)
    },[])

    useEffect(() => {

        if(loaded && liveObject) {
            console.log(loaded, 'value for boolean loaded')
            window.paypal.Buttons({
                createOrder: (data, actions) => {
                    // console.log(data, 'data from paypal')
                    return actions.order.create({
                        purchase_units: [
                            {
                                description: "This is a test",
                                amount: {
                                    currency_code: "USD",
                                    value: liveObject.total.formatted
                                }
                            }
                        ]
                    })

                }
            }).render(paypalRef)
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

    const paypalCapture = e => {
        e.preventDefault()

        let final = {}

        final.line_items = lineItemsParse()

        final.fulfillment = {
            shipping_method: "ship_Op1YoVPxglXLv9"
        }

        // final.shipping = {
        //     // name: `${data.firstname} ${data.lastname}`,
        //     // street: data.street,
        //     // town_city: data.town_city,
        //     // county_state: data.county_state,
        //     // postal_zip_code: data.postal_zip_code,
        //     country: 'US'   
        // }

        final.payment = {
            gateway: "paypal"
            // card: {
            //     number: data.number,
            //     expiry_month: data.expiry_month,
            //     expiry_year: data.expiry_year,
            //     cvc: data.cvc,
            //     postal_zip_code: data.postal_billing_zip_code,
            // }
        }

        // console.log(final, 'final for capture')

        commerce.checkout.capture(tokenID, final)
            .then(res => {
                    console.log(res, 'res from CAPTURING CHECKOUT!!!')
                    // props.setReceipt(res)
                    // localStorage.removeItem('cart-id')
                    // history.push(`/order-complete/${props.tokenId}/${res.id}`)
                    // setProcessing(false)
            })
            .catch(err => {
                    window.alert(err.data.error.message)
                    // setProcessing(false)
            })

    }

    const handleDiscountCode = (e, {value}) => {
        /* Putting Discount Code in State */
        setDiscountCode(value)
    }

    const handleDiscountClick = (e) => {

        /* *** Checking to Make Sure Discount Code is Valid *** */

        e.preventDefault()

        // if (!discountCode) {
        //     setNoDiscountCode(true)
        //     setInvalidDiscountCode(false)
        // } else {
        //     commerce.checkout.checkDiscount(tokenId, {code: discountCode})
        //         .then(res => {  
        //             // console.log(res, 'res from checking discount code')
        //             if (!res.valid) {
        //                 setInvalidDiscountCode(true)
        //             } else {
        //                 setInvalidDiscountCode(false)
        //                 setLiveObject(res.live)
        //                 setDiscountCode(null)
        //             }
                    
        //             setNoDiscountCode(false)
        //         })
        //         .catch(err => console.log(err))
        // }
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
                    >
                        {liveObject && liveObject.line_items.map(item => (
                            <Container className='item-data-container' key={item.id}>
                                <CheckoutItems item={item}/>
                            </Container>
                        ))}
                        <Container>
                            <Divider horizontal>Discount Code</Divider>

                            <form className='discount-code' onSubmit={handleDiscountClick}>
                                <Input onChange={handleDiscountCode} />
                                <Button color='black'>Apply</Button>     
                            </form>
                            {/* {noDiscountCode && <p>No Discount Code Entered</p>}
                            {invalidDiscountCode && <p>Invalid Code!</p>} */}
                            <Divider horizontal>Cart Totals</Divider>
                        </Container>
                        <p>Currently we only ship to United States with a flat rate of $4.50</p>
                    </Accordion.Content>
                </div>
                {liveObject && <Header>{liveObject.total.formatted_with_symbol}</Header>}
            </Accordion>

            {paidFor ? (
                <Header>Congrats on a succesffully payment!</Header>
            ) : (
                <div className='paypal-box' ref={v => paypalRef = v} />
            )
            }
        </>
    );
};

export default CustomerInfo;





