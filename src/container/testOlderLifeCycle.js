import React from 'react';
import Dialog from 'alcedo-ui/Dialog';

class UserName extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        console.log(1);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log(2);
    }

    render() {
        return (
            <Dialog visible={this.props.visible}/>
        );
    }
}

export default UserName;