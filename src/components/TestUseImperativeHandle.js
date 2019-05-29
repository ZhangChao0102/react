import React, {useRef, Fragment} from 'react';
import RaisedButton from 'alcedo-ui/RaisedButton';
import CustomizedTextField from '../components/CustomizedTextField';

function TestUseImperativeHandle() {
    const ref = useRef(null);

    return (
        <Fragment>
            <h2>Use ImperativeHandle</h2>
            <RaisedButton value="Focus"
                          onClick={() => {
                              ref.current.focus();
                          }}/>
            <CustomizedTextField ref={ref}/>
        </Fragment>
    );
}

export default TestUseImperativeHandle;