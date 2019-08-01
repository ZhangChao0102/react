import React, {useImperativeHandle} from 'react';

function Imperative(props, ref) {

    useImperativeHandle(ref, () => ({
        test: () => {
            console.log(1111111);
        }
    }));

    return <div>

    </div>;
}

export default React.forwardRef(Imperative);