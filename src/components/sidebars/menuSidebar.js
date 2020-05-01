import React from 'react';
import { Menu, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const menuSidebar = (props) => {
    return (
        <>
            <Icon 
                className='close' 
                name='x' 
                size='big'
                onClick={() => props.setMenuVisible(false)}
            />
            <Link to='/gallery'>
                <Menu.Item className='menu-items'>
                    <Icon name='images outline' className='menu-icon'/>
                    Gallery
                </Menu.Item>
            </Link>
            <Link to='/history'>
                <Menu.Item className='menu-items'>
                    <Icon name='history' className='menu-icon'/>
                    The Story
                </Menu.Item>
            </Link>
            <Link to='/faq'>
                <Menu.Item className='menu-items'>
                    <Icon name='question circle outline' className='menu-icon'/>
                    FAQ
                </Menu.Item>
            </Link>
            <Link to='/contact'>
                <Menu.Item className='menu-items'>
                    <Icon name='mail' className='menu-icon'/>
                    Contact
                </Menu.Item>
            </Link>
        </>
    );
};

export default menuSidebar;