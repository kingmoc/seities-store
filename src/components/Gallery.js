import React, {useState, useEffect} from 'react';
import { Container, Image, Header } from 'semantic-ui-react';

// Image Import
import pic1 from '../img/gallery/1.JPG'
import pic2 from '../img/gallery/2.JPG'
import pic3 from '../img/gallery/3.JPG'
import pic4 from '../img/gallery/4.JPG'
import pic5 from '../img/gallery/5.JPG'
import pic6 from '../img/gallery/6.JPG'
import pic7 from '../img/gallery/7.JPG'
import pic8 from '../img/gallery/8.JPG'
import pic9 from '../img/gallery/9.JPG'
import pic10 from '../img/gallery/10.JPG'
import pic11 from '../img/gallery/11.JPG'
import pic12 from '../img/gallery/12.JPG'

const Gallery = (props) => {

    useEffect(() => {
        props.setMenuVisible(false)
    },[])

    return (
        <Container className='gallery'>
            <Header 
                as='h1'
            >
                "Eye of the Beholder"
            </Header>
            <Image rounded src={pic2} />
            <Image rounded src={pic5} />
            <Image rounded src={pic4} />
            <Image rounded src={pic3} />
            <Image rounded src={pic6} />
            <Image rounded src={pic1} />
            <Image rounded src={pic10} />
            <Image rounded src={pic7} />
            <Image rounded src={pic9} />
            <Image rounded src={pic8} />
            <Image rounded src={pic12} />
            <Image rounded src={pic11} />
        </Container>
    );
};

export default Gallery;