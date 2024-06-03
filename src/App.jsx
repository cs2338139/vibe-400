import { useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { EaselPlugin } from 'gsap/EaselPlugin';
import { Flip } from 'gsap/Flip';
import { Observer } from 'gsap/Observer';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import Loading from './views/Loading';
import Home from './views/Home';
import { useEffect } from 'react';
import BaseUrlProvider from './context/BaseUrlContext';

gsap.registerPlugin(
  Flip,
  ScrollTrigger,
  Observer,
  ScrollToPlugin,
  MotionPathPlugin,
  EaselPlugin
);
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, EaselPlugin);

function App() {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {}, []);

  return (
    <BaseUrlProvider>
      {isLoading ? (
        <Loading
          className="fixed left-0 top-0 z-50"
          isLoadEnd={() => {
            setIsLoading(false);
          }}
        />
      ) : null}
      <Home isStart={!isLoading} />
    </BaseUrlProvider>
  );
}

export default App;
