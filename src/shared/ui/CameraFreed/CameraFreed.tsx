import { FC, MutableRefObject, useEffect } from 'react';

interface ICameraFreedProps {
    videoRef: MutableRefObject<HTMLVideoElement | null>;
    className?: string;
}

export const CameraFeed: FC<ICameraFreedProps> = ({ videoRef, className }) => {
    useEffect(() => {
        const startCamera = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: {
                        width: 720,
                        height: 1080,
                        facingMode: 'user',
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
            <video ref={videoRef} autoPlay playsInline muted style={{ transform: 'scaleX(-1)' }} />
        </div>
    );
};
