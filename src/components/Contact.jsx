import { useRef, useEffect } from 'react';
import { gsap } from 'gsap/gsap-core';
import PropTypes from 'prop-types';

Contact.propTypes = {
  id: PropTypes.string.isRequired
};
export default function Contact({ id }) {
  const mouse = useRef();
  const target = useRef();
  const contact = useRef();

  function OverImg(event) {
    // mouse.current.style.display = 'block';
    gsap.to(mouse.current, {
      duration: 0.3,
      opacity: 1,
      scale: 1,
      ease: 'power1.out'
    });

    gsap.set(mouse.current, {
      left: event.clientX - gsap.getProperty(mouse.current, 'width') / 2,
      top:
        event.clientY +
        window.scrollY -
        gsap.getProperty(mouse.current, 'height') / 2
    });
  }

  function OutImg() {
    // mouse.current.style.display = 'none';
    gsap.to(mouse.current, {
      duration: 0.3,
      opacity: 0,
      scale: 0,
      ease: 'power1.out'
    });
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
          end: '+=100',
          scrub: 1,
          markers: true
        }
      }
    );
  }, []);

  return (
    <>
      <div id={id} className="relative flex w-full flex-col items-center">
        <div className="text-display-1 mb-[5.5625rem] text-sec-3" ref={contact}>
          Contact
        </div>

        <div
          className="relative mb-[6.6875rem]  flex h-[27.8125rem] w-[82.875rem] cursor-none flex-col items-center justify-center bg-contactImg bg-cover bg-no-repeat sm:mr-28 sm:max-h-[17.25rem]"
          onMouseMove={OverImg}
          ref={target}
          onMouseLeave={OutImg}>
          <div className="absolute my-14 -translate-y-14 whitespace-nowrap text-center font-PP-Right-Didone text-[64px] font-[300] text-pr-1">
            <span>+</span>
            <span>0</span>
            <span>9</span>
            <span>2</span>
            <span> 9</span>
            <span>8</span>
            <span>7</span>
            <span> 0</span>
            <span>0</span>
            <span>9</span>
          </div>
        </div>

        <div className="text-display-1 none pointer-events-none absolute bottom-[-3.625rem] left-[-2.375rem] text-sec-3 sm:top-[43rem]">
          ME
        </div>
        <div className="text-display-1 pointer-events-none absolute right-[-6.25rem] top-[37.1875rem] text-sec-3 sm:right-[-2.8rem] sm:top-[27rem]">
          CALL
        </div>

        <div className="text-body-2 mb-[7.3125rem] w-[29.625rem] text-center text-sec-3 sm:w-[20rem]">
          Sit elit incididunt Lorem minim ea pariatur anim dolor ut veniam amet
          ad. Ipsum tempor commodo ullamco Lorem incididunt proident nisi
          nostrud dolore. Et labore minim laboris esse amet eu eu exercitation
          ea esse velit tempor culpa.
        </div>
      </div>
      <div
        className="no pointer-events-none absolute h-[16.5rem] w-[16.5rem] scale-0 rounded-full opacity-0 backdrop-invert"
        ref={mouse}></div>
    </>
  );
}
