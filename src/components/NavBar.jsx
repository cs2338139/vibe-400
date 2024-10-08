import { gsap } from 'gsap';
import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

NavBar.propTypes = {
  scrollTo: PropTypes.func.isRequired,
  isStart: PropTypes.bool.isRequired,
  className: PropTypes.string
};

export default function NavBar({ scrollTo, isStart, className }) {
  const barMain = useRef(null);
  const mButton = useRef(null);
  const mButtonDiv = useRef(null);
  const [mButtonState, setMButtonState] = useState(false);

  useEffect(() => {
    if (isStart) {
      start();
    }
  }, [isStart]);

  function click(target) {
    scrollTo(target);
  }

  function mButtonAnimation() {
    setMButtonState(!mButtonState);

    if (mButtonState) {
      gsap.to(mButton.current.children[0], {
        duration: 0.5,
        attr: { x1: 0, y1: 12.5, stroke: 'rgb(243,238,229)' }
      });
      gsap.to(mButton.current.children[1], { duration: 0.5, strokeOpacity: 0 });
      gsap.to(mButton.current.children[2], {
        duration: 0.5,
        attr: { x1: 0, y1: 0.5, stroke: 'rgb(243,238,229)' }
      });
      gsap.to(mButtonDiv.current, {
        duration: 0.5,
        backgroundColor: 'rgb(40,142,62)'
      });
    } else {
      gsap.to(mButton.current.children[0], {
        duration: 0.5,
        attr: { x1: 0, y1: 0.5, stroke: 'rgb(0,0,0)' }
      });
      gsap.to(mButton.current.children[1], { duration: 0.5, strokeOpacity: 1 });
      gsap.to(mButton.current.children[2], {
        duration: 0.5,
        attr: { x1: 6, y1: 12.5, stroke: 'rgb(0,0,0)' }
      });
      gsap.to(mButtonDiv.current, {
        duration: 0.5,
        backgroundColor: 'rgb(243,238,229)'
      });
    }
  }

  function start() {
    tl_Main();
  }

  function tl_Main() {
    let tl = gsap.timeline();

    tl.fromTo(
      barMain.current,
      { width: '3.5rem' },
      {
        width: '30%',
        duration: 0.3,
        onStart: () => {
          barMain.current.children[0].style.display = 'none';
        },
        onComplete: () => {
          barMain.current.children[0].style.display = 'flex';
          barMain.current.children[0].style.opacity = '0';
        }
      }
    );
    tl.fromTo(
      barMain.current.children[0],
      { opacity: 0 },
      { opacity: 1, duration: 0.3 }
    );
  }

  return (
    <div
      className={`flex h-24 w-full items-center justify-between pl-10 pr-20 pt-8 sm:h-20 sm:px-7 sm:py-8 ${className}`}>
      <a
        href="/"
        target="_blank"
        className="font-PP-Right-Didone text-[40px] font-light text-sec-3 transition duration-300 hover:text-pr-2 sm:invisible">
        VIBE 400
      </a>
      <div
        ref={barMain}
        className="text-body-2 h-14 max-w-[500px] rounded-full bg-sec-3 text-gray-black sm:hidden">
        <div className="flex h-full w-full items-center justify-between gap-6 px-10">
          <div className="flex grow justify-between">
            <button
              onClick={() => click('about')}
              className="transition duration-300 hover:text-pr-2">
              About
            </button>
            <button
              onClick={() => click('story')}
              className="transition duration-300 hover:text-pr-2">
              Story
            </button>
            <button
              onClick={() => click('gallery')}
              className="transition duration-300 hover:text-pr-2">
              Gallery
            </button>
          </div>
          /
          <button className="group flex gap-1" onClick={() => click('contact')}>
            <svg
              className="w-[1rem] fill-black transition duration-300 group-hover:fill-pr-2"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path d="M18.4809 13.4868L16.8309 11.8368C16.3391 11.3489 15.6752 11.0738 14.9824 11.0709C14.2896 11.0679 13.6234 11.3374 13.1274 11.8211C12.8628 12.0872 12.5136 12.2528 12.1401 12.2894C11.7665 12.3259 11.3919 12.2311 11.0807 12.0213C9.85231 11.2015 8.79706 10.1483 7.97491 8.92157C7.76878 8.60688 7.67742 8.23076 7.71622 7.85658C7.75502 7.4824 7.92161 7.13302 8.18791 6.86732C8.66723 6.37087 8.93318 5.70652 8.92884 5.01645C8.92449 4.32639 8.6502 3.66544 8.16466 3.17507L6.51466 1.52507C6.02067 1.03277 5.3517 0.756348 4.65429 0.756348C3.95688 0.756348 3.2879 1.03277 2.79391 1.52507L2.31916 2.00057C-0.155839 4.47557 0.0294113 9.67907 5.17891 14.8256C8.28391 17.9313 11.4092 19.2318 13.9434 19.2318C14.6894 19.2567 15.4329 19.1328 16.1305 18.8674C16.8282 18.602 17.466 18.2004 18.0069 17.6861L18.4824 17.2106C18.9756 16.7164 19.2525 16.0466 19.2522 15.3484C19.2519 14.6502 18.9745 13.9806 18.4809 13.4868ZM17.4204 16.1501L16.9449 16.6256C14.9949 18.5756 10.6907 18.2193 6.23791 13.7658C1.78516 9.31232 1.42816 5.00507 3.37816 3.05507L3.84991 2.58032C4.06232 2.36868 4.34994 2.24985 4.64979 2.24985C4.94963 2.24985 5.23726 2.36868 5.44966 2.58032L7.09966 4.23032C7.30821 4.43991 7.42658 4.72271 7.42953 5.01836C7.43247 5.31402 7.31975 5.59912 7.11541 5.81282C6.60862 6.32284 6.29249 6.99153 6.21999 7.70687C6.14748 8.42221 6.32301 9.14073 6.71716 9.74207C7.65132 11.14 8.8526 12.3395 10.2519 13.2716C10.8514 13.6658 11.5681 13.8423 12.2821 13.7718C12.9962 13.7012 13.6644 13.3878 14.1752 12.8838C14.3885 12.6771 14.6744 12.5623 14.9714 12.5641C15.2685 12.5659 15.5529 12.6842 15.7637 12.8936L17.4137 14.5436C17.52 14.6484 17.6046 14.7732 17.6625 14.9108C17.7204 15.0484 17.7506 15.1961 17.7512 15.3454C17.7518 15.4947 17.7229 15.6427 17.6662 15.7808C17.6094 15.9189 17.5259 16.0444 17.4204 16.1501Z" />
            </svg>

            <div className="transition duration-300 group-hover:text-pr-2">
              Contact
            </div>
          </button>
        </div>
      </div>
      <button
        className="hidden h-[2.625rem] w-[3rem] rounded-full bg-sec-3 p-[1rem] sm:flex"
        onClick={() => mButtonAnimation}
        ref={mButtonDiv}>
        <svg
          ref={mButton}
          width="16"
          height="13"
          viewBox="0 0 16 13"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <line x1="0" y1="0.5" x2="16" y2="0.5" stroke="black" />
          <line x1="0" y1="6.5" x2="16" y2="6.5" stroke="black" />
          <line x1="6" y1="12.5" x2="16" y2="12.5" stroke="black" />
        </svg>
      </button>
    </div>
  );
}
