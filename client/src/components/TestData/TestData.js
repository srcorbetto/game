import React, { Component } from 'react';
// import { authFunc } from '../../authFunc';

class TestData extends Component {

    state = {
        info: null
    }

    render() {
        return (
            <div>
                hello
                <p>{this.props.info}</p>
            </div>
        )
    }
}

export default TestData;