import { useEffect, useRef } from 'react';
import p5 from 'p5';

export default function GalleryCanvas() {
  // 用於存儲canvas元素的ref
  const canvasRef = useRef(null);
  // 用於存儲p5實例的ref
  const sketchRef = useRef(null);

  useEffect(() => {
    const sketch = (p) => {
      // 存儲所有墨滴效果
      let drops = [];
      // 存儲所有波浪形狀
      let shapes = [];
      // 定義顏色調色板
      let colors = [
        '#e70617',
        '#c15a01',
        '#458075',
        '#57d0c9',
        '#b7667d',
        '#ee80b3',
        '#b92b09',
        '#030003'
      ];
      // 定義每個形狀的頂點數量
      const VERTICES_COUNT = 300;
      // 用於控制噪聲效果的強度
      let noiseAmount;

      // p5.js 初始化設置
      p.setup = () => {
        const canvas = p.createCanvas(window.innerWidth, window.innerHeight);
        // 將畫布添加到指定的DOM元素中
        canvas.parent(canvasRef.current);

        // 設置噪聲量為畫布高度的1/20
        noiseAmount = p.height / 20;

        // 隨機移除一個顏色作為背景色
        colors.splice(p.floor(p.random(colors.length)), 1);
        // 打亂剩餘顏色的順序
        p.shuffle(colors, true);

        // 創建波浪形狀
        createWaveShapes();
      };

      // 創建波浪形狀的函數
      const createWaveShapes = () => {
        // 在畫布高度範圍內創建多個波浪
        for (
          let y = noiseAmount * 1.5;
          y < p.height - noiseAmount;
          y += noiseAmount * 2
        ) {
          const points = [];
          // 創建正向波浪點
          for (let x = p.width * 0.1; x < p.width * 0.9; x += p.width / 150) {
            points.push(p.createVector(x, y));
          }
          // 創建反向波浪點
          for (let x = p.width * 0.9; x > p.width * 0.1; x -= p.width / 150) {
            points.push(p.createVector(x, y + noiseAmount));
          }
          // 將新的波浪形狀添加到shapes數組
          shapes.push(new Shape(p, points, colors[3]));
        }
      };

      // p5.js 繪圖循環
      p.draw = () => {
        // 清除畫布
        p.clear();
        // 設置背景色
        p.background(colors[0]);

        // 處理墨滴效果
        handleInkDrops();
        // 渲染所有形狀
        renderShapes();

        // 在150幀後停止動畫
        if (p.frameCount === 150) {
          p.noLoop();
        }
      };

      // 處理墨滴效果的函數
      const handleInkDrops = () => {
        // 在第50幀創建第一層墨滴
        if (p.frameCount === 50) {
          createInkLayer(2, 0.1, 0.3, colors[0]);
        }

        // 在第75幀創建第二層墨滴
        if (p.frameCount === 75) {
          createInkLayer(2, 0.05, 0.15, colors[1]);
        }

        // 在100幀後隨機添加墨滴
        if (p.frameCount > 100) {
          addInk(
            p,
            p.random(p.width * 0.1, p.width * 0.9),
            p.random(p.height),
            p.random(4),
            p.random(colors)
          );
        }
      };

      // 創建墨滴層的函數
      const createInkLayer = (yMultiplier, minRadius, maxRadius, color) => {
        for (
          let y = noiseAmount * yMultiplier;
          y < p.height;
          y += noiseAmount
        ) {
          // 使用柏林噪聲生成x座標
          const x = p.noise(y, p.frameCount) * p.width;
          // 隨機生成半徑
          const radius = p.random(
            noiseAmount * minRadius,
            noiseAmount * maxRadius
          );
          addInk(p, x, y, radius, color);
        }
      };

      // 渲染所有形狀的函數
      const renderShapes = () => {
        // 渲染波浪形狀
        shapes.forEach((shape) => shape.show());
        // 更新並渲染墨滴
        drops.forEach((drop) => {
          drop.grow();
          drop.show();
        });
      };

      // 形狀類別定義
      class Shape {
        constructor(p, pts, color) {
          this.p = p;
          this.points = pts;
          this.color = color;
        }

        // 大理石效果變形方法
        marble(other) {
          this.points.forEach((pt) => {
            const p = pt.copy();
            p.sub(other.pos);
            const m = p.mag();
            const root = this.p.sqrt(1 + (other.r * other.r) / (m * m));
            p.mult(root);
            p.add(other.pos);
            pt.set(p);
          });
        }

        // 顯示形狀
        show() {
          this.p.fill(this.color);
          this.p.stroke(this.color);
          this.p.beginShape();
          this.points.forEach((point) => {
            this.p.vertex(point.x, point.y);
          });
          this.p.endShape();
        }
      }

      // 墨滴類別定義
      class Drop {
        constructor(p, x, y, r, color) {
          this.p = p;
          this.pos = p.createVector(x, y);
          this.r = 1;
          this.finalR = r;
          this.color = color;
          this.points = this.initializePoints(x, y, r);
        }

        // 初始化墨滴的頂點
        initializePoints(x, y, r) {
          const points = [];
          for (let i = 0; i < VERTICES_COUNT; i++) {
            const angle = this.p.map(i, 0, VERTICES_COUNT, 0, this.p.TAU);
            points.push(
              this.p.createVector(
                x + this.p.cos(angle) * r,
                y + this.p.sin(angle) * r
              )
            );
          }
          return points;
        }

        // 墨滴生長效果
        grow() {
          if (this.r < this.finalR) {
            this.r += 0.25;
            drops.forEach((drop) => drop.marble(this));
            shapes.forEach((shape) => shape.marble(this));
          }
        }

        // 大理石效果變形方法
        marble(other) {
          this.points.forEach((pt) => {
            const p = pt.copy();
            p.sub(other.pos);
            const m = p.mag();
            const root = this.p.sqrt(1 + (other.r * other.r) / (m * m));
            p.mult(root);
            p.add(other.pos);
            pt.set(p);
          });
        }

        // 顯示墨滴
        show() {
          this.p.fill(this.color);
          this.p.noStroke();
          this.p.beginShape();
          this.points.forEach((point) => {
            this.p.vertex(point.x, point.y);
          });
          this.p.endShape();
        }
      }

      // 添加新墨滴的函數
      function addInk(p, x, y, r, color) {
        const droppy = new Drop(p, x, y, r, color);
        drops.forEach((drop) => drop.marble(droppy));
        shapes.forEach((shape) => shape.marble(droppy));
        drops.push(droppy);
      }

      // 視窗大小改變時重設畫布尺寸
      p.windowResized = () => {
        p.resizeCanvas(window.innerWidth, window.innerHeight);
      };
    };

    // 創建新的p5實例
    sketchRef.current = new p5(sketch);

    // 清理函數
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
      className="dev-red absolute left-0 top-0 h-full w-full"
    />
  );
}
