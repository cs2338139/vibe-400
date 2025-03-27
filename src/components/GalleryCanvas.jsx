import { useEffect, useRef, useContext } from 'react';
import p5 from 'p5';
import { BaseUrlContext } from '../context/BaseUrlContext';

export default function GalleryCanvas() {
  const baseUrl = useContext(BaseUrlContext);
  // 用於存儲canvas元素的ref
  const canvasRef = useRef(null);
  // 用於存儲p5實例的ref
  const sketchRef = useRef(null);

  useEffect(() => {
    // 創建p5.js sketch
    const sketch = (p) => {
      let font;
      let fontSize = 320;

      // 預加載字體
      p.preload = () => {
        font = p.loadFont(`${baseUrl}/PPCirka-Variable.ttf`);
      };

      // 設置畫布
      p.setup = () => {
        const canvas = p.createCanvas(window.innerWidth, window.innerHeight);
        canvas.parent(canvasRef.current);
        p.textFont(font);
        p.textSize(fontSize);
        p.textAlign(p.CENTER, p.CENTER); // 設置文字居中對齊
        p.noLoop(); // 靜態顯示，不需要連續繪製
      };

      // 繪製畫面
      p.draw = () => {
        p.background(255, 255, 255, 0); // 透明背景
        p.fill(255, 0, 0); // 紅色文字

        // 繪製文字在正中間
        p.text('Gallery', p.width / 2, p.height / 2);
      };

      // 響應窗口大小變化
      p.windowResized = () => {
        p.resizeCanvas(window.innerWidth, window.innerHeight);
        p.redraw();
      };
    };

    // 創建新的p5實例
    sketchRef.current = new p5(sketch);

    // 清理函數
    return () => {
      if (sketchRef.current) {
        sketchRef.current.remove();
      }
    };
  }, []);

  return (
    <div
      ref={canvasRef}
      id="gallery-logo"
      className="dev-red absolute left-0 top-0 h-full w-full"
    />
  );
}
