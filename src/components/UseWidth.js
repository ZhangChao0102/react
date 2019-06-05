import { useState, useEffect } from 'react'

export default function useWidth() {
    const [pageWidth, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        console.log('add');
        const handlerResize = () => {
            setWidth(window.innerWidth);
        };
        window.addEventListener('resize', handlerResize);
        return () => {
            console.log('remove');
            window.removeEventListener('resize', handlerResize);
        };
    });

    return pageWidth;
}