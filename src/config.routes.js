import UserName from './container/hooks/UserName';
import Dialog from './container/hooks/Dialog';
import App from './App';
import RendererProp from './container/hooks/RenderProp';
import TestHOC from './container/hooks/TestHOC';
import SearchResults from './container/hooks/SearchResults';
import ExtraHooks from './container/hooks/ExtraHooks';
import Axios from './container/axios/Axios';

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
            },
            {
                path: '/app/axios',
                component: Axios
            }
        ]
    }];
}