import React from 'react';
import { Image, Header } from 'semantic-ui-react';

import HeroOne from '../img/hero1.jpg'

const Hero = () => {
    return (
        <>
            <Image src={HeroOne} style={{marginTop: '20px'}}/>
            {/* <Header size='large' className='hero-text'>100% Organic Cotton</Header> */}
        </>
    );
};

export default Hero;