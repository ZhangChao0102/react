import React from 'react';
import md5 from 'md5';
import Cookies from 'js-cookie';
import axios from '../../apis/instance';
import apis from '../../apis/apis';
import RaisedButton from 'alcedo-ui/RaisedButton';

function AxiosGet() {
    const signin = () => axios.post(apis.signin, {
        username: 'trista.jiang',
        password: md5(md5('Trista123')),
        platform: 'Click'
    }).then((response) => {
        Cookies.set('token', response.data.data.access_token);
    });

    return <>
        <RaisedButton value="Sign In" onClick={signin}/>
    </>;
}

export default AxiosGet;