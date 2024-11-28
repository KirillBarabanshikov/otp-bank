import clsx from 'clsx';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { createPhotoHandler, fetchPhoto } from '@/shared/api';
import Logo from '@/shared/assets/logo.svg?react';
import { AlertModal, Button, CameraFeed, Loader, Timer } from '@/shared/ui';

import styles from './CreatePhoto.module.scss';

export const CreatePhoto = () => {
    const [showTimer, setShowTimer] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const navigate = useNavigate();

    const handleTimerEnd = async () => {
        try {
            videoRef.current?.pause();
            setIsLoading(true);
            const { photoName } = await createPhotoHandler();
            const { originalImage } = await fetchPhoto(photoName);
            navigate('/ready-photo', { state: originalImage });
        } catch (error) {
            setShowTimer(false);
            setIsError(true);
            console.error(error);
        } finally {
            setIsLoading(false);
            await videoRef.current?.play();
        }
    };

    return (
        <>
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
                <CameraFeed videoRef={videoRef} className={styles.camera} />
            </div>
            <Loader isLoading={isLoading} title={'Пожалуйста,подождите...'} />
            <AlertModal
                isOpen={isError}
                onClose={() => setIsError(false)}
                isError
                title={'не удалось сделать фото'}
                subtitle={'не удалось сделать фото'}
                actions={<Button onClick={() => setIsError(false)}>назад</Button>}
            />
        </>
    );
};
