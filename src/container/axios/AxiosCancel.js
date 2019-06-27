import React from 'react';
import axios from 'axios/index';
import myAxios from '../../apis/instance';
import urls from '../../apis/apis';
import RaisedButton from 'alcedo-ui/RaisedButton';

function AxiosCancel() {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    const getData = () => myAxios.get(urls.getUserInfo, {
        cancelToken: source.token
    }).catch(error => {
        if (axios.isCancel(error)) {
            console.log('request cancel: ', error.message);
        }
    });
    const cancelGet = () => {
        source.cancel('it cancel.');
    };

    return <>
        <RaisedButton value="Get some" onClick={getData}/>
        <RaisedButton value="Cancel" onClick={cancelGet}/>
    </>;
}

export default AxiosCancel;