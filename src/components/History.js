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
            <p>
                As I was spending my nights away before falling asleep reading stats on 
                potential websites; I started to realize I wanted a product to sell.  
                My online marketing skills were getting better, not to mention a confident 
                boost coming off freelancertips.  
            </p>
            <p>
                I wanted to find a product I was genuinely 
                interested in and could get behind from a marketing standpoint.  I figured if 
                I could check those boxes combined with my creativity 💡 - maybe some magic 
                could happen!    
            </p>
            <Header size='large'>Having A Product, Not so Easy 🤦‍</Header>
            <p>
                I found out quickly the woes of trying to manage a product.  
                The original manufactures were located in London and that became troublesome.   
                They did great work and I don’t fault them but I spent a lot of time asking 
                questions without clear answers.  It got to the point where I dreaded calling 
                and felt more like a nuisance than a partner.  
            </p>
            <p>
                Eventually I cut ties and began to search for U.S. manufactures that could meet 
                the same quality and every time I got to the plate – it was a big swing & miss! 
                Either the quality of the shirt was poor or the printing came out bad.  
                And then when a shirt met our standards it was to expensive 😩 
            </p>
            <p>
                So after some time and not being able to find a solid producer things just 
                started to fizzle.  I had already spent a lot of money ordering samples and 
                paying the monthly Shopify cost that continuing became more and more difficult.  
                One year in and I was out of the product business - for good I thought ...
            </p>
            <Header size='large'>The Rebirth! 😁</Header>

            
        </Container>
    );
};

export default History;