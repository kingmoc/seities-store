import React from 'react';
import { Menu, Icon } from 'semantic-ui-react';

const menuSidebar = (props) => {
    return (
        <>
            <Icon 
                className='close' 
                name='x' 
                size='big'
                onClick={() => props.setVisible(false)}
            />
            <Menu.Item as='a'>
                Gallery
            </Menu.Item>
            <Menu.Item as='a'>
                The Story
            </Menu.Item>
            <Menu.Item as='a'>
                FAQ
            </Menu.Item>
            <Menu.Item as='a'>
                Contact
            </Menu.Item>
        </>
    );
};

export default menuSidebar;