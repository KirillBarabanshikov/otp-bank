import { FC, MutableRefObject, useEffect } from 'react';
import { DEVICE_ID } from '@/shared/consts';

interface ICameraFreedProps {
    videoRef: MutableRefObject<HTMLVideoElement | null>;
    className?: string;
}

export const CameraFeed: FC<ICameraFreedProps> = ({ videoRef, className }) => {
    useEffect(() => {
        const startCamera = async () => {
            try {
                navigator.mediaDevices.enumerateDevices().then((devices) => console.log(devices));
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: {
                        aspectRatio: 9 / 16,
                        deviceId: DEVICE_ID,
                    },
                });
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
            } catch (error) {
                console.error('Ошибка доступа к камере:', error);
            }
        };

        startCamera();

        return () => {
            if (videoRef.current && videoRef.current.srcObject) {
                const stream = videoRef.current.srcObject as MediaStream;
                stream.getTracks().forEach((track) => track.stop());
            }
        };
    }, []);

    return (
        <div className={className}>
            <video ref={videoRef} autoPlay playsInline muted />
        </div>
    );
};
