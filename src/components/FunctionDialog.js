import React, {useEffect, useState} from 'react';
import Dialog from 'alcedo-ui/Dialog';

export default function FunctionDialog(props) {
    const [visible, setVisible] = useState(props.visible);

    useEffect(() => {
        setVisible(props.visible);
        return () => {
            //remove something by-effect
        };
    }, [props.visible]);

    return (
        <Dialog visible={visible} onRequestClose={props.onRequestClose}/>
    );
}

// function useVisible(props) {
//     const [visible, setVisible] = useState(props.visible);
//
//     useEffect(() => {
//         setVisible(props.visible);
//         return () => {
//             //remove something by-effect
//         };
//     }, [props.visible]);
//
//     return visible;
// }