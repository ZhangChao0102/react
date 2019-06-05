import React, {useState, useEffect, Fragment} from 'react';
import TextField from 'alcedo-ui/TextField';
import RaisedButton from 'alcedo-ui/RaisedButton';

function UserName(props, ref) {

    const [name, setName] = useState('tom');
    const [width, setWidth] = useWindowWidth();

    return (
        <Fragment>
            <TextField value={name} onChange={(value) => {
                setName(value);
            }}/>
            <RaisedButton value="Width 800" onClick={() => {
                setWidth(width + 1);
            }}/>
            <p>{width}</p>
        </Fragment>
    );
}

export default UserName;

function useWindowWidth() {
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {

        const handleResize = (e) => {
            setWidth(e.target.innerWidth);
        };
        window.addEventListener('resize', handleResize);

        console.log('width::', width);

        return () => {
            window.removeEventListener('resize', handleResize);
        };

    });
    return [
        width, setWidth
    ];
}