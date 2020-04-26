import React from 'react';
import { Image } from 'semantic-ui-react';

import HeroOne from '../img/hero1.jpg'

const Hero = () => {
    return (
        <>
            <Image src={HeroOne} style={{marginTop: '20px'}} centered/>
            {/* <Header size='large' className='hero-text'>100% Organic Cotton</Header> */}
        </>
    );
};

export default Hero;