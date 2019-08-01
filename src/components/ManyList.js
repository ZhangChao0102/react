import List from 'alcedo-ui/List';
import React from 'react';

function ManyList(props) {
    const array = getArray(1000);

    return <>
        <List data={array}/>
    </>;
}

function getArray(length) {
    let array = [];
    for (let i = 0; i < length; i++) {
        array.push({value: i, label: i, id: i});
    }
    return array;
}

export default ManyList;