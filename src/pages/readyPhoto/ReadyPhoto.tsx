import clsx from 'clsx';
import { useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { generationDecorate } from '@/shared/api';
import { fetchGenerationFile, generationFile } from '@/shared/api/queries.ts';
import Logo from '@/shared/assets/logo.svg?react';
import { API_URL } from '@/shared/consts';
import { AlertModal, Button, Photo } from '@/shared/ui';
import { Loader } from '@/shared/ui/Loader';

import { EmailModal } from './components';
import styles from './ReadyPhoto.module.scss';

export const ReadyPhoto = () => {
    const [modalState, setModalState] = useState<'none' | 'email'>('none');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const state = location.state as { hash: string; original_image: string };
    const [currentImage, setCurrentImage] = useState<{ image: string; origin: boolean; decorative: boolean }>({
        image: state.original_image,
        origin: true,
        decorative: false,
    });
    const intervalRef = useRef<any>(null);
    const [isGenerateError, setIsGenerateError] = useState(false);
    const [showLoaderPrint, setShowLoaderPrint] = useState(false);
    const [prevImage, setPrevImage] = useState<string | undefined>(undefined);
    const [printState, setPrintState] = useState<'none' | 'success' | 'error'>('none');

    const handleAddFrame = async () => {
        if (currentImage.decorative) {
            return setCurrentImage({
                image: prevImage ?? '',
                origin: currentImage.origin,
                decorative: false,
            });
        }

        try {
            setIsLoading(true);
            const { generated_image } = await generationDecorate({ origin: currentImage.origin });
            setPrevImage(currentImage.image);
            setCurrentImage({
                image: generated_image,
                origin: currentImage.origin,
                decorative: true,
            });
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchFile = () => {
        fetchGenerationFile().then((data) => {
            if (data.status === 'ready') {
                setCurrentImage({
                    image: data.generated_image,
                    origin: false,
                    decorative: false,
                });
                setIsLoading(false);
                if (intervalRef.current) clearInterval(intervalRef.current);
            }
            if (data.status === 'error') {
                setIsGenerateError(true);
                setIsLoading(false);
            }
        });
    };

    const handleAI = async () => {
        try {
            setIsLoading(true);
            await generationFile();
            intervalRef.current = setInterval(fetchFile, 1000);
        } catch (error) {
            console.error(error);
            setIsGenerateError(true);
            setIsLoading(false);
        }
    };

    const handlePrint = async () => {
        try {
            setShowLoaderPrint(true);
        } catch (error) {
            console.error(error);
            setPrintState('error');
        } finally {
            // setShowLoaderPrint(false);
        }
    };

    const handleEmail = () => {
        setModalState('email');
    };

    return (
        <>
            <div className={styles.readyPhoto}>
                <Logo className={styles.logo} />
                <div className={styles.wrap}>
                    <h2 className={styles.title}>Ваша фотография</h2>
                    <p className={clsx(styles.text, 'text')}>Выберите, что хотите сделать с готовым снимком</p>
                    <div className={styles.actions} style={{ pointerEvents: isLoading ? 'none' : 'initial' }}>
                        <Button onClick={handleAddFrame}>
                            {currentImage.decorative ? 'Убрать рамку' : 'Добавить рамку'}
                        </Button>
                        <Button onClick={handleAI}>Обработать с помощью ии</Button>
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
                    key={`${API_URL}/${currentImage.image}`}
                    src={`${API_URL}/${currentImage.image}`}
                    className={styles.photo}
                    isLoading={isLoading}
                />
            </div>
            <EmailModal
                isOpen={modalState === 'email'}
                onClose={() => setModalState('none')}
                onPrint={handlePrint}
                origin={currentImage.origin}
                decorative={currentImage.decorative}
            />
            <Loader
                isLoading={showLoaderPrint}
                title={'Идет печать'}
                subtitle={'Пожалуйста, подождите, пока мы напечатаем ваш снимок'}
            />
            <AlertModal
                isOpen={isGenerateError}
                title={'Произошла ошибка'}
                subtitle={
                    'К сожалению, сейчас программа не может обработать ваш снимок, вернитесь назад и попробуйте другую опцию'
                }
                isError
                actions={<Button onClick={() => setIsGenerateError(false)}>назад</Button>}
            />
            <AlertModal
                isOpen={printState !== 'none'}
                title={printState === 'error' ? 'не удалось напечатать фото' : 'Заберите ваш снимок'}
                subtitle={
                    printState === 'error'
                        ? 'К сожалению на данный момент функция недоступна. Вы можете получить электронную версию фотографии'
                        : 'Спасибо, что воспользовались нашим терминалом. Вы также можете получить электронную версию фотографии'
                }
                isError={printState === 'error'}
                actions={
                    printState === 'error' ? (
                        <>
                            <Button variant={'outline'} theme={'dark'} onClick={() => setPrintState('none')}>
                                назад
                            </Button>
                            <Button
                                onClick={() => {
                                    setPrintState('none');
                                    setModalState('email');
                                }}
                            >
                                отправить на почту
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button variant={'outline'} theme={'dark'} onClick={() => navigate('/')}>
                                на главную
                            </Button>
                            <Button
                                onClick={() => {
                                    setPrintState('none');
                                    setModalState('email');
                                }}
                            >
                                отправить на почту
                            </Button>
                        </>
                    )
                }
            />
        </>
    );
};
