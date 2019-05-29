import React, {useEffect, useState} from 'react';
import Dialog from 'alcedo-ui/Dialog';

export default function FunctionDialog(props) {
    const [visible, setVisible] = useState(props.visible);

    useEffect(() => {
        setVisible(props.visible);
        //do something effect
        return () => {
            //remove something by-effect
            console.log('visible changed');
        };
    }, [props.visible]);

    return (
        <Dialog visible={visible} onRequestClose={props.onRequestClose}/>
    );
}