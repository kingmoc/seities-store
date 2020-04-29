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
            <Link to='/gallery'><Menu.Item>Gallery</Menu.Item></Link>
            <Link to='/history'><Menu.Item>The Story</Menu.Item></Link>
            <Link to='/faq'><Menu.Item>FAQ</Menu.Item></Link>
            <Link to='/contact'><Menu.Item>Contact</Menu.Item></Link>
        </>
    );
};

export default menuSidebar;