import React, {Component} from 'react';
import './index.css';

const Greet = () => {
    return React.createElement(
        'div', 
        {
            id: 'greet-content',
            className: 'greet-collection'
        },
        React.createElement(
            'h1',
            {
                id: 'greet-heading',
                className: 'greet-collection-heading'
            },
            'Welcome to our main page!'
        ));
};

export default Greet;