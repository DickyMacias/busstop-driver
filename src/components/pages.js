import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import { Container } from "shards-react";


const Pages = ({ pages }) => {
    return ( 
    <React.Fragment> 
        <Container>
            <Navbar bg = "dark"
            variant = "dark"
            expand = "true">
                <Navbar.Brand href = "#home">
                    <img alt = ""
                    src = {process.env.PUBLIC_URL + '/images/logo.png'}
                    width = "30"
                    height = "30"
                    className = "d-inline-block align-top"    
                    /> 
                    . Bus Stop CUU
                </Navbar.Brand> 
            </Navbar> 
        </Container>
    </React.Fragment>


    )
};

export default Pages