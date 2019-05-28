import React, {useState, useEffect, Fragment} from 'react';
import TextField from 'alcedo-ui/TextField';

function UserName() {
    const [name, setName] = useState('tom');
    const width = useWidth();

    return (
        <Fragment>
            <TextField value={name} onChange={(value) => {
                setName(value);
            }}/>
            <TextField value={width}/>
        </Fragment>
    );
}

export default UserName;

function useWidth() {
    const [pageWidth, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handlerResize = () => {
            setWidth(window.innerWidth);
        };
        window.addEventListener('resize', handlerResize);
        return () => {
            window.removeEventListener('resize', handlerResize);
        };
    });

    return pageWidth;
}
