import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { FC } from 'react';

import LoaderIcon from '@/shared/assets/icons/loader.svg?react';

import styles from './Photo.module.scss';

interface IPhotoProps {
    src: string;
    isLoading?: boolean;
    className?: string;
}

export const Photo: FC<IPhotoProps> = ({ src, isLoading, className }) => {
    return (
        <div className={className}>
            <div className={clsx(styles.photoWrap, isLoading && styles.isLoading)}>
                <motion.img
                    key={src}
                    src={src}
                    alt={'photo'}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className={styles.photo}
                />
                <AnimatePresence>
                    {isLoading && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className={styles.loaderWrap}
                        >
                            <motion.div
                                animate={{ rotate: [0, 360] }}
                                transition={{
                                    repeat: Infinity,
                                    repeatType: 'loop',
                                    ease: 'linear',
                                    duration: 1.5,
                                }}
                            >
                                <LoaderIcon />
                            </motion.div>
                            <p className={'text'}>Пожалуйста,подождите...</p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};
