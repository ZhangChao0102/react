import TestUseState from './container/testUseState';
import App from './App';

export function configureRoutes() {
    return [{
        path: '/app',
        component: App,
        routes: [
            {
                path: '/app/useState',
                component: TestUseState
            }
        ]
    },{
        path: '/useState',
        component: TestUseState
    }];
}