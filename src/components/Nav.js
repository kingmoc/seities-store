import React, { useState } from 'react';
import { Image, Icon, Sidebar, Menu, Label } from 'semantic-ui-react';
import logoText from '../img/logo-text.png'

import MenuSidebar from './sidebars/menuSidebar'
import CartSidebar from './sidebars/cartSidebar'

const Nav = (props) => {

    const [visible, setVisible] = useState(false)
    // const [cartVisible, setCartVisible] = useState(false)

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
                // onHide={() => setCartVisible(false)}
                onHide={() => props.setCartVisible(false)}
                // visible={cartVisible}
                visible={props.cartVisible}
                inverted
                vertical
                borderless
                // width='then'
            >
                {/* <CartSidebar setCartVisible={setCartVisible}/> */}
                <CartSidebar setCartVisible={props.setCartVisible}/>
            </Sidebar>

            <nav>
                <Icon 
                    name='bars' 
                    size='large'
                    onClick={() => setVisible(!visible)}
                />
                <Image src={logoText} size='small'/>
                <Label color='blue'>
                    <Icon 
                        name='shopping cart' 
                        size='large'
                        // onClick={() => setCartVisible(!cartVisible)}
                        onClick={() => props.setCartVisible(!props.cartVisible)}
                    />
                    2
                </Label>
            </nav>
        </>
    );
};

export default Nav;