import React, {useEffect} from 'react';
import Dialog from 'alcedo-ui/Dialog';

function UserName(props) {
    useEffect(() => {
        console.log(props.visible);
    }, [props.visible]);

    return (
        <Dialog visible={props.visible}/>
    );
}

export default UserName;
