import React from 'react';
import axios from 'axios';
import RaisedButton from 'alcedo-ui/RaisedButton';
import baseUrl from '../container/axios/config.urls';

function AxiosGet() {

    const getData = () => axios.get(`${baseUrl.testing}/click-campaign/v1/click/campaign/ds-algo/info?chainId=2`)
        .then((response) => {
            console.log(response);
        });

    return <>
        <RaisedButton value="Get Data" onClick={getData}/>
    </>;
}

export default AxiosGet;