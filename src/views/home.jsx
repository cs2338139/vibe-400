import { gsap } from "gsap";
import { useEffect, useRef, useState } from "react";
import NavBar from "../components/NavBar";

export default function Home({ isStart }) {
  const [isPageStart, setIsPageStart] = useState(false);

  useEffect(() => {
    if (isStart) {
      setIsPageStart(true);
    }
  }, [isStart]);

  function scrollTo(value) {
    let target = "";
    return;

    switch (value) {
      case "about":
        target = "#about";
        break;
      case "story":
        target = "#story";
        break;
      case "gallery":
        target = "#gallery";
        break;
      case "contact":
        target = "#contact";
        break;
    }

    gsap.to(window, { duration: 0.6, scrollTo: target });
  }

  return (
    <div className="">
      <NavBar isStart={isPageStart} className="fixed z-[40]" scrollTo={scrollTo} />
    </div>
  );
}
