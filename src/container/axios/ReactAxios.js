import React from 'react';
import {Get} from 'react-axios';
import axios from '../../apis/instance';
import urls from '../../apis/apis';
import RaisedButton from 'alcedo-ui/RaisedButton';

function ReactAxios() {

    return <div>
        <Get url={urls.getChain} instance={axios}>
            {
                (error, response, isLoading, onReload) => {
                    if (error) {
                        return <div>error</div>;
                    } else if (isLoading) {
                        return <div>Loading...</div>;
                    } else if (response !== null) {
                        return <>
                            <div>{response.data.message}</div>
                            <RaisedButton value="Reload" onClick={() => onReload({instance: axios})}/>
                        </>;
                    } else {
                        return <div>default</div>;
                    }
                }
            }
        </Get>
    </div>;
}

export default ReactAxios;