import React, {useEffect} from 'react';
import Cookie from 'js-cookie';
import RaisedButton from 'alcedo-ui/RaisedButton';
import urls from '../../apis/apis';

function FetchGet() {
    const token = Cookie.get('token');

    async function getList() {
        const response = await fetch(urls.getChain, {
            headers: new Headers({
                token
            }),
            credentials: 'same-origin'
        });
        const json = await response.json();
        console.log(json);
    }

    useEffect(() => {
        fetch(urls.getUserInfo, {
            headers: new Headers({
                token
            })
        }).then((response) => {
            console.log(response.ok);
            if (response.ok) {
                return response.json();
            }
        }).then(res => {
            console.log(res);
        });
    }, []);

    return <>
        <RaisedButton value='Synchronous' onClick={getList}/>
    </>;
}


export default React.memo(FetchGet);