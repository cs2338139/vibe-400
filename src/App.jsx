import { useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { EaselPlugin } from "gsap/EaselPlugin";
import { Flip } from "gsap/Flip";
import { Observer } from "gsap/Observer";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import Loading from "./views/Loading";
import Home from "./views/Home";
import { useEffect } from "react";

gsap.registerPlugin(Flip, ScrollTrigger, Observer, ScrollToPlugin, MotionPathPlugin, EaselPlugin);
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, EaselPlugin);

function App() {
  const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   console.log(isLoading);
  // }, [isLoading]);

  return (
    <>
      {isLoading ? (
        <Loading
          className="fixed z-50 top-0 left-0"
          isLoadEnd={() => {
            setIsLoading(false);
          }}
        />
      ) : null}
      <Home isStart={!isLoading} />
    </>
  );
}

export default App;
