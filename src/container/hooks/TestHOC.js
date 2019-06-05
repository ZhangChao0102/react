import React from 'react';
import HOC from '../../components/HOC';

class TestHOC extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                Here is the component.
            </div>
        );
    }
}

export default HOC(TestHOC);