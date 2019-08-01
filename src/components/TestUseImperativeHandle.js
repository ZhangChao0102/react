import React, {useRef, Fragment} from 'react';
import RaisedButton from 'alcedo-ui/RaisedButton';
import CustomizedTextField from '../components/CustomizedTextField';
import UseImperativeHandle from './UseImperativeHandle';

function TestUseImperativeHandle() {
    const ref = useRef(null);
    const ref2 = useRef(null);

    return (
        <Fragment>
            <h2>Use ImperativeHandle</h2>
            <RaisedButton value="Focus"
                          onClick={() => {
                              ref.current.focus();
                          }}/>
            <RaisedButton value="test"
                          onClick={() => {
                              ref2.current.test();
                          }}/>
            <CustomizedTextField ref={ref}/>
            <UseImperativeHandle ref={ref2}/>
        </Fragment>
    );
}

export default TestUseImperativeHandle;