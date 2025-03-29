import { useEffect, useContext, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BaseUrlContext } from '../context/BaseUrlContext';
import GalleryItem from './Gallery-Item';
import PropTypes from 'prop-types';
import GalleryCanvas from './GalleryCanvas';

Gallery.propTypes = {
  id: PropTypes.string.isRequired
};

export default function Gallery({ id }) {
  const baseUrl = useContext(BaseUrlContext);
  const container = useRef(null);
  const scrollTrigger = useRef();
  const q = gsap.utils.selector(container);

  useEffect(() => {
    animation();
    return () => {
      scrollTrigger.current?.kill();
    };
  }, []);

  function animation() {
    const panelAnimation = gsap.timeline({ paused: true });

    panelAnimation
      .to(q('#panel'), {
        y: '-100%',
        duration: 8
      })
      .to(q('#gallery-logo'), {
        duration: 0.7
      });

    scrollTrigger.current = ScrollTrigger.create({
      animation: panelAnimation,
      trigger: container.current,
      start: 'top top',
      end: '+=3500',
      pin: true,
      scrub: 1
    });
  }

  return (
    <div
      ref={container}
      id={id}
      className="relative flex h-screen w-full flex-col items-center justify-center">
      <GalleryCanvas />
      <div
        id="panel"
        className="absolute  left-0 top-[100vh] w-full px-14 py-24 sm:px-4">
        <div className="grid w-full grid-flow-dense gap-3 sm:flex sm:flex-col">
          <div className="text-head-3 col-start-2 col-end-3 place-self-start text-sec-3">
            <div>SUMMER</div>
            <div>COLLECTION</div>
          </div>

          <div
            id="L1"
            className="text-head-3 col-start-9 col-end-10 mb-5 place-self-end text-sec-3 sm:mt-5 sm:place-self-start">
            SECTION 01
          </div>
          <GalleryItem
            id="L11"
            imageClass="w-full h-[32.5625rem]"
            className="col-start-4 col-end-10 w-[41.1875rem] place-self-end sm:place-self-start"
            img={`${baseUrl}/img/girl-with-red-hat-9X15n493yN4-unsplash.jpg`}>
            1997 Christopher Fairbank
          </GalleryItem>
          <GalleryItem
            id="L12"
            imageClass="w-full h-[21.9375rem]"
            className="col-start-10 col-end-13 row-start-2 w-[20.6875rem] place-self-end sm:w-auto sm:place-self-start"
            img={`${baseUrl}/img/girl-with-red-hat-g4U0-PtFtx4-unsplash.jpg`}>
            1997 Christopher Fairbank
          </GalleryItem>

          <div
            id="L2"
            className="text-head-3 col-start-9 col-end-10 row-start-5 mb-5 place-self-end text-sec-3 sm:mt-5 sm:place-self-start">
            SECTION 02
          </div>
          <GalleryItem
            id="L21"
            imageClass="w-full h-[36.8125rem]"
            className="col-start-1 col-end-5 row-start-4 row-end-[12] w-[27.0625rem] place-self-start"
            img={`${baseUrl}/img/yasin-aribuga-57WvjU4wxMI-unsplash.jpg`}>
            1997 Christopher Fairbank
          </GalleryItem>
          <GalleryItem
            id="L22"
            imageClass="w-full h-[23.75rem]"
            className="col-start-7 col-end-10 row-start-6 row-end-[12] w-[17.625rem] place-self-end sm:place-self-start"
            img={`${baseUrl}/img/annie-spratt-8aTdXGeFw0E-unsplash.jpg`}>
            1997 Christopher Fairbank
          </GalleryItem>
          <GalleryItem
            id="L23"
            imageClass="w-full h-[34.0625rem]"
            className="col-start-10 col-end-13 row-start-6 row-end-[15] w-[20.6875rem]"
            img={`${baseUrl}/img/pexels-lanyjade-mondou-14923853.jpg`}>
            1997 Christopher Fairbank
          </GalleryItem>

          <div
            id="L3"
            className="text-head-3 col-start-4 col-end-4 row-start-[18] mb-5 place-self-end text-sec-3 sm:mt-5 sm:place-self-start">
            SECTION 03
          </div>
          <GalleryItem
            id="L31"
            imageClass="w-full h-[17.8125rem]"
            className="col-start-4 col-end-7 row-start-[19] w-[21.875rem] place-self-end sm:place-self-start"
            img={`${baseUrl}/img/isi-parente-uNWNFSgUa1c-unsplash.jpg`}>
            1997 Christopher Fairbank
          </GalleryItem>
          <GalleryItem
            id="L32"
            imageClass="w-full h-[17.5625rem]"
            className="col-start-7 col-end-10 row-start-[19] w-[17.625rem] place-self-stretch"
            img={`${baseUrl}/img/girl-with-red-hat-f9myzOvj8KU-unsplash.jpg`}>
            1997 Christopher Fairbank
          </GalleryItem>

          <div
            id="L4"
            className="text-head-3 col-start-4 col-end-4 row-start-[26] mb-5 text-sec-3 sm:mt-5">
            SECTION 04
          </div>
          <GalleryItem
            id="L41"
            imageClass="w-full h-[36.8125rem]"
            className="col-start-4 col-end-13 row-start-[27] w-[63.3125rem]"
            img={`${baseUrl}/img/elvira-blumfelde-aqui3_h6LLM-unsplash.jpg`}>
            1997 Christopher Fairbank
          </GalleryItem>
        </div>
      </div>
    </div>
  );
}
