import React, {useState} from 'react';
import Tab from 'alcedo-ui/Tab';
import {renderRoutes} from 'react-router-config';

import '../../scss/NewFeature.scss';

function NewFeature(props) {
    const [activeIndex, setIndex] = useState(0);
    const tabs = [
        {
            label: 'ES2016', value: 'ES2016', onActive: (item, index) => {
                activeHandler('/new-feature/es2016', index);
            }
        },
        {
            label: 'ES2017', value: 'ES2017', onActive: (item, index) => {
                activeHandler('/new-feature/es2017', index);
            }
        },
        {
            label: 'ES2018', value: 'ES2018', onActive: (item, index) => {
                activeHandler('/new-feature/es2018', index);
            }
        },
        {
            label: 'ES2019', value: 'ES2019', onActive: (item, index) => {
                activeHandler('/new-feature/es2019', index);
            }
        }
    ];

    const activeHandler = (tab, index) => {
        setIndex(index);
        props.history.push(tab);
    };

    return <div className="new-feature">
        <h1>New Features</h1>
        <Tab tabs={tabs} activatedIndex={activeIndex}/>
        {renderRoutes(props.route.routes)}
    </div>;
}

export default NewFeature;