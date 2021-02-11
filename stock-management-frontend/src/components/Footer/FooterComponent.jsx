import React from 'react';

// functional component
// function Footer() {}
// const Footer = () => {} arrow function
const Footer = () => {
    return(
        <div className="footer">
            <div className = "container">
                <div className = "row justify-content-center">
                    <div className="text-center">
                        <a className="btn btn-social-icon btn-google" 
                            href="http://google.com/+">
                            <i className="fa fa-google-plus"></i>
                        </a>
                        <a className="btn btn-social-icon btn-facebook"
                            href="https://facebook.com">
                            <i className="fa fa-facebook"></i>
                        </a>
                        <a className="btn btn-social-icon btn-linkedin"
                            href="https://linkedin.com">
                            <i className="fa fa-linkedin"></i>
                        </a>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-auto">
                        <p>© Copyright 2021 Stock Managment WebApp</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;