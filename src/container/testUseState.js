import React, {useState} from 'react';
import TextField from 'alcedo-ui/TextField';

function UserName() {
    const [name, setName] = useState('tom');

    return (
        <TextField value={name} onChange={(value) => {
            setName(value);
        }}/>
    );
}

export default UserName;
