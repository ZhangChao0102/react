import React from 'react';
import './App.scss';
import {MyContext, MyContext2} from './context/Context';
import {renderRoutes} from 'react-router-config';
import TestContext from './container/hooks/TestContext';
// import UserName1 from './container/testUseState';
// import UserName2 from './container/testOlderState';
// import Dialog1 from './container/testUseEffect';
// import Dialog2 from './container/testOlderLifeCycle';

function App(props) {
    return (
        <MyContext.Provider value={'11212'}>
            <MyContext2.Provider value={'12345'}>
                <div className="App">
                    <header className="App-header">
                        <TestContext/>
                        {renderRoutes(props.route.routes)}
                    </header>
                </div>
            </MyContext2.Provider>
        </MyContext.Provider>
    );
}

export default App;
