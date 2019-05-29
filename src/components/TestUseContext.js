import React, {useContext} from 'react';
import {MyContext} from '../context/Context';

function TestUseContext() {
    const context = useContext(MyContext);

    return (
        <div>
            <h2>Use Context</h2>
            <MyContext.Consumer>
                {
                    (value) =>
                        <div>
                            context value is {value}
                        </div>
                }
            </MyContext.Consumer>
            context value is {context}
        </div>
    );
}

export default TestUseContext;
