import React, { useState } from 'react';
import { useHistory, Link } from "react-router-dom";
import { Image, Icon, Sidebar, Menu, Label } from 'semantic-ui-react';
import logoText from '../img/logo-text.png'

import MenuSidebar from './sidebars/menuSidebar'
import CartSidebar from './sidebars/cartSidebar'

const Nav = (props) => {

    const [visible, setVisible] = useState(false)

    let history = useHistory()
    const url = history.location.pathname

    return (
        <>
            <Sidebar
                as={Menu}
                animation='overlay'
                onHide={() => setVisible(false)}
                visible={visible}
                vertical
                borderless
            >
                <MenuSidebar setVisible={setVisible}/>
            </Sidebar>

            <Sidebar
                className='cart-sidebar'
                as={Menu}
                direction='right'
                animation='overlay'
                onHide={() => props.setCartVisible(false)}
                visible={props.cartVisible}
                vertical
                borderless
            >
                <CartSidebar 
                    setCartVisible={props.setCartVisible}
                    cart={props.cart}
                />
            </Sidebar>

            <nav style={url.includes('checkout') ? {justifyContent: 'center'} : null}>
                {!url.includes('checkout') && (
                    <Icon 
                        name='bars' 
                        size='large'
                        onClick={() => setVisible(!visible)}
                        className='hamburger'
                    />
                )}

                <div className='nav-group-1'>
                    <Link to='/'>
                        <Image 
                            src={logoText} 
                            size={url.includes('checkout') ? 'medium' : 'small'}
                        />
                    </Link>

                    {!url.includes('checkout') && (
                        <ul>
                            <li><Link to='#'>Gallery</Link></li>
                            <li><Link to='#'>The Story</Link></li>
                        </ul>
                    )}
                </div>

                <div className='nav-group-2'>
                    {!url.includes('checkout') && (
                        <ul>
                            <li><Link to='#'>FAQ</Link></li>
                            <li><Link to='#'>Contact</Link></li>
                        </ul>
                    )}

                    {props.cart && props.cart.total_unique_items > 0 ? (
                        !url.includes('checkout') && (
                            <Label 
                                color='blue' 
                                onClick={() => props.setCartVisible(!props.cartVisible)}
                                className='cart-icon'
                            >
                                <Icon 
                                    name='shopping cart' 
                                    size='large'
                                />
                                {props.cart.total_unique_items}
                            </Label>
                        )
                    ) : (
                        <Icon 
                            name='shopping cart' 
                            size='large'
                            onClick={() => props.setCartVisible(!props.cartVisible)}
                        />
                    )}
                </div>
            </nav>
        </>
    );
};

export default Nav;


