import React, { useEffect, useRef } from 'react';

interface AutoplayHoverPauseVideoProps {
  src: string;
  className?: string;
}

export const AutoplayHoverPauseVideo: React.FC<AutoplayHoverPauseVideoProps> = ({ src, className }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const isIntersectingRef = useRef(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isIntersectingRef.current = entry.isIntersecting;
        if (entry.isIntersecting) {
          video.play().catch((err) => console.log('Autoplay blocked or paused:', err));
        } else {
          video.pause();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(video);

    return () => {
      observer.disconnect();
    };
  }, [src]);

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current && isIntersectingRef.current) {
      videoRef.current.play().catch((err) => console.log('Play blocked on mouse leave:', err));
    }
  };

  return (
    <video
      ref={videoRef}
      src={src}
      className={className}
      loop
      muted
      playsInline
      controls={false}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    />
  );
};
