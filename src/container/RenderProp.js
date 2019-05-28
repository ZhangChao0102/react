import React from 'react';
import Show from '../components/Show';

class RendererProp extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Show renderer={() => <p>show here</p>}/>
            </div>
        );
    }
}

export default RendererProp;