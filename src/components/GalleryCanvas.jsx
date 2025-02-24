import { useEffect, useRef } from 'react';
import p5 from 'p5';

export default function GalleryCanvas() {
  const canvasRef = useRef(null);
  const sketchRef = useRef(null);

  useEffect(() => {
    // p5 sketch function
    const sketch = (p) => {
      p.setup = () => {
        const canvas = p.createCanvas(window.innerWidth, window.innerHeight);
        canvas.parent(canvasRef.current);
      };

      p.draw = () => {
        p.background(255);
        // Add your p5 drawing code here
      };

      p.windowResized = () => {
        p.resizeCanvas(window.innerWidth, window.innerHeight);
      };
    };

    // Create new p5 instance
    sketchRef.current = new p5(sketch);

    // Cleanup
    return () => {
      sketchRef.current.remove();
    };
  }, []);

  return (
    //     <button
    //     id="gallery-logo"
    //     className="dev-red text-display-1 col-start-1 col-end-13 row-start-3 -mt-10 mb-10 place-self-center text-center text-pr-1">
    //     Gallery
    //   </button>
    <div
      ref={canvasRef}
      id="gallery-logo"
      className="absolute left-0 top-0 -z-10"
    />
  );
}
