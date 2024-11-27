import { createBrowserRouter } from 'react-router-dom';

import { CreatePhoto, Home, ReadyPhoto } from '@/pages';
import { InactivityHandler } from '@/shared/handlers';

export const router = createBrowserRouter([
    {
        element: <InactivityHandler timeout={10000} />,
        children: [
            {
                path: '/',
                element: <Home />,
            },
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
