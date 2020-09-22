import React from 'react';
import {Link} from 'react-router-dom';

function Header(){
    return(
        <header style={headerStyle}>
            <center><h1>Ajankohtaista Vantaalla</h1>
            <Link to="/" style={linkStyle}>Työpaikat</Link> | <Link to="/weather" style={linkStyle}>Säätiedot</Link>
            </center>

        </header>
    )
}
const linkStyle={
    color:'#ffffff',
    textDecoration:'none'
}
const headerStyle={
    background:'#333333',
    color:'#ffffff',
    padding:'10px',
}
export default Header