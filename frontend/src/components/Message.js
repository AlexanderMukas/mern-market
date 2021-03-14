//rafce + tab
import React from 'react';
import { Alert } from 'react-bootstrap';

// two props - variant and children
const Message = ( {variant, children} ) => {
    return (
        <Alert variant={variant}>

            {children}

        </Alert>
    )
}

// info = blue color
Message.defaultProps = {
    variant: 'info'
}

export default Message
