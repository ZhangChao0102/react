import React, {useState} from 'react';
import ClassDialog from '../components/ClassDialog';
import FunctionDialog from '../components/FunctionDialog';
import RaisedButton from 'alcedo-ui/RaisedButton';

export default function UserName() {
    const [visible1, setDialog1] = useState(false);
    const [visible2, setDialog2] = useState(false);

    return (
        <div>
            <RaisedButton value="Toggle1" onClick={() => {
                setDialog1(true);
            }}/>
            <RaisedButton value="Toggle2" onClick={() => {
                setDialog2(true);
            }}/>
            <ClassDialog visible={visible1} onRequestClose={() => {
                setDialog1(false);
            }}/>
            <FunctionDialog visible={visible2} onRequestClose={() => {
                setDialog2(false);
            }}/>
        </div>
    );
}