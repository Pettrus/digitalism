import React, { Component } from 'react';
import {
    Link,
    withRouter
} from 'react-router-dom';

class Header extends Component {
    state = {
        menuOpen: false
    }

    toggleMenu = (e) => {
        e.preventDefault();
        this.setState({
            menuOpen: !this.state.menuOpen
        });
    }

    render() {
        return (
            <div className="hero-head">
                <nav className="navbar">
                    <div className="container">
                        <div className="navbar-brand">
                            <a className="navbar-item" href="../">
                                <img src="/images/logo.png" alt="Logo" style={{maxHeight: '2.5em'}} />
                            </a>
                            <span className="navbar-burger burger" data-target="navbarMenu" onClick={this.toggleMenu}>
                                <span></span>
                                <span></span>
                                <span></span>
                            </span>
                        </div>
                        <div id="navbarMenu" className={'navbar-menu' + (this.state.menuOpen ? 'is-active' : '')} >
                            <div className="navbar-end">
                                <div className="tabs is-right">
                                    <ul>
                                        <li>
                                            <Link to={'/'}>Home</Link>
                                        </li>
                                        <li>
                                            <Link to={'/style'}>Try it yourself</Link>
                                        </li>
                                        <li>
                                            <a href="https://github.com/Pettrus/digitalism" target="_blank">
                                                Source Code
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        )
    }
}

export default withRouter(Header);