import React from 'react';

export default function (WrapperComponent) {
    return class DecorationComponent extends React.Component {
        constructor(props) {
            super(props);

            this.state = {
                something: false
            };
        }

        render() {
            return <WrapperComponent something={this.state.something} {...this.props}/>;
        }
    };
}