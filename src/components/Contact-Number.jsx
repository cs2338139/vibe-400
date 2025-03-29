import { useEffect, useRef, useCallback, useMemo } from 'react';

const ContactNumber = () => {
  const titleRef = useRef(null);
  const charsRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const cursorRef = useRef({ x: window.innerWidth, y: window.innerHeight });
  const maxDistRef = useRef(0);
  const animationFrameRef = useRef(null);
  const phoneNumberText = '+092 987 009';

  const vfontConfig = {
    scale: false,
    flex: true,
    alpha: false,
    stroke: false,
    width: true,
    weight: true,
    italic: true
  };

  // 計算兩點之間的距離
  const calculateDistance = useCallback((a, b) => {
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    return Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2)); // 修正了原本的錯誤，第二個參數應該是 + 而不是 ,
  }, []);

  // 創建字符元素的函數
  const createChar = useCallback(
    (char) => {
      // 返回一個包含字符相關方法的物件
      return {
        char, // 保存字符引用，解決未使用警告
        el: null,
        pos: null,
        wdth: 100,
        wght: 400,
        alpha: 1,
        ital: 0,

        setElement: function (element) {
          this.el = element;
        },

        getDist: function () {
          if (!this.el) return 0;
          this.pos = this.el.getBoundingClientRect();
          return calculateDistance(mouseRef.current, {
            x: this.pos.x + this.pos.width / 1.75,
            y: this.pos.y
          });
        },

        getAttr: function (dist, min, max) {
          const wght = max - Math.abs((max * dist) / maxDistRef.current);
          return Math.max(min, wght + min);
        },

        update: function (args) {
          const dist = this.getDist();
          this.wdth = args.wdth ? ~~this.getAttr(dist, 5, 200) : 100;
          this.wght = args.wght ? ~~this.getAttr(dist, 100, 800) : 400;
          this.alpha = args.alpha ? this.getAttr(dist, 0, 1).toFixed(2) : 1;
          this.ital = args.ital ? this.getAttr(dist, 0, 1).toFixed(2) : 0;
          this.draw();
        },

        draw: function () {
          if (!this.el) return;
          this.el.style.opacity = this.alpha;
          this.el.style.fontVariationSettings = `'wght' ${this.wght}, 'wdth' ${this.wdth}, 'ital' ${this.ital}`;
        }
      };
    },
    [calculateDistance]
  );

  // 初始化字符
  useEffect(() => {
    const chars = [];

    // 創建所有字符
    for (let i = 0; i < phoneNumberText.length; i++) {
      chars.push(createChar(phoneNumberText[i]));
    }

    charsRef.current = chars;

    // 設置標題大小
    const setSize = () => {
      if (!titleRef.current) return;

      const fontSize = window.innerWidth / (phoneNumberText.length / 2);
      titleRef.current.style.fontSize = `${fontSize}px`;

      if (vfontConfig.scale) {
        const scaleY = (
          window.innerHeight / titleRef.current.getBoundingClientRect().height
        ).toFixed(2);
        const lineHeight = scaleY * 0.8;
        titleRef.current.style.transform = `scale(1,${scaleY})`;
        titleRef.current.style.lineHeight = `${lineHeight}em`;
      }
    };

    // 處理視窗大小變更
    const handleResize = () => {
      setSize();
    };

    // 處理滑鼠移動
    const handleMouseMove = (e) => {
      cursorRef.current.x = e.clientX;
      cursorRef.current.y = e.clientY;
    };

    // 處理觸摸移動
    const handleTouchMove = (e) => {
      const t = e.touches[0];
      cursorRef.current.x = t.clientX;
      cursorRef.current.y = t.clientY;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: false });

    setSize();

    // 清理事件監聽器
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [createChar, vfontConfig.scale, phoneNumberText]);

  // 設置字符元素引用
  useEffect(() => {
    if (!titleRef.current) return;

    const spans = titleRef.current.querySelectorAll('span');
    spans.forEach((span, index) => {
      if (charsRef.current[index]) {
        charsRef.current[index].setElement(span);
      }
    });
  }, []);

  // 動畫循環
  useEffect(() => {
    const animate = () => {
      const { x: mouseX, y: mouseY } = mouseRef.current;
      const { x: cursorX, y: cursorY } = cursorRef.current;

      mouseRef.current.x += (cursorX - mouseX) / 20;
      mouseRef.current.y += (cursorY - mouseY) / 20;

      renderChars();

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    const renderChars = () => {
      if (!titleRef.current) return;

      maxDistRef.current = titleRef.current.getBoundingClientRect().width / 2;

      for (let i = 0; i < charsRef.current.length; i++) {
        charsRef.current[i].update({
          wght: vfontConfig.weight,
          wdth: vfontConfig.width,
          ital: vfontConfig.italic,
          alpha: vfontConfig.alpha
        });
      }
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    // 清理動畫幀
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // 使用useMemo準備電話號碼的span元素
  const phoneNumber = useMemo(() => {
    return phoneNumberText.split('').map((char, index) => (
      <span key={index} data-char={char}>
        {char}
      </span>
    ));
  }, [phoneNumberText]);

  return (
    <div className="absolute my-14 -translate-y-14 whitespace-nowrap text-center text-[64px] font-[300] text-pr-1">
      <h1
        id="title"
        ref={titleRef}
        className={`contact-number ${vfontConfig.flex ? 'flex' : ''} ${vfontConfig.stroke ? 'stroke' : ''}`}>
        {phoneNumber}
      </h1>
    </div>
  );
};

export default ContactNumber;
