import React, {useEffect, useState} from 'react';
import TextField from 'alcedo-ui/TextField';
import axios from 'axios/index';

export default function FunctionDialog(props) {
    const [query, setQuery] = useState('react');
    const [data, setData] = useState({hits: []});

    useEffect(() => {
        let ignore = false;

        async function fetchData() {
            const result = await axios('https://hn.algolia.com/api/v1/search?query=' + query);
            if (!ignore) {
                console.log(1);
                setData(result.data);
            }
        }

        fetchData();

        return () => {
            console.log(2);
            ignore = true;
        };
    }, [query]);

    return (
        <>
            <TextField value={query}
                       onChange={(value) => {
                           setQuery(value);
                       }}/>
            <ul>
                {data.hits.map(item => (
                    <li key={item.objectID}>
                        <a href={item.url} style={{color: 'white'}}>{item.title}</a>
                    </li>
                ))}
            </ul>
        </>

    );
}