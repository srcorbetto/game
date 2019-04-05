import React, { Component } from 'react';
import 'aframe';
import {Entity, Scene} from 'aframe-react';
// import { auth, db } from './firebaseConfig';
import { Link, Route, withRouter } from 'react-router-dom';

import './AframeView.css';

class AframeView extends Component {
    state = {
        color: 'green'
    }

    toggleColor = keyPressed => {
        console.log(keyPressed.key);
        switch(keyPressed.key) {
            case 'm':
                this.setState({ color: 'maroon'})
                break;
            case 'n':
                this.setState({ color: '#333333'})
                break;
            case 'b':
                this.setState({ color: 'brown'})
                break;
            case 'v':
                this.setState({ color: 'purple'})
                break;
            default:
                console.log('Button not mapped')
        }
    }

    toggleShape = e => {

    }

    componentDidMount() {
        document.addEventListener('keydown', this.toggleColor);
    }

    render() {
        return (
            <div className="row">
                <div className="col">
                {/* Separate component? */}
                    <a-scene>
                        <a-plane position="0 0 -4"
                                 rotation="-90 0 0"
                                 width="4"
                                 height="4"
                                 color="#7BC8A4">
                        </a-plane>
                        <a-entity geometry="primitive: box"
                                  material={`color: ${this.state.color}`}
                                  position="0 1.25 -3.225"
                                  rotation="0 -28.9 0">
                        </a-entity>
                        <a-sky color="#ECECEC"></a-sky>
                    </a-scene>
                </div>
            </div>
        )
    }
}

export default AframeView;