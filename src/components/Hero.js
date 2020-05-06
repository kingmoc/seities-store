import React from 'react';
import { Image, Header } from 'semantic-ui-react';

import HeroOne from '../img/hero1.jpg'

const Hero = () => {
    return (
        <div className='hero-image-overlay'>
            <div className='hero-text'>
                <p>noun.</p>
                <span>a quality peculiar to oneself : SELFHOOD, INDIVIDUALITY</span>
            </div>
        </div>
    );
};

export default Hero;