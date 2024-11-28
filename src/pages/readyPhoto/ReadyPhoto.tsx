import clsx from 'clsx';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { EmailModal } from '@/pages/readyPhoto/components';
import { generateFrame, generatePhoto, printPhotoHandler } from '@/shared/api';
import Logo from '@/shared/assets/logo.svg?react';
import { API_URL } from '@/shared/consts';
import { AlertModal, Button, Loader, Photo } from '@/shared/ui';

import styles from './ReadyPhoto.module.scss';

export const ReadyPhoto = () => {
    const [modalState, setModalState] = useState<'none' | 'email' | 'generate-error' | 'print-error' | 'print-success'>(
        'none',
    );
    const [loadingState, setLoadingState] = useState<'none' | 'generate' | 'print'>('none');
    const navigate = useNavigate();
    const location = useLocation();
    const originalImage = (location.state as string) || '';

    const [photo, setPhoto] = useState<{
        currentImage: string;
        prevImage?: string;
        origin: boolean;
        decorative: boolean;
    }>({
        currentImage: originalImage,
        prevImage: undefined,
        origin: true,
        decorative: false,
    });

    const handleToggleFrame = async () => {
        const currentPhoto = photo;

        if (currentPhoto.decorative && currentPhoto.prevImage) {
            return setPhoto({
                currentImage: currentPhoto.prevImage,
                prevImage: currentPhoto.currentImage,
                origin: currentPhoto.origin,
                decorative: !currentPhoto.decorative,
            });
        }

        try {
            setLoadingState('generate');
            const { generatedImage } = await generateFrame({ origin: currentPhoto.origin });
            setPhoto({
                currentImage: generatedImage,
                prevImage: currentPhoto.currentImage,
                origin: currentPhoto.origin,
                decorative: true,
            });
        } catch (error) {
            console.error(error);
            setModalState('generate-error');
        } finally {
            setLoadingState('none');
        }
    };

    const handleGeneratePhoto = async () => {
        try {
            setLoadingState('generate');
            const { generatedImage } = await generatePhoto();
            setPhoto({
                currentImage: generatedImage,
                prevImage: undefined,
                origin: false,
                decorative: false,
            });
        } catch (error) {
            console.error(error);
            setModalState('generate-error');
        } finally {
            setLoadingState('none');
        }
    };

    const handlePrint = async () => {
        try {
            setLoadingState('print');
            await printPhotoHandler(`${API_URL}/${photo.currentImage}`);
            setModalState('print-success');
        } catch (error) {
            console.error(error);
            setModalState('print-error');
        } finally {
            setLoadingState('none');
        }
    };

    const handleEmail = () => {
        setModalState('email');
    };

    const closeModal = () => setModalState('none');

    return (
        <>
            <div className={styles.readyPhoto}>
                <Logo className={styles.logo} />
                <div className={styles.wrap}>
                    <h2 className={styles.title}>Ваша фотография</h2>
                    <p className={clsx(styles.text, 'text')}>Выберите, что хотите сделать с готовым снимком</p>
                    <div
                        className={styles.actions}
                        style={{ pointerEvents: loadingState === 'generate' ? 'none' : 'initial' }}
                    >
                        <Button onClick={handleToggleFrame}>
                            {photo.decorative ? 'Убрать рамку' : 'Добавить рамку'}
                        </Button>
                        <Button onClick={handleGeneratePhoto}>Обработать с помощью ии</Button>
                        <Button onClick={handlePrint}>Напечатать фото</Button>
                        <Button onClick={handleEmail}>Отправить на почту</Button>
                    </div>
                    <div className={styles.buttons}>
                        <Button variant={'outline'} theme={'light'} onClick={() => navigate('/create-photo')}>
                            Попробовать снова
                        </Button>
                        <Button variant={'outline'} theme={'light'} onClick={() => navigate('/')}>
                            Вернуться на главную
                        </Button>
                    </div>
                </div>
                <Photo
                    src={`${API_URL}/${photo.currentImage}`}
                    className={styles.photo}
                    isLoading={loadingState === 'generate'}
                />
            </div>
            <AlertModal
                isOpen={modalState === 'generate-error'}
                onClose={closeModal}
                title={'Произошла ошибка'}
                subtitle={
                    'К сожалению, сейчас программа не может обработать ваш снимок, вернитесь назад и попробуйте другую опцию'
                }
                actions={<Button onClick={closeModal}>назад</Button>}
                isError
            />
            <Loader
                isLoading={loadingState === 'print'}
                title={'Идет печать'}
                subtitle={'Пожалуйста, подождите, пока мы\nнапечатаем ваш снимок'}
            />
            <AlertModal
                isOpen={modalState === 'print-error' || modalState === 'print-success'}
                onClose={closeModal}
                title={modalState === 'print-error' ? 'не удалось\nнапечатать фото' : 'Заберите ваш снимок'}
                subtitle={
                    modalState === 'print-error'
                        ? 'К сожалению на данный момент функция недоступна. Вы можете получить электронную версию фотографии'
                        : 'Спасибо, что воспользовались нашим терминалом. Вы также можете получить электронную версию фотографии'
                }
                actions={
                    modalState === 'print-error' ? (
                        <>
                            <Button variant={'outline'} theme={'dark'} onClick={closeModal}>
                                назад
                            </Button>
                            <Button onClick={handleEmail}>отправить на почту</Button>
                        </>
                    ) : (
                        <>
                            <Button variant={'outline'} theme={'dark'} onClick={() => navigate('/')}>
                                на главную
                            </Button>
                            <Button onClick={handleEmail}>отправить на почту</Button>
                        </>
                    )
                }
                isError={modalState === 'print-error'}
            />
            <EmailModal
                isOpen={modalState === 'email'}
                onClose={closeModal}
                onPrint={() => {
                    setModalState('none');
                    handlePrint();
                }}
                origin={photo.origin}
                decorative={photo.decorative}
            />
        </>
    );
};
