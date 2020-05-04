import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom'
import Commerce from '@chec/commerce.js'

// Component Imports
import Nav from './components/Nav'
import Hero from './components/Hero'
import ProductContainer from './components/ProductContainer'
import ProductDetails from './components/ProductDetails'
import CustomerInfo from './components/CustomerInfo'
import CITEST from './misc/CI-testing' // testing component
import Footer from './components/Footer'
import Faq from './components/Faq'
import History from './components/History'
import Contact from './components/Contact'
import CovidBar from './components/CovidBar'
import Gallery from './components/Gallery'

// Private Route Import
import PrivateRoute from './utils/PrivateRoute'

export const CartItemsContext = React.createContext()

function App() {
    const commerce = new Commerce(process.env.REACT_APP_PUBLICKEY_SANDBOX)

    const [cartVisible, setCartVisible] = useState(false)
    const [menuVisible, setMenuVisible] = useState(false)
    const [cart, setCart] = useState()
    const [receipt, setReceipt] = useState()

    useEffect(() => {
        commerce.cart.retrieve()
            .then(res => {
                // console.log(res, 'response from app useEffect')
                setCart(res)
            })
    },[receipt])
    
    
    const addToCart = (productId, quantity, variantInfo) => {
        console.log(productId, quantity, variantInfo, 'info from product details')

        commerce.cart.add(productId, quantity, variantInfo)
            .then(res => {

                cart.line_items.map(item => {
                    if(item.id === res.line_item_id) {
                        let newQuantity = item.quantity + quantity
                        cartHelperFunctions.addQuantity(res.line_item_id, newQuantity)
                    }
                })
                setCart(res.cart)
                setCartVisible(true)
            })
    }

    const cartHelperFunctions = {

        deleteItem: (lineItemId) => {
            commerce.cart.remove(lineItemId)
                .then(res => {
                    setCart(res.cart)
                })
        },
        addQuantity: (lineItemId, newQuanity) => {
            commerce.cart.update(lineItemId, {quantity: newQuanity})
                .then(res => {
                    setCart(res.cart)
                })
        },
        subtractQuantity: (lineItemId, newQuanity) => {

            if (newQuanity === 0) {
                cartHelperFunctions.deleteItem(lineItemId)
            } else {
                commerce.cart.update(lineItemId, {quantity: newQuanity})
                    .then(res => {
                        setCart(res.cart)
                    })
            }

        }
    }

    return (
        <div className="App">
            <CovidBar />
            <CartItemsContext.Provider value={cartHelperFunctions}>
                <Nav
                    menuVisible={menuVisible}
                    setMenuVisible={setMenuVisible} 
                    cartVisible={cartVisible} 
                    setCartVisible={setCartVisible}
                    cart={cart}
                />
            </CartItemsContext.Provider>
            {/* Routes */}
            <Route exact path="/" component={Hero} />
            <Route exact path="/" component={ProductContainer} />
            {/* <Route exact path="/faq" component={Faq} /> */}
            <Route path="/faq" render={props => {
                return (
                    <Faq 
                        {...props}
                        setMenuVisible={setMenuVisible}
                    />
                )
            }}/>
            <Route path="/history" render={props => {
                return (
                    <History 
                        {...props}
                        setMenuVisible={setMenuVisible}
                    />
                )
            }}/>
            <Route path="/contact" render={props => {
                return (
                    <Contact 
                        {...props}
                        setMenuVisible={setMenuVisible}
                    />
                )
            }}/>
            <Route path="/gallery" render={props => {
                return (
                    <Gallery 
                        {...props}
                        setMenuVisible={setMenuVisible}
                    />
                )
            }}/>
            <Route path="/products/:id" render={props => {
                return (
                    <ProductDetails 
                        {...props}
                        setCartVisible={setCartVisible}
                        addToCart={addToCart}
                    />
                )
            }}/>
            <PrivateRoute 
                component={CustomerInfo}
                // component={CITEST}
                path='/checkout/:id'
                setCartVisible={setCartVisible}
                setReceipt={setReceipt}
                receipt={receipt}
            />
            <Footer setCartVisible={setCartVisible} />
        </div>
    );
}

export default App;
