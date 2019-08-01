import UserName from './container/hooks/UserName';
import Dialog from './container/hooks/Dialog';
import App from './App';
import RendererProp from './container/hooks/RenderProp';
import TestHOC from './container/hooks/TestHOC';
import SearchResults from './container/hooks/SearchResults';
import ExtraHooks from './container/hooks/ExtraHooks';
import Axios from './container/axios/Axios';
import Flex from './container/flex/Flex';
import Fetch from './container/fetch/Fetch';
import Suspense from './container/suspense/Suspense';
import NewFeature from './container/newFeature/NewFeature';
import ES2016 from './container/newFeature/ESVersion/ES2016';
import ES2017 from './container/newFeature/ESVersion/ES2017';
import ES2018 from './container/newFeature/ESVersion/ES2018';
import ES2019 from './container/newFeature/ESVersion/ES2019';

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
            },
            {
                path: '/app/flex',
                component: Flex
            },
            {
                path: '/app/fetch',
                component: Fetch
            },
            {
                path: '/app/suspense',
                component: Suspense
            }
        ]
    }, {
        path: '/new-feature',
        component: NewFeature,
        routes: [
            {
                path: '/new-feature/es2016',
                component: ES2016
            },
            {
                path: '/new-feature/es2017',
                component: ES2017
            },
            {
                path: '/new-feature/es2018',
                component: ES2018
            },
            {
                path: '/new-feature/es2019',
                component: ES2019
            }
        ]
    }];
}