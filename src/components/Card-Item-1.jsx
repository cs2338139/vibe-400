import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import CardButton from './Card-Button';

export default function CardItem1({ className }) {
  const path = useRef();
  const hand = useRef();
  const [isAnimationStart, setIsAnimationStart] = useState(false);
  const text = useRef();

  useEffect(() => {
    gsap.fromTo(
      text.current,
      { y: 300 },
      {
        y: 0,
        scrollTrigger: {
          trigger: hand.current,
          start: 'top 60%',
          end: '+=500',
          scrub: 1
        }
      }
    );
  }, []);

  function animation() {
    if (isAnimationStart) return;
    setIsAnimationStart(true);
    let tl = gsap.timeline({});
    tl.set(path.current, { strokeDasharray: 1900, strokeDashoffset: 0 });

    let ctl_1 = gsap.fromTo(
      path.current,
      { strokeDashoffset: 1900 },
      {
        strokeDashoffset: 0,
        duration: 2,
        ease: 'none'
      }
    );

    let ctl_2 = gsap.to(hand.current, {
      scale: '1.2',
      duration: 0.5
    });

    let ctl_3 = gsap.to(hand.current, {
      rotate: 330,
      duration: 1
    });

    let ctl_4 = gsap.to(hand.current, {
      y: '-80',
      x: '+80',
      duration: 0.6,
      repeat: -1,
      yoyo: true,
      ease: 'none'
    });

    tl.add(ctl_1);
    tl.add(ctl_2);
    tl.add(ctl_3);
    tl.add(ctl_4);
  }

  return (
    <div
      className={`flex h-full w-full items-center justify-center bg-black sm:min-w-[18.5rem] ${className}`}
      onMouseEnter={animation}>
      <div className="flex w-[90%] flex-col items-start sm:w-[80%]">
        <div className="flex w-full items-center justify-center ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="400"
            ref={hand}
            viewBox="0 0 512 512">
            <path
              className="w-[9.0031rem] sm:w-[10.25rem]"
              d="M407.72 224c-3.4 0-14.79.1-18 .3l-64.9 1.7a1.83 1.83 0 01-1.69-.9L193.55 67.56a9 9 0 00-6.66-3.56H160l73 161a2.35 2.35 0 01-2.26 3.35l-121.69 1.8a8.06 8.06 0 01-6.6-3.1l-37-45c-3-3.9-8.62-6-13.51-6H33.08c-1.29 0-1.1 1.21-.75 2.43l19.84 71.42a16.3 16.3 0 010 11.9L32.31 333c-.59 1.95-.52 3 1.77 3H52c8.14 0 9.25-1.06 13.41-6.3l37.7-45.7a8.19 8.19 0 016.6-3.1l120.68 2.7a2.7 2.7 0 012.43 3.74L160 448h26.64a9 9 0 006.65-3.55L323.14 287c.39-.6 2-.9 2.69-.9l63.9 1.7c3.3.2 14.59.3 18 .3C452 288.1 480 275.93 480 256s-27.88-32-72.28-32z"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="10"
              stroke="#288E3E"
              ref={path}
            />
          </svg>
        </div>
        <div className="devs-pink flex w-full grow flex-col gap-4 ">
          <div className="ml-14 w-full overflow-hidden sm:ml-0">
            <div ref={text}>
              <div className="text-head-1 mb-2 text-pr-2">Air-Plane</div>
              <div className="text-body-2 text-pr-2">
                Its plot occurs
                <a
                  href="https://en.wikipedia.org/wiki/Nonlinear_narrative"
                  target="_blank">
                  {' '}
                  out of chronological order.
                </a>
              </div>
            </div>
          </div>
          <CardButton>LEARN MORE</CardButton>
        </div>
      </div>
    </div>
  );
}

// path {
//   stroke-dasharray:1900;
//   stroke-dashoffset: 0;
// }

// .pathAnimation {
//   stroke-dasharray: 0;
// }
