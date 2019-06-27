import React from 'react';
import AxiosGet from './AxiosGet';
import AxiosAll from './AxiosAll';
import Signin from './Signin';
import AxiosCancel from './AxiosCancel';
import ReactAxios from './ReactAxios';

function TestAxios() {

    return <>
        <Signin/>
        <AxiosGet/>
        <AxiosAll/>
        <AxiosCancel/>
        <ReactAxios/>
    </>;
}

export default TestAxios;