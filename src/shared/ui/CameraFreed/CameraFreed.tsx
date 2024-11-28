import { FC, useEffect, useRef } from 'react';

interface ICameraFreedProps {
    className?: string;
}

export const CameraFeed: FC<ICameraFreedProps> = ({ className }) => {
    const videoRef = useRef<HTMLVideoElement | null>(null);

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
            <video ref={videoRef} autoPlay playsInline muted />
        </div>
    );
};
