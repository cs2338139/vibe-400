import { useEffect, useContext, useRef } from 'react';
import { gsap } from 'gsap';
import { BaseUrlContext } from '../context/BaseUrlContext';
import GalleryItem from './Gallery-Item';

export default function Gallery() {
  const baseUrl = useContext(BaseUrlContext);
  const container = useRef(null);
  const q = gsap.utils.selector(container);
  useEffect(() => {
    gsap.fromTo(
      q('#L11'),
      { y: 500, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        scrollTrigger: {
          trigger: q('#L1'),
          start: 'center 60%',
          end: '+=500',
          scrub: 1
        }
      }
    );
    gsap.fromTo(
      q('#L12'),
      { y: 800, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        scrollTrigger: {
          trigger: q('#L1'),
          start: 'center 60%',
          end: '+=800',
          scrub: 1
        }
      }
    );
    gsap.fromTo(
      q('#L21'),
      { y: 600, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        scrollTrigger: {
          trigger: q('#L2'),
          start: 'center 60%',
          end: '+=400',
          scrub: 1
        }
      }
    );
    gsap.fromTo(
      q('#L22'),
      { y: 700, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        scrollTrigger: {
          trigger: q('#L2'),
          start: 'center 60%',
          end: '+=600',
          scrub: 1
        }
      }
    );
    gsap.fromTo(
      q('#L23'),
      { y: 800, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        scrollTrigger: {
          trigger: q('#L2'),
          start: 'center 60%',
          end: '+=800',
          scrub: 1
        }
      }
    );
    gsap.fromTo(
      q('#L31'),
      { y: 800, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        scrollTrigger: {
          trigger: q('#L3'),
          start: 'center 60%',
          end: '+=800',
          scrub: 1
        }
      }
    );
    gsap.fromTo(
      q('#L32'),
      { y: 500, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        scrollTrigger: {
          trigger: q('#L3'),
          start: 'center 60%',
          end: '+=700',
          scrub: 1
        }
      }
    );
    gsap.fromTo(
      q('#L41'),
      { y: 500, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        scrollTrigger: {
          trigger: q('#L4'),
          start: 'center 60%',
          end: '+=500',
          scrub: 1
        }
      }
    );
  }, []);

  return (
    <div ref={container} className="w-full px-14 py-24 sm:px-4">
      <div className="grid h-full w-full grid-flow-dense gap-3 sm:flex sm:flex-col">
        <button className="text-display-1 col-start-1 col-end-13 row-start-3 -mt-10 mb-10 place-self-center text-center text-sec-3 transition duration-300 hover:scale-110">
          Gallery
        </button>

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
          className="col-start-4 col-end-10 w-[41.1875rem] place-self-end sm:place-self-start"
          img={`${baseUrl}/img/girl-with-red-hat-9X15n493yN4-unsplash.jpg`}>
          1997 Christopher Fairbank
        </GalleryItem>
        <GalleryItem
          id="L12"
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
          className="col-start-1 col-end-5 row-start-4 row-end-[12] w-[27.0625rem] place-self-start"
          img={`${baseUrl}/img/yasin-aribuga-57WvjU4wxMI-unsplash.jpg`}>
          1997 Christopher Fairbank
        </GalleryItem>
        <GalleryItem
          id="L22"
          className="col-start-7 col-end-10 row-start-6 row-end-[12] w-[17.625rem] place-self-end sm:place-self-start"
          img={`${baseUrl}/img/annie-spratt-8aTdXGeFw0E-unsplash.jpg`}>
          1997 Christopher Fairbank
        </GalleryItem>
        <GalleryItem
          id="L23"
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
          className="col-start-4 col-end-7 row-start-[19] w-[21.875rem] place-self-end sm:place-self-start"
          img={`${baseUrl}/img/isi-parente-uNWNFSgUa1c-unsplash.jpg`}>
          1997 Christopher Fairbank
        </GalleryItem>
        <GalleryItem
          id="L32"
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
          className="col-start-4 col-end-13 row-start-[27] w-[63.3125rem]"
          img={`${baseUrl}/img/elvira-blumfelde-aqui3_h6LLM-unsplash.jpg`}>
          1997 Christopher Fairbank
        </GalleryItem>
      </div>
    </div>
  );
}
