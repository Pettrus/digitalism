import React, { Component } from 'react';
import 'bulma';

class SelectStyle extends Component {

    state = {
        tab: 1
    }

    getClass = (num) => {
        return (num == this.state.tab ? "is-active" : '')
    }

    changeTab(e, num) {
        e.preventDefault();
        this.setState({
            tab: num
        });
    }

    chooseStyle = (e, num) => {
        e.preventDefault();
        const image = document.getElementById("img" + num);
        this.props.parent(image);
    }

    render() {
        return (
            <div>
                <div className="tabs">
                    <ul>
                        <li className={this.getClass(1)}>
                            <a onClick={(e) => this.changeTab(e, 1)}>Recommended</a>
                        </li>
                        <li className={this.getClass(2)}>
                            <a onClick={(e) => this.changeTab(e, 2)}>Upload your own</a>
                        </li>
                    </ul>
                </div>

                <div id="tab-content">
                    <div className={'pointer content ' + this.getClass(1)}>
                        <div className="columns">
                            <div className="column is-4 smaller-padding pointer">
                                <img src="/images/styles/style-1.png" onClick={(e) => this.chooseStyle(e, 1)} alt="Style 1" />
                                <img id="img1" src="/images/styles/img-1.jpg" style={{display: 'none'}} alt="Style 1" />
                            </div>

                            <div className="column is-4 smaller-padding pointer">
                                <img src="/images/styles/style-2.png" onClick={(e) => this.chooseStyle(e, 2)} alt="Style 2" />
                                <img id="img2" src="/images/styles/img-2.jpg" style={{display: 'none'}} alt="Style 2" />
                            </div>

                            <div className="column is-4 smaller-padding">
                                <img src="/images/styles/style-3.png" onClick={(e) => this.chooseStyle(e, 3)} alt="Style 3" />
                                <img id="img3" src="/images/styles/img-3.jpg" style={{display: 'none'}} alt="Style 3" />
                            </div>
                        </div>

                        <div className="columns">
                            <div className="column is-4 smaller-padding">
                                <img src="/images/styles/style-4.png" onClick={(e) => this.chooseStyle(e, 4)} alt="Style 4" />
                                <img id="img4" src="/images/styles/img-4.jpg" style={{display: 'none'}} alt="Style 4" />
                            </div>

                            <div className="column is-4 smaller-padding">
                                <img src="/images/styles/style-5.png" onClick={(e) => this.chooseStyle(e, 5)} alt="Style 5" />
                                <img id="img5" src="/images/styles/img-5.jpg" style={{display: 'none'}} alt="Style 5" />
                            </div>

                            <div className="column is-4 smaller-padding">
                                <img src="/images/styles/style-6.png" onClick={(e) => this.chooseStyle(e, 6)} alt="Style 6" />
                                <img id="img6" src="/images/styles/img-6.jpeg" style={{display: 'none'}} alt="Style 6" />
                            </div>
                        </div>
                    </div>

                    <div className={'content ' + this.getClass(2)}>
                        Coming soon!
                    </div>
                </div>
            </div>
        )
    }
}

export default SelectStyle;