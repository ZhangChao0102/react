import React, {useState, useMemo, Fragment} from 'react';
import TextField from 'alcedo-ui/TextField';

function TestUseMemo() {
    const [name, setName] = useState('tom');
    const [age, setAge] = useState('18');
    const memoizedValue = useMemo(() => {
        console.log('memo:' + name);
        return 'name is:' + name;
    }, [name]);

    return (
        <Fragment>
            <h2>Use Memo</h2>
            <TextField value={name} onChange={(value) => {
                setName(value);
            }}/>
            <TextField value={age} onChange={(value) => {
                setAge(value);
            }}/>
            <p>{memoizedValue}</p>
        </Fragment>
    );
}

export default TestUseMemo;