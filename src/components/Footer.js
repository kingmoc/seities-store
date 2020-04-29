import React, { useState } from 'react';
import { useHistory, Link } from "react-router-dom";
import { Message, Image, Menu } from 'semantic-ui-react';

// Img Import
import logoTrans from '../img/logo.png'

const Footer = (props) => {

    const [activeItem, setActiveItem] = useState()

    let history = useHistory()

    const handleItemClick = (e, {name}) => {

        if (name === 'Cart') {
            props.setCartVisible(true)
        }

        setActiveItem(name)
    }

    return (
        <Message color='black' className='footer'>
            <Menu vertical inverted className='footer-links'>
                <Menu.Item className='links-menu'>
                    <Menu.Header>Important Links</Menu.Header>

                    <Menu.Menu>
                        <Menu.Item
                            name='Gallery'
                            active={activeItem === 'Gallery'}
                            onClick={handleItemClick}
                        />
                        <Menu.Item
                            name='The Story'
                            active={activeItem === 'The Story'}
                            onClick={handleItemClick}
                        />
                        <Menu.Item
                            name='FAQ'
                            active={activeItem === 'FAQ'}
                            onClick={handleItemClick}
                        />
                        <Menu.Item
                            name='Contact'
                            active={activeItem === 'Contact'}
                            onClick={handleItemClick}
                        />
                        <Menu.Item
                            name='Cart'
                            active={activeItem === 'Cart'}
                            onClick={handleItemClick}
                        />
                    </Menu.Menu>
                </Menu.Item>
            </Menu>
            <section>
                <div>
                    <p>© Seities Apparel 2020</p>
                    <p>All images and content may not be used without permission</p>
                </div>
                <Link to='/'>
                    <Image 
                        className='footer-image'
                        src={logoTrans} 
                        size='small' 
                        centered
                    />
                </Link>
            </section>
        </Message>
    );
};

export default Footer;