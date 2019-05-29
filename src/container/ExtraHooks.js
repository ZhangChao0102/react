import React from 'react';
import TestUseCallback from '../components/TestUseCallback';
import TestUseMemo from '../components/TestUseMemo';
import TestUseReducer from '../components/TestUseReducer';
import TestUseRef from '../components/TestUseRef';
import TestUseContext from '../components/TestUseContext';
import TestUseState from '../components/TestUseState';
import TestUseEffect from '../components/TestUseEffect';
import TestUseImperativeHandle from '../components/TestUseImperativeHandle';

import '../scss/ExtraHooks.scss';

function ExtraHooks() {
    return (
        <div className="extra-hooks">
            <div className="hook-item">
                <TestUseState/>
            </div>
            <div className="hook-item">
                <TestUseEffect/>
            </div>
            <div className="hook-item">
                <TestUseContext/>
            </div>
            <div className="hook-item">
                <TestUseCallback/>
            </div>
            <div className="hook-item">
                <TestUseMemo/>
            </div>
            <div className="hook-item">
                <TestUseReducer/>
            </div>
            <div className="hook-item">
                <TestUseRef/>
            </div>
            <div className="hook-item">
                <TestUseImperativeHandle/>
            </div>
        </div>
    );
}

export default ExtraHooks;