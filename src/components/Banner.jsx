import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

export default function Banner() {
  const bar1 = useRef();
  const bar2 = useRef();

  useEffect(() => {
    gsap.fromTo(
      bar1.current.children[0],
      { x: '100%' },
      {
        x: '-100%',
        duration: 50,
        repeat: -1,
        ease: 'none'
      }
    );
    gsap.fromTo(
      bar1.current.children[1],
      { x: '0%' },
      {
        x: '-200%',
        duration: 50,
        repeat: -1,
        delay: -25,
        ease: 'none'
      }
    );
    gsap.fromTo(
      bar2.current.children[0],
      { x: '-100%' },
      {
        x: '100%',
        duration: 40,
        repeat: -1,
        ease: 'none'
      }
    );
    gsap.fromTo(
      bar2.current.children[1],
      { x: '-200%' },
      {
        x: '0%',
        duration: 40,
        repeat: -1,
        delay: -20,
        ease: 'none'
      }
    );
  });

  return (
    <div className="text-display-2 flex h-[21.625rem] w-full flex-col justify-around bg-sec-3 text-sec-2 sm:h-[11.5rem]">
      <div
        className="relative flex h-full min-w-fit items-center whitespace-nowrap"
        ref={bar1}>
        <div>
          <span>VIBE-400</span>
          <span className="mx-10">/</span>
          <span>ORGANIC</span>
          <span className="mx-10">/</span>
          <span>Film</span>
          <span className="mx-10">/</span>
          <span>PURESSE</span>
          <span className="mx-10">/</span>
          <span>ORGANIC</span>
          <span className="mx-10">/</span>
          <span>TRUE --ROMANCE</span>
          <span className="mx-10">/</span>
        </div>
        <div>
          <span>VIBE-400</span>
          <span className="mx-10">/</span>
          <span>ORGANIC</span>
          <span className="mx-10">/</span>
          <span>Film</span>
          <span className="mx-10">/</span>
          <span>PURESSE</span>
          <span className="mx-10">/</span>
          <span>ORGANIC</span>
          <span className="mx-10">/</span>
          <span>TRUE --ROMANCE</span>
          <span className="mx-10">/</span>
        </div>
      </div>
      <hr className="border-[#131313] opacity-10" />

      <div
        className="relative flex h-full min-w-fit items-center whitespace-nowrap"
        ref={bar2}>
        <div>
          <span>ORGA-NIC</span>
          <span className="mx-10">/</span>
          <span>PURE</span>
          <span className="mx-10">/</span>
          <span>O RGANIC</span>
          <span className="mx-10">/</span>
          <span>ORGANIC</span>
          <span className="mx-10">/</span>
          <span>PUR E</span>
          <span className="mx-10">/</span>
          <span>JINCHENG</span>
          <span className="mx-10">/</span>
        </div>
        <div>
          <span>ORGA-NIC</span>
          <span className="mx-10">/</span>
          <span>PURE</span>
          <span className="mx-10">/</span>
          <span>O RGANIC</span>
          <span className="mx-10">/</span>
          <span>ORGANIC</span>
          <span className="mx-10">/</span>
          <span>PUR E</span>
          <span className="mx-10">/</span>
          <span>JINCHENG</span>
          <span className="mx-10">/</span>
        </div>
      </div>
    </div>
  );
}
