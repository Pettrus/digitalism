import React, { Component } from 'react';
import {
    Link,
    withRouter
} from 'react-router-dom';

class Header extends Component {
    render() {
        return (
            <div className="hero-head">
                <nav className="navbar">
                    <div className="container">
                        <div className="navbar-brand">
                            <a className="navbar-item" href="../">
                                <img src="/images/logo.png" alt="Logo" style={{maxHeight: '2.5em'}} />
                            </a>
                            <span className="navbar-burger burger" data-target="navbarMenu">
                                <span></span>
                                <span></span>
                                <span></span>
                            </span>
                        </div>
                        <div id="navbarMenu" className="navbar-menu">
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
                                            <a href="#">
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