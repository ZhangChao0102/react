import React, {Suspense, lazy} from 'react';
import {Router, Route} from 'react-router';
import {NavLink} from 'react-router-dom';

function TestSuspense(props) {

    const DemoA = lazy(() => import('../../components/FunctionInput'));
    const DemoB = lazy(() => import('../../components/ManyList'));

    return <Suspense fallback={<div>loading...</div>}>
        <NavLink to="/app/suspense/demoA">DemoA</NavLink>
        <NavLink to="/app/suspense/demoB">DemoB</NavLink>

        <Router history={props.history}>
            <Route path="/app/suspense/demoA" component={DemoA}/>
            <Route path="/app/suspense/demoB" component={DemoB}/>
        </Router>
    </Suspense>;
}

export default TestSuspense;