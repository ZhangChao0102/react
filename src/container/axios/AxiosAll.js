import React from 'react';
import Axios from 'axios/index';
import myAxios from '../../apis/instance';
import urls from '../../apis/apis';
import RaisedButton from 'alcedo-ui/RaisedButton';

function AxiosAll() {
    const getData = () => Axios.all([myAxios.get(urls.getUserInfo), myAxios.get(urls.getPermission)])
        .then(Axios.spread((userInfo, permission) => {
            console.log('userInfo: ', userInfo);
            console.log('permission: ', permission);
        }));

    return <>
        <RaisedButton value="Get All Data" onClick={getData}/>
    </>;
}

export default AxiosAll;