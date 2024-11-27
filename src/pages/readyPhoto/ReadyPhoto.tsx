import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';

import Logo from '@/shared/assets/logo.svg?react';
import { Button } from '@/shared/ui';

import styles from './ReadyPhoto.module.scss';

export const ReadyPhoto = () => {
    const navigate = useNavigate();

    return (
        <div className={styles.readyPhoto}>
            <Logo className={styles.logo} />
            <div className={styles.wrap}>
                <h2 className={styles.title}>Ваша фотография</h2>
                <p className={clsx(styles.text, 'text')}>Выберите, что хотите сделать с готовым снимком</p>
                <div className={styles.actions}>
                    <Button>Добавить рамку</Button>
                    <Button>Обработать с помощью ии</Button>
                    <Button>Напечатать фото</Button>
                    <Button>Отправить на почту</Button>
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

            <img src={'/test.png'} alt={'photo'} className={styles.photo} />
        </div>
    );
};
