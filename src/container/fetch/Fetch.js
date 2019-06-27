import React from 'react';
import FetchGet from './FetchGet'

function Fetch() {
    return <>
        <h3>Fetch</h3>
        <FetchGet />
    </>;
}

export default React.memo(Fetch);