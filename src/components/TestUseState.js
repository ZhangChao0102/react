import React, {useState, Fragment} from 'react';
import TextField from 'alcedo-ui/TextField';

function TestUseState() {
    const [name, setName] = useState('tom');

    return (
        <Fragment>
            <h2>Use State</h2>
            <TextField value={name} onChange={(value) => {
                setName(value);
            }}/>
        </Fragment>
    );
}

export default TestUseState;