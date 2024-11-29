import { createBrowserRouter } from 'react-router-dom';

import { CreatePhoto, Home, ReadyPhoto } from '@/pages';
import { InactivityHandler } from '@/shared/handlers';
import { INACTIVITY_TIMEOUT } from '@/shared/consts';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
    },
    {
        element: <InactivityHandler timeout={INACTIVITY_TIMEOUT} />,
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
