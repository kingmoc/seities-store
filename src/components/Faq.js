import React, { useEffect } from 'react';
import { Container, Header, Divider, Image } from 'semantic-ui-react';

// image import
import chill from '../img/chill.jpg'

const Faq = (props) => {

    useEffect(() => {
        props.setMenuVisible(false)
    },[])

    return (
       <Container>
           <Image src={chill} />
           <Header size='huge'>About</Header>
           <Divider />
           <Header size='huge'>Orders</Header>
           <Divider />
           <Header size='huge'>Shipping</Header>
           <Divider />
           <Header size='huge'>Returns & Exchanges</Header>
           <Divider />
           <Header size='huge'>Product</Header>
           <Divider />
           <Header size='huge'>Misc</Header>
           <Divider />
       </Container>
    );
};

export default Faq;