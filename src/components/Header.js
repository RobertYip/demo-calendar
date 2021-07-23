import './header.css';
import React from 'react';

class Header extends React.Component {

    render() {
        const title = "Work Schedule";
        return (
            <h2 className="header-splash">{title}</h2>
        )
    };
}

export default Header;