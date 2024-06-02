import { useEffect, useState, useRef, useContext } from 'react';
import { BaseUrlContext } from '../context/BaseUrlContext';
import { gsap } from 'gsap/gsap-core';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ThreeJS from './ThreeJS';

export default function Story({ className }) {
  const main = useRef();
  const story1 = useRef();
  const story2 = useRef();

  useEffect(() => {
    animation();
    console.log('Story component rendered');
  }, []);

  function animation() {
    const mm = gsap.matchMedia();

    //breakpoint is 575px
    const tl = gsap.timeline();

    mm.add('(min-width: 575px)', () => {
      gsap.set(main.current, { marginTop: '-15rem', marginBottom: '-15rem' });
      gsap.set(story1.current, { x: -160 });
      gsap.set(story2.current, { x: 160 });
      ScrollTrigger.create({
        trigger: main.current,
        start: 'top 30%',
        // end: 'bottom 60%',
        // scrub: true,
        // markers: true,
        onEnter: () => {
          gsap.to(story1.current, { x: 0, duration: 1 });
          gsap.to(story2.current, { x: 0, duration: 1 });
          gsap.to(main.current, {
            marginTop: '0rem',
            marginBottom: '0rem',
            duration: 0.5
          });
        },
        onLeaveBack: () => {
          gsap.to(story1.current, { x: -160, duration: 1 });
          gsap.to(story2.current, { x: 160, duration: 1 });
          gsap.to(main.current, {
            marginTop: '-15rem',
            marginBottom: '-12rem',
            duration: 0.5
          });
        }
      });
    });

    mm.add('(max-width: 575px)', () => {
      gsap.set(main.current, { marginTop: '-32rem', marginBottom: '-32rem' });
      gsap.set(story1.current, { x: -160 });
      gsap.set(story2.current, { x: 160 });
      ScrollTrigger.create({
        trigger: main.current,
        start: 'center 0%',
        // end: 'bottom 60%',
        // scrub: true,
        // markers: true,
        onEnter: () => {
          gsap.to(story1.current, { x: 0, duration: 1 });
          gsap.to(story2.current, { x: 0, duration: 1 });
          ``;
          gsap.to(main.current, {
            marginTop: '-4.5rem',
            marginBottom: '-4.5rem',
            duration: 1
          });
        },
        onLeaveBack: () => {
          gsap.to(story1.current, { x: -160, duration: 1 });
          gsap.to(story2.current, { x: 160, duration: 1 });
          gsap.to(main.current, {
            marginTop: '-32rem',
            marginBottom: '-32rem',
            duration: 1
          });
        }
      });
    });
  }

  return (
    <div
      ref={main}
      className={`${className} flex h-[26.0625rem] w-full items-center justify-between border-t border-pr-2 bg-sec-1 sm:-my-[4.5rem] sm:h-[60rem] sm:flex-col`}>
      <div
        ref={story1}
        className="text-display-1 -ml-80 -mt-80 text-pr-2 sm:ml-0 sm:mt-0">
        Story
      </div>
      <ThreeJS className="center sm:unCenter absolute z-10 h-[20rem] w-[20rem] overflow-hidden sm:static"></ThreeJS>
      <div className="flex w-[29.625rem] flex-col items-center text-center text-pr-2 sm:w-[19.5rem] ">
        <div className="text-heading-2 mb-8 sm:mb-6">Story</div>
        <div className="text-body-2">
          The film is developed in the C-41 photochemical process. The C-41
          process is performed by most professional laboratories. Most labs
          immediately offer the option to have prints made from the photos. Some
          providers offer as a service on the digitization of the images.
        </div>
      </div>
      <div
        ref={story2}
        className="text-display-1 -mb-32 -mr-80 text-pr-2 sm:mb-10 sm:mr-0">
        Story
      </div>
    </div>
  );
}
