import React, {Component} from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';

class Header extends Component{
    render(){
        return(
            <div>
                <Navbar dark color="primary">
                    <div className="contianer">
                        <NavbarBrand><h1>Stock Management WebApp</h1></NavbarBrand>
                    </div>
                </Navbar>
            </div>
        );
    }
}

export default Header;