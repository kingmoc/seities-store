import React, { useState, useEffect } from 'react';
import { Image, Container, Header, Segment } from 'semantic-ui-react';

//image import
import joeyg from '../img/joeyg-porch.jpeg'
import tdcc from '../img/gall_front_op.png'

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
                (at the time) <a href='https://www.flippa.com/' target="_blank" rel='noopener'>flippa.com</a>.  <p></p> <p></p> It was a website I come accustomed to because 
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
                <a href='https://www.simpleknowledge.com' target="_blank" rel='noopener'> simpleknowledge.com </a> 
                before my first success <a href='https://freelancertips.com/' target="_blank" rel='noopener'>freelancertips.com</a>.  
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
            <Header size='large'><a id='rebirth'>The Rebirth! 😁</a></Header>
            <p>
                Well fast forward and we are announcing some sort of revival … a comeback like 
                MJ ⛹🏻‍.  A very very interesting set of circumstances have lead to this very moment – 
                this is why life is beautiful.  At the time of this writing (circa April 2020) a crazy 
                virus hit the global scene and literally shut down earth! 🌑 
            </p>
            <p>
                I won’t submerse you with the details but let’s just say a lot of people have not only 
                been infected by the virus physically but economically people and organizations are struggling!  
                So many people out there are lending their efforts including front line workers 👩🏽‍⚕️ 👨🏼‍⚕️ 
                and all other ‘essential’ workers.  
            </p>
            <p>
                I’ve been wanting to do my part and it just so happened I’m coming off the heels of completing a 
                <a href='https://lambdaschool.com/' target="_blank" rel='noopener'> software development program</a>.  So I decided to build 
                this site to sell the remainder of stock left over from my initial endeavor.  I’m 
                <strong> DONATING 100%</strong> of the proceeds to a non-profit daycare in Tennessee -   
                <a href='http://tullahomadaycare.com/' target="_blank" rel='noopener'><strong> TULLAHOMA DAYCARE CENTER</strong></a>.  
            </p>
            <Image src={tdcc} />
            <p style={{marginTop: '20px'}}>
                They are local to my hometown and throughout the crazy pandemic they still continue 
                to operate and provide exemplary child care.  They teach what’s called social distancing, 
                best sanitary practices and many other important subjects relevant to the times.  
                They along with a lot of facilities need all the help they can get and I’m hoping this 
                project will meet my goal and sell the remainder of my stock! 
            </p>
            <p>
                If you happen to have read this far, I’m hoping if you don’t like our shirts you’ll still 
                donate <a href='http://tullahomadaycare.com/donate/' target="_blank" rel='noopener'><strong>HERE</strong></a> and help 
                out with any amount you can 😊. Just remember through the crazy times 
                you can have a little Seities and show your spirit through our minimalist 100% organic 
                custom T-shirts, it will go a long way in helping a local daycare provide top notch child 
                care to working families of mid to low income.  
            </p>
            <p>
                Thanks for your support and you never know what may happen on the other side 
                of this COVID19 pandemic -  so stay tuned.  
            </p>
 
            
        </Container>
    );
};

export default History;