import { gsap } from "gsap";
import { useEffect } from "react";
import { useRef } from "react";

export default function Loading({ isLoadEnd }) {
  const progressBar = useRef(null);

  useEffect(() => {
    init();
    animation();
  }, []);

  function init() {
    document.body.style.overflow = "hidden";
  }

  function animation() {
    gsap.to(progressBar.current, {
      duration: 2,
      width: "100%",
      ease: "none",
      onComplete: () => {
        isLoadEnd();
        document.body.style.overflowY = "scroll";
      },
    });
  }

  return (
    <div className="h-screen w-screen gap-8 flex justify-center flex-col items-center bg-black ">
      <div>
        <div className="text-pr-1 text-[50px] font-PP-Right-Didone font-light">
          VIBE 400
        </div>
        <div className="w-[140px] h-[0.5px] bg-gray-gray">
          <div ref={progressBar} className="w-0 bg-pr-1 h-full"></div>
        </div>
      </div>
    </div>
  );
}
