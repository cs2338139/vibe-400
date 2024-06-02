import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import CardButton from './Card-Button';

export default function CardItem4({ className }) {
  const path = useRef();
  const hand = useRef();
  const [isAnimationStart, setIsAnimationStart] = useState(false);
  const text = useRef();

  useEffect(() => {
    gsap.fromTo(
      text.current,
      { y: 300 },
      {
        y: 0,
        scrollTrigger: {
          trigger: hand.current,
          start: 'top 60%',
          end: '+=500',
          scrub: 1
        }
      }
    );
  }, []);

  function animation() {
    if (isAnimationStart) return;
    setIsAnimationStart(true);
    // let tl = gsap.timeline({});
    // tl.set(path.current, { strokeDasharray: 1900, strokeDashoffset: 0 });
    // let ctl_1 = gsap.fromTo(
    //   path.current,
    //   { strokeDashoffset: 1900 },
    //   {
    //     strokeDashoffset: 0,
    //     duration: 2,
    //     ease: 'none'
    //   }
    // );
    // let ctl_2 = gsap.to(hand.current, {
    //   scale: '1.2',
    //   duration: 0.5
    // });
    // let ctl_3 = gsap.to(hand.current, {
    //   rotate: 330,
    //   duration: 1
    // });
    // let ctl_4 = gsap.to(hand.current, {
    //   y: '-80',
    //   x: '+80',
    //   duration: 0.6,
    //   repeat: -1,
    //   yoyo: true,
    //   ease: 'none'
    // });
    // tl.add(ctl_1);
    // tl.add(ctl_2);
    // tl.add(ctl_3);
    // tl.add(ctl_4);
  }

  return (
    <div
      className={`group relative h-full w-full overflow-hidden sm:min-w-[18.5rem] ${className}`}>
      <div className="h-full w-full duration-500 group-hover:-translate-y-full">
        <div className="flex h-full w-full flex-col items-center justify-center pr-10 sm:hidden">
          <button className="flex items-center justify-between gap-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-full border border-black">
              <img
                className="w-[1.125rem]"
                src="/src/assets/UI/arrow-black.svg"
              />
            </div>
            <div className="h-20 overflow-hidden">
              <div className="text-head-1 flex h-20 flex-col items-center justify-center text-black">
                <span>View All</span>
              </div>
            </div>
          </button>
        </div>
        <div
          className="absolute left-0 top-full flex h-full w-full items-center justify-center bg-black py-0 pl-10 sm:top-0  sm:py-[72px]"
          onMouseEnter={animation}>
          <div className="flex h-full w-full flex-row-reverse items-center  justify-center sm:flex-col sm:items-start sm:justify-between">
            <div className="flex w-full flex-col items-center justify-center">
              <svg
                className="w-full scale-[1.3] sm:scale-100"
                width="218"
                height="256"
                viewBox="0 0 218 256"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_334_241)">
                  <path
                    d="M173.738 171.925C182.044 160.425 177.273 147.532 165.78 141.836C167.321 139.761 168.717 137.427 169.894 134.71C175.878 120.91 167.932 108.718 155.628 104.825C169.887 87.9154 162.318 62.6838 147.481 46.8471C147.141 46.4844 146.78 46.1854 146.436 45.8392C151.246 44.4521 155.445 42.5668 160.242 40.3096C163.645 38.7098 167.248 37.3393 171.012 36.9499C175.056 36.5317 177.777 39.278 181.288 40.6486C183.873 41.6565 186.947 38.564 185.95 35.9861C182.84 27.9362 173.693 27.1554 166.198 28.7767C156.884 30.7904 149.855 36.9951 142.518 42.3511C125.458 28.8825 103.36 32.7199 86.5697 44.8795C84.3463 39.3746 78.7633 35.5782 73.4823 33.022C68.7222 30.7175 59.2915 25.9348 54.1667 28.9883C52.0522 30.249 51.3217 33.6261 53.3457 35.3604C56.8082 38.3276 62.5001 38.1704 66.7865 39.5749C72.5627 41.4675 77.5951 44.4511 80.9702 49.4588C63.3539 65.4158 54.256 90.7716 69.2534 112.004C54.3064 110.494 46.8206 126.242 53.9283 140.497C54.4256 141.495 55.0246 142.393 55.6585 143.256C44.5397 144.139 36.7497 158.886 44.4472 169.582C45.6113 171.201 46.9017 172.627 48.2497 173.963C34.0805 175.317 22.003 188.758 30.8389 203.996C43.7783 226.312 76.879 224.926 99.4998 226.467C127.828 228.398 163.932 232.577 183.918 208.037C195.795 193.453 189.832 177.227 173.738 171.925ZM143.297 55.6758C160.786 74.5229 156.314 99.2438 133.131 108.9C115.104 116.407 93.3609 115.514 75.2433 109.066C74.8734 108.935 74.5662 108.964 74.2272 108.914C52.7231 69.7392 110.755 20.6097 143.297 55.6758ZM72.7857 118.443C95.6418 128.029 126.471 125.84 147.299 111.985C161.365 115.82 166.96 126.08 156.736 138.556C147.915 149.32 130.186 146.786 117.958 146.093C109.294 145.603 100.719 145.453 92.0489 145.4C86.6169 145.367 81.338 144.816 75.98 143.865C74.5868 143.501 73.1936 143.138 71.8004 142.774C58.0976 139 58.4551 130.882 72.7857 118.443ZM60.2038 147.66C73.5429 157.245 99.1053 153.976 112.489 154.768C128.702 155.727 146.756 157.273 159.213 148.333C176.917 159.873 161.599 173.947 147.118 178.56C135.748 182.182 121.74 180.508 109.999 180.086C101.963 179.797 94.1171 179.436 86.1227 178.567C74.7655 177.334 34.5675 164.451 60.2038 147.66ZM156.365 215.277C142.758 220.136 125.319 217.813 111.144 217.411C101.475 217.138 91.8558 216.538 82.2041 215.823C76.1228 215.36 70.0784 214.593 64.07 213.523C62.0152 213.071 59.9603 212.617 57.9055 212.164C44.2828 210.109 42.6112 199.372 52.8896 179.95C53.7382 179.902 54.3629 179.581 54.8396 179.151C67.2304 186.779 83.7114 187.626 98.0327 189.123C120.14 191.433 149.186 193.538 167.401 178.468C167.85 178.936 168.393 179.35 169.099 179.64C197.328 191.218 168.015 211.118 156.365 215.277Z"
                    fill="#288E3E"
                  />
                  <path
                    d="M128.479 88.9048C127.103 86.9804 124.186 86.7677 122.417 88.0171C113.337 87.19 104.117 87.4469 95.0224 87.0595C92.5155 86.9527 91.7141 90.2918 93.3323 91.6583C93.2152 91.8196 93.0354 91.8977 92.9552 92.099C83.7526 115.31 127.759 117.26 129.726 96.6053C130.098 95.692 130.454 94.7683 130.712 93.7964C131.184 92.0117 130.261 89.6959 128.479 88.9048Z"
                    fill="#288E3E"
                  />
                  <path
                    d="M100.555 62.5739C100.695 57.3176 92.9293 57.4758 92.4988 62.5739C92.2645 65.65 90.897 68.4744 90.8148 71.6019C90.7501 74.0739 92.3858 75.3418 94.2249 75.5647C94.9965 78.1507 98.7538 77.0884 99.0271 74.6113C99.1185 73.7821 99.1267 72.9047 99.1165 72.0098C99.1411 71.8639 99.2171 71.7571 99.2295 71.6019C99.4617 68.5536 100.474 65.65 100.555 62.5739Z"
                    fill="#288E3E"
                  />
                  <path
                    d="M129.488 68.8372C129.472 66.7474 129.461 64.6535 129.305 62.574C129.516 59.7496 127.319 58.455 125.119 58.5968C122.919 58.455 120.723 59.7496 120.933 62.574C120.778 64.6535 120.767 66.7474 120.75 68.8372C120.718 69.4988 120.716 70.1872 120.729 70.9393C120.698 72.7116 121.576 73.8623 122.747 74.525C123.866 76.3158 126.372 76.3158 127.492 74.525C128.662 73.8623 129.541 72.7116 129.51 70.9393C129.521 70.1862 129.518 69.4988 129.488 68.8372Z"
                    fill="#288E3E"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_334_241">
                    <rect
                      width="200"
                      height="200"
                      fill="white"
                      transform="translate(9 28)"
                    />
                  </clipPath>
                </defs>
              </svg>
            </div>
            <div className="flex w-full flex-col gap-4">
              <div className="w-full overflow-hidden sm:ml-0">
                <div className="flex flex-col gap-2" ref={text}>
                  <div className="text-head-1 mb-2 text-pr-2 sm:hidden">
                    Cinquième
                  </div>
                  <div className="text-head-1 mb-2 hidden text-pr-2 sm:block">
                    Cinquième Élément
                  </div>
                  <div className="text-body-2 hidden text-pr-2 sm:block">
                    Tarantino wrote Pulp Fiction in 1992 and 1993, incorporating
                    scenes that Avary originally wrote for True Romance (1993).
                    Do et reprehenderit exercit reprehendetation excepteur
                    aliqua duis culpa.
                  </div>
                </div>
              </div>
              <div>
                <CardButton>LEARN MORE</CardButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// path {
//   stroke-dasharray:1900;
//   stroke-dashoffset: 0;
// }

// .pathAnimation {
//   stroke-dasharray: 0;
// }
