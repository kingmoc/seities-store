import React, {useEffect, useState} from 'react';
import { Container, Header, Image, Form, Button, Divider, TextArea } from 'semantic-ui-react';

//image import
import hero from '../img/contact.png'   
import kate from '../img/contact-kate.jpg'

const Contact = (props) => {

    const [contactInfo, setContactInfo] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    })

    useEffect(() => {
        props.setMenuVisible(false)
    },[])

    const encode = (data) => {
        return Object.keys(data)
            .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
            .join("&");
    }

    const handleChange = (e, {value, name}) => {

        setContactInfo({
            ...contactInfo,
            [name]: value
        })
    }

    const handleSubmit = e => {

        fetch("/", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: encode({ "form-name": "contact", ...contactInfo })
          })
            .then(() => alert("Success! - Your message has been sent, Thanks 😀"))
            .catch(error => alert(error));
    
          e.preventDefault();
          setContactInfo({        
            name: '',
            email: '',
            subject: '',
            message: ''
        })
    }

    return (
        <Container className='contact-container'>
            <Image src={kate} />
            <div className='form-all'>
                <Header size='large'>Have Questions/Concerns? Give us a Shoutout!</Header>
                {/* Contact Form */}
                <Form
                    style={{marginTop: '20px'}}
                    className='contact-form' 
                    size='big'
                    onSubmit={handleSubmit} 
                >
                    <Form.Input
                        required 
                        label='Email'
                        name='email'
                        type='email'
                        placeholder='xyz@example.com'
                        onChange={handleChange}
                        value={contactInfo.email}
                    />
                    <Form.Input 
                        label='Name'
                        name='name'
                        placeholder='Enter Name'
                        onChange={handleChange}
                        value={contactInfo.name}
                    />
                    <Form.Input
                        required 
                        label='Subject'
                        name='subject'
                        placeholder='Ex. Subject'
                        onChange={handleChange}
                        value={contactInfo.subject}
                    />
                    <TextArea
                        required
                        name='message' 
                        style={{ minHeight: 150 }}
                        placeholder='Type message here ...'
                        onChange={handleChange}
                        value={contactInfo.message}
                    />
                    <Button
                        className='contact-button' 
                        size='huge'
                        fluid 
                        type='submit'
                    >
                        Send Message
                    </Button>
                </Form>
            </div>
        </Container>
    );
};

export default Contact;