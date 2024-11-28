import clsx from 'clsx';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Logo from '@/shared/assets/logo.svg?react';
import { Button, Photo } from '@/shared/ui';
import { Loader } from '@/shared/ui/Loader';

import { EmailModal } from './components';
import styles from './ReadyPhoto.module.scss';

export const ReadyPhoto = () => {
    const [modalState, setModalState] = useState<'none' | 'email'>('none');
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const handleAddFrame = () => {
        setIsLoading(true);
    };

    const handleAI = () => {
        setIsLoading(true);
    };

    const handlePrint = () => {};

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
                        <Button onClick={handleAddFrame}>Добавить рамку</Button>
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
                <Photo src={'/test.png'} className={styles.photo} isLoading={isLoading} />
            </div>
            <EmailModal isOpen={modalState === 'email'} onClose={() => setModalState('none')} />
            <Loader
                isLoading={true}
                title={'Идет печать'}
                subtitle={'Пожалуйста, подождите, пока мы напечатаем ваш снимок'}
            />
        </>
    );
};
