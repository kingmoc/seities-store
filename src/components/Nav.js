import React, { useState } from 'react';
import { Image, Icon, Sidebar, Menu, Label } from 'semantic-ui-react';
import logoText from '../img/logo-text.png'

import MenuSidebar from './sidebars/menuSidebar'
import CartSidebar from './sidebars/cartSidebar'

const Nav = (props) => {

    const [visible, setVisible] = useState(false)

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
            >
                <MenuSidebar setVisible={setVisible}/>
            </Sidebar>

            <Sidebar
                as={Menu}
                direction='right'
                animation='overlay'
                onHide={() => props.setCartVisible(false)}
                visible={props.cartVisible}
                inverted
                vertical
                borderless
            >
                <CartSidebar 
                    setCartVisible={props.setCartVisible}
                    cartQuanity={props.cartQuanity}
                />
            </Sidebar>

            <nav>
                <Icon 
                    name='bars' 
                    size='large'
                    onClick={() => setVisible(!visible)}
                />
                <Image src={logoText} size='small'/>

                {props.cartQuanity === 0 ? (
                    <Icon 
                    name='shopping cart' 
                    size='large'
                    onClick={() => props.setCartVisible(!props.cartVisible)}
                />
                ) : (
                    <Label color='blue'>
                        <Icon 
                            name='shopping cart' 
                            size='large'
                            onClick={() => props.setCartVisible(!props.cartVisible)}
                        />
                        {props.cartQuanity}
                    </Label>
                )}
            </nav>
        </>
    );
};

export default Nav;