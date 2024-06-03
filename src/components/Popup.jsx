import { gsap } from 'gsap';
import { useEffect, useRef, useContext } from 'react';
import { BaseUrlContext } from '../context/BaseUrlContext';
import PropTypes from 'prop-types';

Popup.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  popupClose: PropTypes.func.isRequired,
  className: PropTypes.string
};

export default function Popup({ isOpen, popupClose, className }) {
  const baseUrl = useContext(BaseUrlContext);
  const main = useRef();
  const panel = useRef();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflowY = 'hidden';
      main.current.style.display = 'flex';

      popupMoveUp();
    } else {
      document.body.style.overflowY = 'scroll';
      main.current.style.display = 'none';
    }
  }, [isOpen]);

  function popupMoveUp() {
    gsap.fromTo(panel.current, { y: '20%' }, { y: 0, duration: 0.5 });
  }
  return (
    <div
      ref={main}
      className={`flex h-screen w-screen items-center justify-center bg-black/50 ${className}`}>
      <div
        ref={panel}
        className="border-custom-Primary-0 relative flex h-4/5 w-4/5 max-w-xl flex-col justify-center gap-2 border bg-black p-20 sm:w-[90%] sm:p-8">
        <button
          onClick={() => {
            popupClose();
          }}
          className="border-custom-Primary-0 bg-custom-Primary-0 group absolute right-0 top-0 m-6 flex aspect-square w-16 items-center justify-center rounded-full border transition duration-300 2xl:w-12 sm:m-3 sm:w-10">
          <div className="h-full w-full rounded-full bg-white transition duration-300 group-hover:scale-0"></div>
          <div className="absolute transition duration-300 group-hover:scale-150">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <line
                x1="0"
                y1="0"
                x2="20"
                y2="20"
                stroke="black"
                strokeWidth="2"
              />
              <line
                x1="0"
                y1="20"
                x2="20"
                y2="0"
                stroke="black"
                strokeWidth="2"
              />
            </svg>
          </div>
        </button>
        <div className="p-10 sm:p-0">
          <img src={`${baseUrl}/img/film.png`} alt="" />
        </div>
        <div className="h-3/5 w-full overflow-auto">
          <div className="text-justify text-white sm:leading-5">
            VIBE Photo 400 is a color negative film. The film is sold under the
            “VIBE Photo” brand. However, the film is manufactured by a different
            company. Japan is indicated as the country of manufacture. This
            naturally points to Fujifilm as the producer. The VIBE 400 is
            designed for color images. The manufacturer specifies the
            sensitivity with ISO 400. Due to this sensitivity, the film is
            versatile and therefore makes a good figure in everyday life.
          </div>
        </div>
      </div>
    </div>
  );
}
