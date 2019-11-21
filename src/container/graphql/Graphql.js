import React from 'react';
import urls from '../../apis/apis';
import axios from 'axios';
import RaisedButton from 'alcedo-ui/RaisedButton';


export default function Graphql(props) {
    async function getList() {
        fetch('/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({query: '{ getMessage}'})
        })
            .then(r => r.json())
            .then(data => console.log('data returned:', data));
    }

    fetch('/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(`mutation {
  createMessage(input: {
    author: "andy",
    content: "hope is a good thing",
  }) {
    id
  }
}`)
    })
        .then(r => r.json())
        .then(data => console.log('data returned:', data));
    return (
        <div>
            <RaisedButton value='Graphql' onClick={getList}/>
        </div>
    );
}
