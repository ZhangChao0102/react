import React, {useRef, useImperativeHandle, forwardRef} from 'react';
import TextField from 'alcedo-ui/TextField';

function CustomizedTextField(props, ref) {
    const inputRef = useRef(null);
    useImperativeHandle(ref, () => ({
        focus: inputRef.current.focus
    }));

    return <TextField ref={inputRef}/>;
}

export default forwardRef(CustomizedTextField);