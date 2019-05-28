import UserName from './container/UserName';
import Dialog from './container/Dialog';
import App from './App';
import RendererProp from './container/RenderProp';
import TestHOC from './container/TestHOC';

export function configureRoutes() {
    return [{
        path: '/app',
        component: App,
        routes: [
            {
                path: '/app/username',
                component: UserName
            },
            {
                path: '/app/dialog',
                component: Dialog
            },
            {
                path: '/app/render-prop',
                component: RendererProp
            },
            {
                path: '/app/HOC',
                component: TestHOC
            }
        ]
    }];
}