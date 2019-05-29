import React, {useReducer, Fragment} from 'react';
import RaisedButton from 'alcedo-ui/RaisedButton';

function TestUseReducer() {
    const [state, dispatch] = useReducer(reducer, {count: 0});

    return (
        <Fragment>
            <h2>Use Reducer</h2>
            <RaisedButton value="Increase" onClick={() => {
                dispatch({type: 'increase'});
            }}/>
            <RaisedButton value="Decrease" onClick={() => {
                dispatch({type: 'decrease'});
            }}/>
            <p>count: {state.count}</p>
        </Fragment>
    );
}

export default TestUseReducer;

function reducer(state, action) {
    switch (action.type) {
        case 'increase':
            return {
                count: ++state.count
            };
        case 'decrease':
            return {
                count: --state.count
            };
        default:
            return state;
    }
}