import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom'
import Commerce from '@chec/commerce.js'

// Component Imports
import Nav from './components/Nav'
import Hero from './components/Hero'
import ProductContainer from './components/ProductContainer'
import ProductDetails from './components/ProductDetails'

export const CartItemsContext = React.createContext()

function App() {
    const commerce = new Commerce(process.env.REACT_APP_PUBLICKEY_SANDBOX)

    const [cartVisible, setCartVisible] = useState(false)
    const [cart, setCart] = useState()

    useEffect(() => {
        commerce.cart.retrieve()
            .then(res => {
                console.log(res, 'response from app useEffect')
                setCart(res)
            })
    },[])
    
    
    const addToCart = (productId, quantity, variantInfo) => {
        console.log(productId, quantity, variantInfo, 'info from product details')

        commerce.cart.add(productId, quantity, variantInfo)
            .then(res => {

                cart.line_items.map(item => {
                    if(item.id === res.line_item_id) {
                        let newQuantity = item.quantity + quantity
                        // let newQuantity = quantity + 1
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
            <CartItemsContext.Provider value={cartHelperFunctions}>
                <Nav 
                    cartVisible={cartVisible} 
                    setCartVisible={setCartVisible}
                    cart={cart}
                />
            </CartItemsContext.Provider>
            {/* Routes */}
            <Route exact path="/" component={Hero} />
            <Route exact path="/" component={ProductContainer} />
            <Route path="/products/:id" render={props => {
                return (
                    <ProductDetails 
                        {...props}
                        setCartVisible={setCartVisible}
                        addToCart={addToCart}
                    />
                )
            }}/>
        </div>
    );
}

export default App;
