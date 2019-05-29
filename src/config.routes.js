import UserName from './container/UserName';
import Dialog from './container/Dialog';
import App from './App';
import RendererProp from './container/RenderProp';
import TestHOC from './container/TestHOC';
import SearchResults from './container/SearchResults';
import ExtraHooks from './container/ExtraHooks';

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
            },
            {
                path: '/app/search',
                component: SearchResults
            },
            {
                path: '/app/hooks',
                component: ExtraHooks
            }
        ]
    }];
}