import React, { useState } from 'react';
import { useHistory, Link, useLocation } from "react-router-dom";
import { Message, Image, Menu } from 'semantic-ui-react';

// Img Import
import logoTrans from '../img/logo.png'

const Footer = (props) => {

    const [activeItem, setActiveItem] = useState()

    let history = useHistory()
    let { pathname } = useLocation()
    console.log(pathname, 'path from footer')

    const handleItemClick = (e, {name}) => {

        switch (name) {
            
            case 'Cart':
                if (pathname.includes('checkout')) {
                    history.push('/')
                    props.setCartVisible(true)
                }
                props.setCartVisible(true)
                break
            
            case 'FAQ':
                history.push('/faq')
                break

            case 'Contact':
                history.push('/contact')
                break

            case 'The Story':
                history.push('/history')
                break

            case 'Gallery':
                history.push('/gallery')
                break
            
            default:
                return
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