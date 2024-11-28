import { createBrowserRouter } from 'react-router-dom';

import { CreatePhoto, Home, ReadyPhoto } from '@/pages';
import { InactivityHandler } from '@/shared/handlers';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
    },
    {
        element: <InactivityHandler timeout={5 * 60 * 1000} />, // 5 минут
        children: [
            {
                path: '/create-photo',
                element: <CreatePhoto />,
            },
            {
                path: '/ready-photo',
                element: <ReadyPhoto />,
            },
        ],
    },
]);
