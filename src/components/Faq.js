import React, { useEffect, useState } from 'react';
import { Container, Header, Divider, Image, Accordion, Icon } from 'semantic-ui-react';

// image import
import chill from '../img/chill.jpg'
import { Link } from 'react-router-dom';

const Faq = (props) => {

    const [activeIndex, setActiveIndex] = useState(-1)

    useEffect(() => {
        props.setMenuVisible(false)
    },[])

    const handleAccordDrop = (e, titleProps) => {

        const { index } = titleProps
        const newIndex = activeIndex === index ? -1 : index

        setActiveIndex(newIndex)
    }

    return (
       <Container className='faq-container'>
           <Image src={chill} style={{marginTop: '20px'}}/>
           <h2>Frequently Asked Questions</h2>
            {/* About */}
           <Header size='medium'>About Seities Apparel</Header>
           <Divider />
           <Accordion>
                <Accordion.Title
                    active={activeIndex === 0}
                    index={0}
                    onClick={handleAccordDrop}
                >
                    <Icon name='level down alternate' />
                    What is Seities Apparel?
                </Accordion.Title>
                <Accordion.Content active={activeIndex === 0}>
                    <Container>
                        <p>
                            Made with 100% 👕 <span><strong>organic cotton</strong></span> Seities Apparel is an extension of the definition 
                            <span>(a quality peculiar to oneself)</span> expressed in clothing – right 
                            now specifically T-shirts!  
                        </p>
                        <p>
                            This brand is simple, minimalist, unique and can be 
                            worn in any occasion.  Not to mention … we’re all about the kids &#128513;
                        </p>
                    </Container>
                </Accordion.Content>
                <Accordion.Title
                    active={activeIndex === 1}
                    index={1}
                    onClick={handleAccordDrop}
                >
                    <Icon name='level down alternate' />
                    How do you pronounce Seities?
                </Accordion.Title>
                <Accordion.Content active={activeIndex === 1}>
                    <Container>
                        <p>
                            se·​i·​ty | \ ˈsēətē \
                        </p>
                    </Container>
                </Accordion.Content>
                <Accordion.Title
                    active={activeIndex === 2}
                    index={2}
                    onClick={handleAccordDrop}
                >
                    <Icon name='level down alternate' />
                    Where are you located?
                </Accordion.Title>
                <Accordion.Content active={activeIndex === 2}>
                    <Container>
                        <p>
                            We're are located in the heartland of the US -
                            a.k.a Tennessee 🏴󠁵󠁳󠁴󠁮󠁿
                        </p>
                    </Container>
                </Accordion.Content>
           </Accordion>
            {/* Orders */}
           <Header size='medium'>Orders</Header>
           <Divider />
           <Accordion>
                <Accordion.Title
                    active={activeIndex === 3}
                    index={3}
                    onClick={handleAccordDrop}
                >
                    <Icon name='level down alternate' />
                    What forms of payment do you accept?
                </Accordion.Title>
                <Accordion.Content active={activeIndex === 3}>
                    <Container>
                        <p>
                            We accept major credit cards such as Visa, MasterCard, American Express, 
                            and Discover through PayPal  👍
                        </p>
                        <p>
                            <i>** Should be noted payments are processed through PayPal and we never
                            see, store, or track payment data or details. ** </i>
                        </p>
                    </Container>
                </Accordion.Content>
           </Accordion>
            {/* Shipping */}
           <Header size='medium'>Shipping</Header>
           <Divider />
           <Accordion>
                <Accordion.Title
                    active={activeIndex === 4}
                    index={4}
                    onClick={handleAccordDrop}
                >
                    <Icon name='level down alternate' />
                    Where do you ship to?
                </Accordion.Title>
                <Accordion.Content active={activeIndex === 4}>
                    <Container>
                        <p>
                            Currently we <strong>ONLY</strong> ship to the <span>United States</span> 🚛
                        </p>
                        <p>
                            <i>Stay tuned for more shipping options in the furture ...</i>
                        </p>
                    </Container>
                </Accordion.Content>
                <Accordion.Title
                    active={activeIndex === 5}
                    index={5}
                    onClick={handleAccordDrop}
                >
                    <Icon name='level down alternate' />
                    What does shipping cost?
                </Accordion.Title>
                <Accordion.Content active={activeIndex === 5}>
                    <Container>
                        <p>
                            We charge a <strong>FLAT</strong> rate of <span><strong>$4.50</strong></span>
                        </p>
                    </Container>
                </Accordion.Content>
                <Accordion.Title
                    active={activeIndex === 6}
                    index={6}
                    onClick={handleAccordDrop}
                >
                    <Icon name='level down alternate' />
                    How long does shipping take? What shipping methods do you use?
                </Accordion.Title>
                <Accordion.Content active={activeIndex === 6}>
                    <Container>
                        <p>
                            All placed orders before <span>1:00pm (CST)</span> will be 
                            shipped same day.  Any order after will be shipped the following day.  
                        </p>
                        <p>
                            All orders are shipped via USPS - Standard Shipping.  Expect your order
                            to arrive within 3-5 days depending on your location ✈️
                        </p>
                    </Container>
                </Accordion.Content>
                <Accordion.Title
                    active={activeIndex === 7}
                    index={7}
                    onClick={handleAccordDrop}
                >
                    <Icon name='level down alternate' />
                    Can I track my order?
                </Accordion.Title>
                <Accordion.Content active={activeIndex === 7}>
                    <Container>
                        <p>
                            <span><strong>Yes.</strong></span> Once your item is shipped 
                            you will receive tracking information via email  
                        </p>
                    </Container>
                </Accordion.Content>
           </Accordion>
            {/* Returns and Exchanges */}
           <Header size='medium'>Returns & Exchanges</Header>
           <Divider />
           <Accordion>
                <Accordion.Title
                    active={activeIndex === 8}
                    index={8}
                    onClick={handleAccordDrop}
                >
                    <Icon name='level down alternate' />
                    What is your return policy?
                </Accordion.Title>
                <Accordion.Content active={activeIndex === 8}>
                    <Container>
                        <p>
                            We want you to be <span>100% satisfied</span> with your Seities purchase. 
                            Items in <strong>new condition (unworn/unwashed)</strong> can be returned or exchanged 
                            within 30 days of delivery.
                        </p>
                        <p>
                            If we made a mistake or the item arrived defective, 
                            <Link to='/contact'>please contact us here</Link> 
                            and we’ll make things right. 😊
                        </p>
                    </Container>
                </Accordion.Content>
                <Accordion.Title
                    active={activeIndex === 9}
                    index={9}
                    onClick={handleAccordDrop}
                >
                    <Icon name='level down alternate' />
                    How to I return or exchange an item?
                </Accordion.Title>
                <Accordion.Content active={activeIndex === 9}>
                    <Container>
                        <p>
                            To return or exchange an item please follow the <span>steps below</span>:
                        </p>
                        <p>
                            Include a copy of the packing slip or confirmation email from 
                            your order and note the new size or item desired.
                        </p>
                        <p>
                            <i>(We cannot guarantee all items and sizes will be in stock for exchanges.)</i> 
                        </p>
                        <p>
                            <strong>Mail your Return to:</strong>
                        </p>
                        <p>
                            Seities Apparel <br></br>
                            206 Troys Trail <br></br>
                            Tullahoma, Tn 37388 <br></br>
                        </p>
                        <p>
                            Once your return is received, your new item(s) will be 
                            shipped out at no additional cost or your refund will be issued.
                        </p>
                    </Container>
                </Accordion.Content>
           </Accordion>
            {/* Product */}
           <Header size='medium'>Product</Header>
           <Divider />
           <Accordion>
                <Accordion.Title
                    active={activeIndex === 10}
                    index={10}
                    onClick={handleAccordDrop}
                >
                    <Icon name='level down alternate' />
                    How does your clothing fit?
                </Accordion.Title>
                <Accordion.Content active={activeIndex === 10}>
                    <Container>
                        <p>
                            Being that this batch currently on the site was manufactured 
                            in <span>London</span> - the sizes may run a bit small.  
                        </p>
                        <p>
                            As an example, 
                            I'm a XL and the Seities XL has a more tight fit than loose.  
                        </p>
                        <p>
                            If you're truly gunning for that loose fit, then I would 100% 
                            size up! 💁‍♂️
                        </p>
                    </Container>
                </Accordion.Content>
                <Accordion.Title
                    active={activeIndex === 11}
                    index={11}
                    onClick={handleAccordDrop}
                >
                    <Icon name='level down alternate' />
                    Do you manufacture in-house?
                </Accordion.Title>
                <Accordion.Content active={activeIndex === 11}>
                    <Container>
                        <p>
                            The shirts currently on the site were manufactured in London.
                            This will be the last batch produced in London and moving forward
                            all items will be manufactured in Tennessee. 
                        </p>
                        <p>
                            We will look for quality and trusted manufactures locally to continue production.
                            Please <Link to='/contact'>contact us</Link> with any suggestions or leads 😉
                        </p>
                    </Container>
                </Accordion.Content>
                <Accordion.Title
                    active={activeIndex === 12}
                    index={12}
                    onClick={handleAccordDrop}
                >
                    <Icon name='level down alternate' />
                    Where do you get your designs?
                </Accordion.Title>
                <Accordion.Content active={activeIndex === 12}>
                    <Container>
                        <p>
                            All designs were created by the founder of Seities Apparel with licensed images
                            constructed with Photoshop and other image editing tools.   
                        </p>
                        <p>
                           We're all about expressing oneself here and want to encourage digital artist or
                           creators to help create awesome minimalist designs. 🙏
                        </p>
                    </Container>
                </Accordion.Content>
           </Accordion>
       </Container>
    );
};

export default Faq;