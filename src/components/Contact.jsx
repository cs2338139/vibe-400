import { useRef, useEffect } from 'react';
import { gsap } from 'gsap/gsap-core';

export default function Contact() {
  const mouse = useRef();
  const target = useRef();
  const contact = useRef();

  function OverImg(event) {
    mouse.current.style.display = 'block';

    const bnd = target.current.getBoundingClientRect();

    const localX = event.pageX - bnd.left;
    const localY = event.pageY - bnd.top - window.scrollY;

    let mouseSize = mouse.current.offsetWidth;
    mouse.current.style.left = localX + 'px';
    mouse.current.style.top = localY + mouseSize + 'px';
  }
  function OutImg() {
    mouse.current.style.display = 'none';
  }

  useEffect(() => {
    gsap.fromTo(
      target.current,
      { opacity: 0 },
      {
        opacity: 1,
        scrollTrigger: {
          trigger: target.current,
          start: 'top 60%',
          end: '+=800',
          scrub: 1
          // markers: true,
        }
      }
    );
  }, []);

  return (
    <div className="relative flex w-full flex-col items-center">
      <div className="text-display-1 ml-16 text-sec-3 sm:-ml-10" ref={contact}>
        Contact
      </div>

      <div className="text-head-2 my-14 whitespace-nowrap text-center text-pr-1">
        0975 601 925
      </div>

      <div
        className="mb-10 h-[27.8125rem] w-[82.875rem] bg-contactImg bg-cover bg-no-repeat sm:mr-28 sm:max-h-[17.25rem]"
        onMouseMove={OverImg}
        ref={target}
        onMouseLeave={OutImg}>
        <div
          className="absolute hidden h-[16.5rem] w-[16.5rem] rounded-full backdrop-invert"
          ref={mouse}></div>
      </div>

      <div className="text-display-1 none pointer-events-none absolute left-[-2.375rem] top-[52.5rem] mb-10 text-sec-3 sm:top-[43rem]">
        ME
      </div>
      <div className="text-display-1 pointer-events-none absolute right-[-6.25rem] top-[37.1875rem] text-sec-3 sm:right-[-2.8rem] sm:top-[27rem]">
        CALL
      </div>

      <div className="text-body-2 mb-[7.5rem] w-[29.625rem] text-center text-sec-3 sm:w-[20rem]">
        VIBE Photo 400 is a color negative film. The film is sold under the
        “VIBE Photo” brand. However, the film is manufactured by a different
        company. Japan is indicated as the country of manufacture. This
        naturally points to Fujifilm as the producer. The VIBE 400 is designed
        for color images. The manufacturer specifies the sensitivity with ISO
        400. Due to this sensitivity, the film is versatile and therefore makes
        a good figure in everyday life.
      </div>
    </div>
  );
}
