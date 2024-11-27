import { FC, useEffect, useRef } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

interface IInactivityHandlerProps {
    timeout: number;
}

export const InactivityHandler: FC<IInactivityHandlerProps> = ({ timeout }) => {
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const navigate = useNavigate();

    const resetTimer = () => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }
        timerRef.current = setTimeout(() => {
            console.log('navigate');
            navigate('/');
        }, timeout);
    };

    useEffect(() => {
        window.addEventListener('click', resetTimer);

        resetTimer();

        return () => {
            window.removeEventListener('click', resetTimer);
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        };
    }, [navigate, timeout]);

    return <Outlet />;
};
