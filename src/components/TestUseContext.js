import React, {useContext} from 'react';
import {MyContext, MyContext2} from '../context/Context';

function TestUseContext() {
    const context = useContext(MyContext);
    const context2 = useContext(MyContext2);

    return (
        <div>
            <h2>Use Context</h2>
            <MyContext.Consumer>
                {
                    (value) =>
                        <MyContext2.Consumer>
                            {
                                (value2) =>
                                    <div>
                                        context value is {value + '' + value2}
                                    </div>
                            }
                        </MyContext2.Consumer>
                }
            </MyContext.Consumer>
            context value is {context + '' + context2}
        </div>
    );
}

export default TestUseContext;
