import { gsap } from 'gsap';
import { useEffect } from 'react';
import { useRef } from 'react';
import PropTypes from 'prop-types';

Loading.propTypes = {
  className: PropTypes.string,
  isLoadEnd: PropTypes.func
};

export default function Loading({ className, isLoadEnd }) {
  const progressBar = useRef(null);

  useEffect(() => {
    init();
    animation();
  }, []);

  function init() {
    document.body.style.overflow = 'hidden';
  }

  function animation() {
    gsap.to(progressBar.current, {
      duration: 2,
      width: '100%',
      ease: 'none',
      onComplete: () => {
        isLoadEnd();
        document.body.style.overflowY = 'scroll';
      }
    });
  }

  return (
    <div
      className={`flex h-screen w-screen flex-col items-center justify-center gap-8 bg-black ${className}`}>
      <div className="">
        <div className="font-PP-Right-Didone text-[50px] font-light text-pr-1">
          VIBE 400
        </div>
        <div className="h-[0.5px] w-full bg-gray-gray">
          <div ref={progressBar} className="h-full w-0 bg-pr-1"></div>
        </div>
      </div>
    </div>
  );
}
