import React from 'react';
import { Message, Icon, Header } from 'semantic-ui-react';
// import { Link } from 'react-router-dom';
import { HashLink as Link } from 'react-router-hash-link';

const CovidBar = () => {
    return (
        <Message negative className='covid' icon>
            <Icon name='heart outline' />
            <p>
                Due to the <span>COVID19 crisis</span> -<strong>100%</strong> of proceeds
                will be donated to a non-profit -
                <a href='http://tullahomadaycare.com/' target="blank"> Tullahoma Daycare Center</a>
                <p></p>
                <Link to='/history#rebirth'>Read More ...</Link>
                {/* <a href='/history#rebirth'>Read More ...</a> */}
            </p>
        </Message>
    );
};

export default CovidBar;