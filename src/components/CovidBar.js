import React from 'react';
import { Message, Icon, Header } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const CovidBar = () => {
    return (
        <Message negative className='covid' icon>
            <Icon name='heart outline' />
            <p>
                Due to the <span>COVID19 crisis</span> -<strong>100%</strong> of proceeds
                will be donated to 
                <a href='http://tullahomadaycare.com/'> Tullahoma Daycare Center</a>
                <p></p>
                <Link to='#'>Read More ...</Link>
            </p>
        </Message>
    );
};

export default CovidBar;