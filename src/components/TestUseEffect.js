import React, {useState} from 'react';
import RaisedButton from 'alcedo-ui/RaisedButton';
import ClassDialog from './ClassDialog';
import FunctionDialog from './FunctionDialog';

function TestUseEffect() {
    const [visible1, setDialog1] = useState(false);
    const [visible2, setDialog2] = useState(false);

    return (
        <div>
            <h2>Use Effect</h2>
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

export default TestUseEffect;