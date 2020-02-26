import React, { useState } from 'react';
import { Route } from 'react-router-dom'

// Component Imports
import Nav from './components/Nav'
import Hero from './components/Hero'
import ProductContainer from './components/ProductContainer'
import ProductDetails from './components/ProductDetails'

function App() {

    const [cartVisible, setCartVisible] = useState(false)
    const [cartQuanity, setCartQaunity] = useState(0)

    return (
        <div className="App">
            <Nav 
                cartVisible={cartVisible} 
                setCartVisible={setCartVisible}
                cartQuanity={cartQuanity}
            />
            {/* Routes */}
            <Route exact path="/" component={Hero} />
            <Route exact path="/" component={ProductContainer} />
            <Route path="/products/:id" render={props => {
                return (
                    <ProductDetails 
                        {...props}
                        setCartVisible={setCartVisible}
                        setCartQaunity={setCartQaunity} 
                        cartQuanity={cartQuanity}
                    />
                )
            }}/>
        </div>
    );
}

export default App;
