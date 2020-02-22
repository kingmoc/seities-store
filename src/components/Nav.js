import React, { useState } from 'react';
import { Image, Icon, Sidebar, Menu } from 'semantic-ui-react';
import logoText from '../img/logo-text.png'

import MenuSidebar from './sidebars/menuSidebar'

const Nav = () => {

    const [visible, setVisible] = useState(false)

    return (
        <>
            <Sidebar
                as={Menu}
                animation='overlay'
                inverted
                onHide={() => setVisible(false)}
                vertical
                visible={visible}
                borderless
                // width='then'
            >
                <MenuSidebar setVisible={setVisible}/>
            </Sidebar>
            <nav>
                <Icon 
                    name='bars' 
                    size='large'
                    onClick={() => setVisible(!visible)}
                />
                <Image src={logoText} size='small'/>
                <Icon name='shopping cart' size='large'/>
            </nav>
        </>
    );
};

export default Nav;