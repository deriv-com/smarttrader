import { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

const Portal = ({ children }) => {
    const elRef = useRef(document.createElement('div'));

    useEffect(() => {
        const el = elRef.current;
        document.body.appendChild(el);

        return () => {
            if (document.body.contains(el)) {
                document.body.removeChild(el);
            }
        };
    }, []);

    return ReactDOM.createPortal(
        children,
        elRef.current
    );
};

export default Portal;
