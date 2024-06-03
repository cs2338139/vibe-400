import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import KV from '../components/KV';
import Popup from '../components/Popup';
import Story from '../components/Story';
import Card from '../components/Card';
import Banner from '../components/Banner';
import Gallery from '../components/Gallery';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import PropTypes from 'prop-types';

Home.propTypes = {
  isStart: PropTypes.bool.isRequired
};

export default function Home({ isStart }) {
  const [isPageStart, setIsPageStart] = useState(false);
  const [popupState, setPopupState] = useState(false);

  useEffect(() => {
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
    let target = null;

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

    if (!target) return;

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
        <Story id="story" className="-z-10" />
        <Card className="z-10" />
        <Banner />
        <Gallery id="gallery" className="mt-[-2px]" />
        <Contact id="contact" />
        <Footer />
      </div>
    </div>
  );
}
