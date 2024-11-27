import { createBrowserRouter } from 'react-router-dom';

import { CreatePhoto, Home, ReadyPhoto } from '@/pages';
import { InactivityHandler } from '@/shared/handlers';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
    },
    {
        element: <InactivityHandler timeout={300000} />,
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
