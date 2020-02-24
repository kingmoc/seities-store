import React from 'react';
import { Route } from 'react-router-dom'

// Component Imports
import Nav from './components/Nav'
import Hero from './components/Hero'
import ProductContainer from './components/ProductContainer'
import ProductDetails from './components/ProductDetails'

function App() {
    return (
        <div className="App">
            <Nav />
            {/* Routes */}
            <Route exact path="/" component={Hero} />
            <Route exact path="/" component={ProductContainer} />
            <Route path="/products/:id" component={ProductDetails} />
        </div>
    );
}

export default App;
