import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef, useState } from 'react';
import NavBar from '../components/NavBar';
import KV from '../components/KV';
import Popup from '../components/Popup';
import Story from '../components/Story';
import Card from '../components/Card';
import Banner from '../components/Banner';
import Gallery from '../components/Gallery';
import Contact from '../components/Contact';

export default function Home({ isStart }) {
  const [isPageStart, setIsPageStart] = useState(false);
  const [popupState, setPopupState] = useState(false);

  useEffect(() => {
    console.log('Home component rendered');

    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 2);
  }, []);

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
      <Popup
        popupClose={() => {
          setPopupState(false);
        }}
        isOpen={popupState}
        className="fixed z-50 hidden"
      />
      <div className="min-h-screen overflow-hidden pt-32 sm:pt-20">
        <KV
          id="about"
          isStart={isPageStart}
          popupOpen={() => {
            setPopupState(true);
          }}
        />
        <Story id="story" class="-z-10"></Story>
        <Card></Card>
        <Banner></Banner>
        <Gallery id="gallery" class="mt-[-2px]"></Gallery>
        <Contact id="contact"></Contact>
        {/* <Footer></Footer>  */}
      </div>
    </div>
  );
}
