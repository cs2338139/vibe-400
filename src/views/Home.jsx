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

  // Refresh ScrollTrigger after initial render
  useEffect(() => {
    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 2);

    return () => clearTimeout(refreshTimer);
  }, []);

  // Handle page start state
  useEffect(() => {
    if (isStart) {
      setIsPageStart(true);
    }
  }, [isStart]);

  // Scroll to section handler
  const scrollTo = (section) => {
    const sectionMap = {
      about: '#about',
      story: '#story',
      gallery: '#gallery',
      contact: '#contact'
    };

    const target = sectionMap[section];
    if (!target) return;

    gsap.to(window, {
      duration: 0.6,
      scrollTo: target,
      ease: 'power2.inOut'
    });
  };

  return (
    <div className="relative">
      <NavBar
        isStart={isPageStart}
        className="fixed z-[40]"
        scrollTo={scrollTo}
      />
      <Popup
        popupClose={() => setPopupState(false)}
        isOpen={popupState}
        className="fixed z-50 hidden"
      />
      <div className="min-h-screen overflow-hidden pt-32 sm:pt-20">
        <KV
          id="about"
          isStart={isPageStart}
          popupOpen={() => setPopupState(true)}
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
