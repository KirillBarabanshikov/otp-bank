import { useMutation } from '@tanstack/react-query';
import clsx from 'clsx';
import { FC, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { sendEmail } from '@/shared/api';
import { AlertModal, Button, Input, Keyboard, Modal } from '@/shared/ui';

import styles from './EmailModal.module.scss';

interface IEmailModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const EmailModal: FC<IEmailModalProps> = ({ isOpen, onClose }) => {
    const [showAlert, setShowAlert] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    const { mutateAsync: send, isError } = useMutation({
        mutationFn: sendEmail,
    });

    const handleSubmit = async () => {
        const input = inputRef.current;
        if (!input) return;
        const email = input.value.trim();
        if (!email) return;

        try {
            await send({ hash: '', address: email, origin: false, decorative: false });
        } catch (error) {
            console.error(error);
        } finally {
            setShowAlert(true);
        }
    };

    const handleClose = () => {
        onClose();
        setShowAlert(false);
    };

    return (
        <>
            <Modal isOpen={isOpen && !showAlert} onClose={handleClose}>
                <div className={styles.modalBody}>
                    <h3 className={styles.title}>введите ваш e-mail</h3>
                    <Input placeholder={'E-mail'} className={styles.input} ref={inputRef} />
                    <Keyboard inputRef={inputRef} onEnter={handleSubmit} className={styles.keyboard} />
                    <p className={clsx(styles.subtitle, 'subtitle')}>
                        Нажимая продолжить вы даете Согласие на обработку персональных данных
                    </p>
                    <div className={styles.buttons}>
                        <Button variant={'outline'} theme={'dark'} onClick={onClose}>
                            назад
                        </Button>
                        <Button onClick={handleSubmit}>отправить</Button>
                    </div>
                </div>
            </Modal>
            <AlertModal
                isOpen={showAlert}
                onClose={handleClose}
                title={isError ? 'не удалось отправить снимок' : 'фото успешно отправлено'}
                subtitle={
                    isError
                        ? 'Проверьте введенный адрес электронной почты и попробуйте еще раз'
                        : 'Спасибо, что воспользовались нашим терминалом. Вы также можете распечатать фотографию на память'
                }
                actions={
                    isError ? (
                        <Button onClick={() => setShowAlert(false)}>назад</Button>
                    ) : (
                        <>
                            <Button variant={'outline'} theme={'dark'} onClick={() => navigate('/')}>
                                на главную
                            </Button>
                            <Button>напечатать фото</Button>
                        </>
                    )
                }
                isError={isError}
            />
        </>
    );
};
