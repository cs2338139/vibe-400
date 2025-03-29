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

      // 畫布和緩衝區
      let mainCanvas;
      let bufferCanvas;

      // 液態扭曲效果參數
      let cols, rows;
      let ripples = [];
      const pixelSize = 10; // 扭曲影響的像素大小
      const rippleLifetime = 2000; // 漣漪存在時間(毫秒)
      const maxRippleSize = 800; // 最大漣漪大小

      // 添加漣漪函數
      function addRipple(x, y) {
        ripples.push({
          x,
          y,
          startTime: p.millis(),
          strength: 30, // 初始強度
        });
      }

      // 預加載字體
      p.preload = () => {
        font = p.loadFont(`${baseUrl}/PPCirka-Variable.ttf`);
      };

      // 設置畫布
      p.setup = () => {
        mainCanvas = p.createCanvas(window.innerWidth, window.innerHeight);
        mainCanvas.parent(canvasRef.current);

        // 創建緩衝區用於繪製原始內容
        bufferCanvas = p.createGraphics(p.width, p.height);

        // 設置文字樣式
        bufferCanvas.textFont(font);
        bufferCanvas.textSize(fontSize);
        bufferCanvas.textAlign(p.CENTER, p.CENTER);
        bufferCanvas.fill(255, 0, 0);

        // 在緩衝區繪製文字
        bufferCanvas.text('Gallery', bufferCanvas.width / 2, bufferCanvas.height / 2);

        // 計算網格大小
        cols = Math.ceil(p.width / pixelSize);
        rows = Math.ceil(p.height / pixelSize);
      };

      // 繪製畫面
      p.draw = () => {
        p.background(0);

        // 掃描每個網格點
        for (let i = 0; i < cols; i++) {
          for (let j = 0; j < rows; j++) {
            // 計算目前網格點的座標
            let x = i * pixelSize;
            let y = j * pixelSize;

            // 初始位移
            let offsetX = 0;
            let offsetY = 0;

            // 計算所有漣漪對此點的影響
            for (let r = 0; r < ripples.length; r++) {
              let ripple = ripples[r];

              // 計算點到漣漪中心的距離
              let dx = x - ripple.x;
              let dy = y - ripple.y;
              let distance = Math.sqrt(dx * dx + dy * dy);

              // 計算漣漪的當前大小和強度
              let progress = (p.millis() - ripple.startTime) / rippleLifetime;
              let currentSize = progress * maxRippleSize;
              let strengthFalloff = 1 - progress; // 強度隨時間減弱

              // 當點與漣漪前緣距離在一定範圍內時產生位移
              let rippleWidth = 100; // 漣漪寬度
              let d = Math.abs(distance - currentSize);

              if (d < rippleWidth) {
                // 位移強度，距離漣漪前緣越近，位移越大
                let power = (1 - d / rippleWidth) * ripple.strength * strengthFalloff;

                // 計算位移方向，從漣漪中心向外
                if (distance > 0) {
                  let dirX = dx / distance;
                  let dirY = dy / distance;

                  // 累積位移量
                  offsetX += dirX * power;
                  offsetY += dirY * power;
                }
              }
            }

            // 根據位移量從bufferCanvas獲取像素
            let sourceX = Math.min(Math.max(0, x + offsetX), p.width - pixelSize);
            let sourceY = Math.min(Math.max(0, y + offsetY), p.height - pixelSize);

            // 將bufferCanvas的對應區域複製到主畫布
            p.copy(
              bufferCanvas,
              sourceX, sourceY, pixelSize, pixelSize,
              x, y, pixelSize, pixelSize
            );
          }
        }

        // 更新和清理過期漣漪
        ripples = ripples.filter(ripple => {
          return p.millis() - ripple.startTime < rippleLifetime;
        });
      };

      // 滑鼠點擊事件
      p.mousePressed = () => {
        // 只有當點擊在畫布內時才觸發
        if (p.mouseX >= 0 && p.mouseX <= p.width &&
            p.mouseY >= 0 && p.mouseY <= p.height) {
          addRipple(p.mouseX, p.mouseY);
        }
      };

      // 滑鼠拖動事件 - 可選，能產生持續的效果
      p.mouseDragged = () => {
        // 只有每隔一段距離才添加新漣漪，避免過多
        const dragThreshold = 50;
        let lastRipple = ripples[ripples.length - 1];

        if (!lastRipple || p.dist(p.mouseX, p.mouseY, lastRipple.x, lastRipple.y) > dragThreshold) {
          addRipple(p.mouseX, p.mouseY);
        }
      };

      // 響應窗口大小變化
      p.windowResized = () => {
        p.resizeCanvas(window.innerWidth, window.innerHeight);

        // 重新創建緩衝區
        bufferCanvas = p.createGraphics(p.width, p.height);
        bufferCanvas.textFont(font);
        bufferCanvas.textSize(fontSize);
        bufferCanvas.textAlign(p.CENTER, p.CENTER);
        bufferCanvas.fill(255, 0, 0);
        bufferCanvas.text('Gallery', bufferCanvas.width / 2, bufferCanvas.height / 2);

        // 更新網格大小
        cols = Math.ceil(p.width / pixelSize);
        rows = Math.ceil(p.height / pixelSize);
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
  }, [baseUrl]);

  return (
    <div
      ref={canvasRef}
      id="gallery-logo"
      className="absolute left-0 top-0 h-full w-full"
    />
  );
}
