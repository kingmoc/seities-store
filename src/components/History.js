import React, { useState, useEffect } from 'react';
import { Image, Container, Header, Segment } from 'semantic-ui-react';

//image import
import joeyg from '../img/joeyg-porch.jpeg'

const History = (props) => {

    useEffect(() => {
        props.setMenuVisible(false)
    },[])

    return (
        <Container className='history-container'>

            <Image src={joeyg} style={{marginTop: '20px'}}/>
            <Header size='large'>How did we get here? 🤷‍♂️</Header>
            <p>
                Once upon a time, in a land far far … Naaaa! I wouldn’t do that to ya 🤩 but this 
                story does start approximately two years ago perusing my favorite website 
                (at the time) <a href='https://www.flippa.com/'>flippa.com</a>.  <p></p> <p></p> It was a website I come accustomed to because 
                I was always looking for that diamond in the rough.  Flippa is basically the eBay of buying 
                and selling websites.  You can also snatch domains, mobile apps and more – there’s all kinds of website goodies 🎊  
            </p>
            <Header size='large'>Remembering my Online Pursuits ...</Header>
            <p>
                By this time I had bought an iOS app, “Math Guru – make math fun” that ended up being a complete 
                disaster because I was not an iOS developer.  And further I created all these weird accounts 
                – apple dev account, some iTunes connect account,  another Xcode subscription ...etc 🤦‍.  
                As I stated - a you know what show! 
            </p>
            <p>
                I quickly followed that up by getting hoodwinked into buying a drop-shipping website for 
                SEO services.  I’m telling you the copy on this listing could cause any reasonable aspiring 
                entrepreneur to pull the trigger.  Here’s an exact quote from the listing: 
            </p>
                <Segment className='quote'>
                    <Container>
                        “This domain was previously owned by another person, and was subsequently left expired, 
                        leaving a huge SEO goldmine completely unattended. Due to the powerful SEO value of this 
                        domain, I've decided to re-register it and rebuild the website from scratch. On top of that, 
                        there are already 46,020 Backlinks (verified by MajesticSEO.com) built to this domain. 
                        These initial links will serve as an amazing base for all your upcoming SEO campaigns!”
                    </Container>
                </Segment>
            <p>
                Exactly – just hand over your credit card and get ready to make millions! 😵
            </p>
            <p>
                I snuck in a quick domain purchase 
                <a href='https://www.simpleknowledge.com'> simpleknowledge.com </a> 
                before my first success <a href='https://freelancertips.com/'>freelancertips.com</a>.  
                Ohh the many things I learned rebuilding Freelancertips from scratch using Wordpress.  
            </p>
            <p>
                I had no programming experience at the time and the site when purchased
                was just html files the owner hosted on his personal server.  It was an aged domain 
                that was getting roughly 200 unique visits per month.  
            </p>
            <p>
                I thought with a modern upgrade, 
                some SEO targeted content that I could drive significant traffic to the website.  
                And that is exactly what I did before I sold it therefore becoming my first 
                entrepreneur success – Yay! 💃 
            </p>
            <Header size='large'>Time For Something New</Header>

            
        </Container>
    );
};

export default History;