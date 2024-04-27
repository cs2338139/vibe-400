import { useState } from 'react'
import { gsap } from "gsap";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { EaselPlugin } from "gsap/EaselPlugin";

import Loading from './views/Loading';

gsap.registerPlugin(ScrollTrigger,ScrollToPlugin,EaselPlugin);


function App() {

  const [isaLoading, setIsaLoading] = useState(false)

  return (
    <>
      <Loading />
    </>
  )
}

export default App
