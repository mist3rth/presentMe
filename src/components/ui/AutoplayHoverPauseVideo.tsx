import React, { useEffect, useRef, useState } from 'react';

interface AutoplayHoverPauseVideoProps {
  src: string;
  className?: string;
}

export const AutoplayHoverPauseVideo: React.FC<AutoplayHoverPauseVideoProps> = ({ src, className }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldLoadSrc, setShouldLoadSrc] = useState(false);
  const isIntersectingRef = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isIntersectingRef.current = entry.isIntersecting;

        if (entry.isIntersecting) {
          // 1. Injecter la source uniquement à l'approche du viewport
          if (!shouldLoadSrc) {
            setShouldLoadSrc(true);
          }
          // 2. Lancer la lecture uniquement quand visible
          if (videoRef.current) {
            videoRef.current.play().catch(() => {});
          }
        } else {
          // 3. Stopper la lecture dès qu'il sort de l'écran
          if (videoRef.current) {
            videoRef.current.pause();
          }
        }
      },
      { rootMargin: '200px 0px', threshold: 0.1 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [shouldLoadSrc]);

  return (
    <div 
      ref={containerRef}
      className={`relative overflow-hidden ${className || ''}`}
      style={{
        transform: 'translateZ(0)', // Force l'isolation sur une couche de rendu GPU dédiée
        willChange: 'transform',
      }}
      onMouseEnter={() => videoRef.current?.pause()}
      onMouseLeave={() => {
        if (isIntersectingRef.current) {
          videoRef.current?.play().catch(() => {});
        }
      }}
    >
      <video
        ref={videoRef}
        src={shouldLoadSrc ? src : undefined}
        preload="none"
        loop
        muted
        playsInline
        controls={false}
        className="w-full h-full object-cover"
      />
    </div>
  );
};
