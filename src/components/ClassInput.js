import React from 'react';
import TextField from 'alcedo-ui/TextField';

class UserName extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: 'tom'
        };
    }

    init = () => {

    };

    setName = (name) => {
        this.setState({
            name
        });
    };

    render() {
        return (
            <TextField value={this.state.name} onChange={this.setName}/>
        );
    }
}

export default UserName;