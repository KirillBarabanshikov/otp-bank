import axios from 'axios';
import clsx from 'clsx';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Logo from '@/shared/assets/logo.svg?react';
import { API_URL } from '@/shared/consts';
import { Button, CameraFeed, Timer } from '@/shared/ui';

import styles from './CreatePhoto.module.scss';

export const CreatePhoto = () => {
    const [showTimer, setShowTimer] = useState(false);
    const navigate = useNavigate();

    const handleTimerEnd = async () => {
        try {
            // await axios.post('');
            const response = await axios.post<{ hash: string; original_image: string }>(
                API_URL + '/api/generation/photo',
                {
                    name: 'test.png',
                },
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                },
            );
            navigate('/ready-photo', { state: response.data });
        } catch (error) {
            console.error(error);
            setShowTimer(false);
        }
    };

    return (
        <div className={styles.createPhoto}>
            <Logo className={styles.logo} />

            {showTimer ? (
                <Timer time={5} onEnd={handleTimerEnd} className={styles.timer} />
            ) : (
                <>
                    <h2 className={styles.title}>Приготовьтесь</h2>
                    <p className={clsx(styles.text, 'text')}>
                        Примите удобную позу и нажмите кнопку, чтобы сделать фото
                    </p>
                    <Button onClick={() => setShowTimer(true)} className={styles.button}>
                        Начать
                    </Button>
                </>
            )}
            <CameraFeed className={styles.camera} />
        </div>
    );
};
