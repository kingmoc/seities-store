import React, { useState } from 'react';
import { Route } from 'react-router-dom'

// Component Imports
import Nav from './components/Nav'
import Hero from './components/Hero'
import ProductContainer from './components/ProductContainer'
import ProductDetails from './components/ProductDetails'

function App() {

    // const [test, setTest] = useState('this is a test')
    const [cartVisible, setCartVisible] = useState(false)

    return (
        <div className="App">
            <Nav cartVisible={cartVisible} setCartVisible={setCartVisible}/>
            {/* Routes */}
            <Route exact path="/" component={Hero} />
            <Route exact path="/" component={ProductContainer} />
            {/* <Route path="/products/:id" component={ProductDetails} /> */}
            <Route path="/products/:id" render={props => <ProductDetails setCartVisible={setCartVisible} {...props}/>}/>
        </div>
    );
}

export default App;
