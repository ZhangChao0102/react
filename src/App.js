import React from 'react';
import './App.scss';
// import {MyContext} from './context/Context';
import {renderRoutes} from 'react-router-config';
// import TestContext from './container/TestContext';
// import UserName1 from './container/testUseState';
// import UserName2 from './container/testOlderState';
// import Dialog1 from './container/testUseEffect';
// import Dialog2 from './container/testOlderLifeCycle';

function App(props) {
    return (
        <div className="App">
            <header className="App-header">
                {renderRoutes(props.route.routes)}
            </header>
        </div>
    );
}

export default App;
