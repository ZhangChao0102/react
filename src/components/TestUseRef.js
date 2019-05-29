import React, {useRef, Fragment} from 'react';
import RaisedButton from 'alcedo-ui/RaisedButton';

function TestUseRef() {
    const ref = useRef(null);
    const showHeight = () => {
        console.log(ref.current.style.height);
    };

    return (
        <Fragment>
            <h2>Use Ref</h2>
            <RaisedButton value="Show height" onClick={showHeight}/>
            <div ref={ref}>Here is the ref.</div>
        </Fragment>
    );
}

export default TestUseRef;