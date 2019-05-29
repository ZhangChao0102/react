import React, {useState, useCallback, Fragment} from 'react';
import TextField from 'alcedo-ui/TextField';

function TestUseCallback() {
    const [name, setName] = useState('tom');
    const [age, setAge] = useState('18');
    const memoizedCallback = useCallback(() => {
        console.log('callback:' + name);
        return 'name is:' + name;
    }, [name]);

    return (
        <Fragment>
            <h2>Use Callback</h2>
            <TextField value={name} onChange={(value) => {
                setName(value);
            }}/>
            <TextField value={age} onChange={(value) => {
                setAge(value);
            }}/>
            <p>{memoizedCallback()}</p>
        </Fragment>
    );
}

export default TestUseCallback;