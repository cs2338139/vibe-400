import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

export default function Banner() {
  const bar1 = useRef();
  const bar2 = useRef();

  useEffect(() => {
    // Create reusable animation config
    const createScrollingText = (target, direction, duration) => {
      const startX = direction === 'left' ? '100%' : '-100%';
      const endX = direction === 'left' ? '-100%' : '100%';

      // Animate first copy
      gsap.fromTo(
        target.children[0],
        { x: startX },
        {
          x: endX,
          duration,
          repeat: -1,
          ease: 'none'
        }
      );

      // Animate second copy with offset
      gsap.fromTo(
        target.children[1],
        { x: direction === 'left' ? '0%' : '-200%' },
        {
          x: direction === 'left' ? '-200%' : '0%',
          duration,
          repeat: -1,
          delay: -duration / 2,
          ease: 'none'
        }
      );
    };

    // Apply animations
    createScrollingText(bar1.current, 'left', 50);
    createScrollingText(bar2.current, 'right', 40);

    // Cleanup function
    return () => {
      gsap.killTweensOf([bar1.current?.children, bar2.current?.children]);
    };
  }, []); // Empty dependency array since we only want to run once

  const renderText = (text, divider) => (
    <>
      <span>{text}</span>
      <span className="mx-10">{divider}</span>
    </>
  );

  const topBarContent = () => (
    <>
      {renderText('VIBE-400', '/')}
      {renderText('ORGANIC', '/')}
      {renderText('Film', '/')}
      {renderText('PURESSE', '/')}
      {renderText('ORGANIC', '/')}
      {renderText('TRUE --ROMANCE', '/')}
    </>
  );

  const bottomBarContent = () => (
    <>
      {renderText('ORGA-NIC', '/')}
      {renderText('PURE', '/')}
      {renderText('O RGANIC', '/')}
      {renderText('ORGANIC', '/')}
      {renderText('PUR E', '/')}
      {renderText('JINCHENG', '/')}
    </>
  );

  return (
    <div className="text-display-2 flex h-[21.625rem] w-full flex-col justify-around bg-sec-3 text-sec-2 sm:h-[11.5rem]">
      <div
        className="relative flex h-full min-w-fit items-center whitespace-nowrap"
        ref={bar1}>
        <div>{topBarContent()}</div>
        <div>{topBarContent()}</div>
      </div>

      <hr className="border-[#131313] opacity-10" />

      <div
        className="relative flex h-full min-w-fit items-center whitespace-nowrap"
        ref={bar2}>
        <div>{bottomBarContent()}</div>
        <div>{bottomBarContent()}</div>
      </div>
    </div>
  );
}
