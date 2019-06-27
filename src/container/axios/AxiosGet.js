import React from 'react';
import axios from '../../apis/instance';
import urls from '../../apis/apis';
import RaisedButton from 'alcedo-ui/RaisedButton';

function AxiosGet() {
    const getData = () => axios.get(`/click-campaign/v1/click/campaign/ds-algo/info?chainId=2`)
        .then((response) => {
            console.log(response);
        }).catch(error => {
            console.log('error: ' + error);
        });

    const getChain = async () => {
        const response = await axios.get(urls.getChain);
        console.log(response);
    };

    return <>
        <RaisedButton value="Get Data" onClick={getData}/>
        <RaisedButton value="Synchronous" onClick={getChain}/>
    </>;
}

export default AxiosGet;