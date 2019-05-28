import React from 'react';

class RenderProp extends React.Component {
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

export default RenderProp;