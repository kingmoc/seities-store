import React, { useState } from 'react';
import { Image, Icon, Sidebar, Menu } from 'semantic-ui-react';
import logoText from '../img/logo-text.png'

import MenuSidebar from './sidebars/menuSidebar'
import CartSidebar from './sidebars/cartSidebar'

const Nav = () => {

    const [visible, setVisible] = useState(false)
    const [cartVisible, setCartVisible] = useState(false)

    return (
        <>
            <Sidebar
                as={Menu}
                animation='overlay'
                onHide={() => setVisible(false)}
                visible={visible}
                inverted
                vertical
                borderless
                // width='then'
            >
                <MenuSidebar setVisible={setVisible}/>
            </Sidebar>

            <Sidebar
                as={Menu}
                direction='right'
                animation='overlay'
                onHide={() => setCartVisible(false)}
                visible={cartVisible}
                inverted
                vertical
                borderless
                // width='then'
            >
                <CartSidebar setCartVisible={setCartVisible}/>
            </Sidebar>

            <nav>
                <Icon 
                    name='bars' 
                    size='large'
                    onClick={() => setVisible(!visible)}
                />
                <Image src={logoText} size='small'/>
                <Icon 
                    name='shopping cart' 
                    size='large'
                    onClick={() => setCartVisible(!cartVisible)}
                />
            </nav>
        </>
    );
};

export default Nav;