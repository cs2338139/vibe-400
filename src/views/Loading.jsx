import { gsap } from 'gsap';
import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

Loading.propTypes = {
  className: PropTypes.string,
  isLoadEnd: PropTypes.func.isRequired
};

export default function Loading({ className = '', isLoadEnd }) {
  const progressBar = useRef(null);
  const loadingContainer = useRef(null);

  useEffect(() => {
    // Prevent scrolling while loading
    document.body.style.overflow = 'hidden';

    // Animate progress bar
    const tl = gsap.timeline({
      onComplete: () => {
        // Fade out loading screen
        gsap.to(loadingContainer.current, {
          opacity: 0,
          duration: 0.5,
          onComplete: () => {
            isLoadEnd();
            document.body.style.overflowY = 'scroll';
          }
        });
      }
    });

    tl.to(progressBar.current, {
      width: '100%',
      duration: 2,
      ease: 'power2.inOut'
    });

    return () => {
      tl.kill();
    };
  }, [isLoadEnd]);

  return (
    <div
      ref={loadingContainer}
      className={`flex h-screen w-screen flex-col items-center justify-center gap-8 bg-black ${className}`}>
      <div className="relative">
        <div className="font-PP-Right-Didone text-[50px] font-light tracking-wider text-pr-1">
          VIBE 400
        </div>
        <div className="h-[2px] w-full bg-gray-gray">
          <div
            ref={progressBar}
            className="h-full w-0 bg-pr-1 transition-all duration-300"
          />
        </div>
      </div>
    </div>
  );
}
