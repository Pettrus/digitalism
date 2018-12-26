import React, { Component } from 'react';
import Header from '../components/Header';
import { Link } from 'react-router-dom';

class Home extends Component {
    render() {
        return (
            <div>
                <section className="hero is-fullheight is-default is-bold">
                    <Header />

                    <div className="hero-body">
                        <div className="container has-text-centered">
                            <div className="columns is-vcentered">
                                <div className="column is-5">
                                    <figure className="image is-3by3">
                                        <img className="image-frame" src="/images/styles/style-1.png" alt="Image cover" />
                                    </figure>
                                </div>

                                <div className="column is-6 is-offset-1">
                                    <h1 className="title is-2">
                                        Turn your pictures into art
                                    </h1>
                                    <h2 className="subtitle is-4">
                                        Repaint your images with your favorite style
                                    </h2>
                                    <br />
                                    <p className="has-text-centered">
                                        <Link to={'/style'} className="button is-medium is-info is-outlined">
                                            Try it yourself
                                        </Link>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="hero-foot">
                        <div className="container">
                            <div className="tabs is-centered">
                                <ul>
                                    <li>
                                        <span className="copyleft">&copy;</span> Copyleft 2018
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

export default Home;