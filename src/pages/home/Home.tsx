import styles from './Home.module.scss';
import { Button } from '@/shared/ui';
import homeImg from '@/shared/assets/images/home.png';
import { useNavigate } from 'react-router-dom';

export const Home = () => {
    const navigate = useNavigate();

    return (
        <div className={styles.home}>
            <div className={styles.wrap}>
                <h1 className={styles.title}>
                    Сделай <span>незабываемые фотографии</span>
                </h1>
                <p className={styles.subtitle}>Обработай снимки в режиме реального времени и сохрани себе</p>
                <Button onClick={() => navigate('/create-photo')} className={styles.button}>
                    Сделать фото
                </Button>
            </div>
            <img className={styles.image} src={homeImg} alt={'home'} />
        </div>
    );
};
