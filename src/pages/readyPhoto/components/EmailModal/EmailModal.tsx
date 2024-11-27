import clsx from 'clsx';
import { FC, useRef } from 'react';

import { Button, Input, Keyboard, Modal } from '@/shared/ui';

import styles from './EmailModal.module.scss';

interface IEmailModalProps {
    isOpen: boolean;
}

export const EmailModal: FC<IEmailModalProps> = ({ isOpen }) => {
    const inputRef = useRef<HTMLInputElement>(null);

    return (
        <Modal isOpen={isOpen}>
            <div className={styles.modalBody}>
                <h3 className={styles.title}>введите ваш e-mail</h3>
                <Input placeholder={'E-mail'} className={styles.input} ref={inputRef} />
                <Keyboard inputRef={inputRef} onEnter={() => {}} className={styles.keyboard} />
                <p className={clsx(styles.subtitle, 'subtitle')}>
                    Нажимая продолжить вы даете Согласие на обработку персональных данных
                </p>
                <div className={styles.buttons}>
                    <Button variant={'outline'} theme={'dark'}>
                        назад
                    </Button>
                    <Button>отправить</Button>
                </div>
            </div>
        </Modal>
    );
};
