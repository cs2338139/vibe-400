import { useRef, useEffect, useContext } from 'react';
import { gsap } from 'gsap';
import { BaseUrlContext } from '../context/BaseUrlContext';

export default function KV({ id, isStart, popupOpen }) {
  const baseUrl = useContext(BaseUrlContext);
  const movie = useRef();
  const title_1 = useRef();
  const title_2 = useRef();

  useEffect(() => {
    animationSetting();
  }, []);

  useEffect(() => {
    if (isStart) {
      startAnimation();
    }
  }, [isStart]);

  function animationSetting() {
    gsap.fromTo(
      movie.current,
      { x: -200 },
      {
        x: 0,
        scrollTrigger: {
          trigger: movie.current,
          start: 'top bottom',
          end: 'bottom center',
          scrub: 1
        }
      }
    );
  }

  function startAnimation() {
    gsap.fromTo(
      title_1.current,
      { y: '100%', opacity: 0 },
      { opacity: 1, y: 0, duration: 0.6 }
    );
    gsap.fromTo(
      title_2.current,
      { y: '100%', opacity: 0 },
      { opacity: 1, y: 0, duration: 1 }
    );
  }

  return (
    <div
      id={id}
      className="relative z-30 h-[64.3125rem] w-full bg-black sm:h-[45.9375rem]">
      <div className="center absolute left-1/2 top-[6.5rem] z-0 aspect-[746/519] w-[46.625rem] -translate-x-1/2 overflow-hidden">
        <img
          src={`${baseUrl}/img/elvira-blumfelde-aqui3_h6LLM-unsplash.jpg`}
          className="absolute -top-52 left-0 scale-[1.2]"
        />
      </div>
      <div className="absolute right-[6%] top-0 -z-20 aspect-[503/417] w-[31.4375rem] overflow-hidden">
        <img
          src={`${baseUrl}/img/elvira-blumfelde-aqui3_h6LLM-unsplash.jpg`}
          className="absolute -top-60 left-0 scale-[2]"
        />
      </div>

      <div
        ref={title_1}
        className="text-display-1 absolute -left-10 top-0 -z-10 w-[99.625rem] whitespace-nowrap text-pr-1 sm:hidden">
        VIBE--Format
      </div>
      <div
        ref={title_2}
        className="text-display-1 absolute -left-10 top-[17rem] z-0 text-pr-1 sm:hidden">
        400
      </div>

      <div className="text-display-1 absolute left-7 top-0 z-10 hidden w-[19.5rem] text-pr-1 sm:block">
        VIBE -400 2023
      </div>

      <div
        ref={movie}
        className="text-display-1 absolute -right-28 top-[40rem] z-10 text-pr-1 sm:-right-12 sm:top-[27.4rem]">
        Film
      </div>

      <div className="sm:center absolute left-20 top-[43.25rem] flex w-[29.625rem] flex-col gap-10 sm:top-[12.5rem] sm:w-[19.5rem] sm:gap-8">
        <div className="text-body-2 text-sec-3">
          VIBE Photo 400 is a color negative film. The film is sold under the
          “VIBE Photo” brand. However, the film is manufactured by a different
          company. Japan is indicated as the country of manufacture. This
          naturally points to Fujifilm as the producer.
        </div>
        <button
          className="group flex items-center justify-between gap-6 self-end transition duration-300 sm:gap-3 sm:self-start"
          onClick={() => {
            popupOpen();
          }}>
          <div className="border-custom-Secondary-2 bg-custom-GrayScale-0 flex h-16 w-16 items-center justify-center rounded-full border transition duration-300 group-hover:bg-pr-2 sm:h-12 sm:w-12">
            <img className="w-[1.125rem]" src="/src/assets/UI/arrow.svg" />
          </div>
          <div className="h-20 overflow-hidden">
            <div className="py-2 transition duration-300 group-hover:-translate-y-[4.5rem]">
              <div className="text-head-1 text-sec-3">View All</div>
              <div className="text-head-1 text-sec-3">View All</div>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}
