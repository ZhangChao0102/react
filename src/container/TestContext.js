import React, {useContext} from 'react';
import {MyContext} from '../context/Context';

function TestContext() {
    const context = useContext(MyContext);

    return (
        <div>
            <MyContext.Consumer>
                {
                    (value) =>
                        <div>
                            {value}
                        </div>
                }
            </MyContext.Consumer>
            {context}
        </div>
    );
}

export default TestContext;
