import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef, useState } from 'react';
import NavBar from '../components/NavBar';
import KV from '../components/KV';

export default function Home({ isStart }) {
  const [isPageStart, setIsPageStart] = useState(false);
  const [popupState, setPopupState] = useState(false);
  const refPopup = useRef();

  useEffect(() => {
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 2);
  }, []);

  // useEffect(() => {
  //   if (popupState) {
  //     document.body.style.overflowY = 'hidden';
  //     refPopup.current.style.display = 'flex';
  //     refPopup.current.popupMoveUp();
  //     console.log(document.body.style.overflowY);
  //   } else {
  //     document.body.style.overflowY = 'scroll';
  //     refPopup.current.style.display = 'none';
  //   }
  // }, [popupState]);

  useEffect(() => {
    if (isStart) {
      setIsPageStart(true);
    }
  }, [isStart]);

  function scrollTo(value) {
    let target = '';
    return;

    switch (value) {
      case 'about':
        target = '#about';
        break;
      case 'story':
        target = '#story';
        break;
      case 'gallery':
        target = '#gallery';
        break;
      case 'contact':
        target = '#contact';
        break;
    }

    gsap.to(window, { duration: 0.6, scrollTo: target });
  }

  return (
    <div className="">
      <NavBar
        isStart={isPageStart}
        className="fixed z-[40]"
        scrollTo={scrollTo}
      />
      {/* <popup @popupClose="popupEnable = false" ref="refPopup" class="fixed z-50 hidden" /> */}
      <div className="min-h-screen overflow-hidden pt-32 sm:pt-20">
        <KV
          id="about"
          isStart={isPageStart}
          popupOpen={() => {
            setPopupState(true);
          }}
        />
        {/* // <Story id="story" class="-z-10"></Story>
        // <Card></Card>
        // <Banner></Banner>
        // <Gallery id="gallery" class="mt-[-2px]"></Gallery>
        // <Contact id="contact"></Contact>
        // <Footer></Footer> */}
      </div>
    </div>
  );
}
