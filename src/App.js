import React from 'react';
import './App.css';
import {MyContext} from './context/Context';
import {renderRoutes} from 'react-router-config';
// import TestContext from './container/TestContext';
// import UserName1 from './container/testUseState';
// import UserName2 from './container/testOlderState';
// import Dialog1 from './container/testUseEffect';
// import Dialog2 from './container/testOlderLifeCycle';

function App(props) {
    return (
        <MyContext.Provider value={'11212'}>
            111
            <div className="App">
                <header className="App-header">
                    {/*<TestContext/>*/}
                </header>
                {renderRoutes(props.route.routes)}
            </div>
        </MyContext.Provider>
    );
}

export default App;
