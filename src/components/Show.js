import React from 'react';

class Show extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                {this.props.renderer()}
            </div>
        );
    }
}

export default Show;