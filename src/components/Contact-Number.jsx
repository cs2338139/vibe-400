import {
  useEffect,
  useRef,
  useCallback,
  useMemo,
  forwardRef,
  useImperativeHandle
} from 'react';

const ContactNumber = forwardRef((props, ref) => {
  const cursorRef = useRef({ x: window.innerWidth, y: window.innerHeight });
  const titleRef = useRef(null);
  const charsRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const maxDistRef = useRef(0);
  const animationFrameRef = useRef(null);

  useImperativeHandle(ref, () => ({
    cursorRef
  }));

  const phoneNumberText = '+092 987 009';
  const vfontConfig = useMemo(
    () => ({
      scale: false,
      flex: true,
      alpha: false,
      stroke: false,
      width: true,
      weight: true,
      italic: true
    }),
    []
  );

  const calculateDistance = useCallback((a, b) => {
    const dx = b.x - a.x;
    return Math.sqrt(dx ** 2);
  }, []);

  class Char {
    constructor(char, calculateDistance, mouseRef, maxDistRef) {
      this.char = char;
      this.el = null;
      this.pos = null;
      this.wdth = 100;
      this.wght = 400;
      this.alpha = 1;
      this.ital = 0;
      this.calculateDistance = calculateDistance;
      this.mouseRef = mouseRef;
      this.maxDistRef = maxDistRef;
    }

    setElement(element) {
      this.el = element;
    }

    getDist() {
      if (!this.el) return 0;
      this.pos = this.el.getBoundingClientRect();
      return this.calculateDistance(this.mouseRef.current, {
        x: this.pos.x + this.pos.width / 1.75
      });
    }

    getAttr(dist, min, max) {
      const wght = max - Math.abs((max * dist) / this.maxDistRef.current);
      return Math.max(min, wght + min);
    }

    update(args) {
      const dist = this.getDist();
      this.wdth = args.wdth ? Math.floor(this.getAttr(dist, 5, 200)) : 100;
      this.wght = args.wght ? Math.floor(this.getAttr(dist, 100, 800)) : 400;
      this.alpha = args.alpha ? this.getAttr(dist, 0, 1).toFixed(2) : 1;
      this.ital = args.ital ? this.getAttr(dist, 0, 1).toFixed(2) : 0;
      this.draw();
    }

    draw() {
      if (!this.el) return;
      this.el.style.opacity = this.alpha;
      this.el.style.fontVariationSettings = `'wght' ${this.wght}, 'wdth' ${this.wdth}, 'ital' ${this.ital}`;
    }
  }

  const createChar = useCallback(
    (char) => new Char(char, calculateDistance, mouseRef, maxDistRef),
    [calculateDistance]
  );

  const handleResize = useCallback(() => {
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
  }, [phoneNumberText.length, vfontConfig.scale]);

  const renderChars = useCallback(() => {
    if (!titleRef.current) return;

    maxDistRef.current = titleRef.current.getBoundingClientRect().width / 2;

    charsRef.current.forEach((char) => {
      char.update({
        wght: vfontConfig.weight,
        wdth: vfontConfig.width,
        ital: vfontConfig.italic,
        alpha: vfontConfig.alpha
      });
    });
  }, [vfontConfig]);

  useEffect(() => {
    charsRef.current = Array.from(phoneNumberText).map(createChar);
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [createChar, handleResize, phoneNumberText]);

  useEffect(() => {
    if (!titleRef.current) return;

    const spans = titleRef.current.querySelectorAll('span');
    spans.forEach((span, index) => {
      if (charsRef.current[index]) {
        charsRef.current[index].setElement(span);
      }
    });
  }, []);

  useEffect(() => {
    const animate = () => {
      const { x: mouseX } = mouseRef.current;
      const { x: cursorX } = cursorRef.current;

      mouseRef.current.x += (cursorX - mouseX) / 20;

      renderChars();
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [renderChars]);

  const phoneNumber = useMemo(
    () =>
      phoneNumberText.split('').map((char, index) => (
        <span key={index} data-char={char}>
          {char}
        </span>
      )),
    [phoneNumberText]
  );

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
});

ContactNumber.displayName = 'ContactNumber';

export default ContactNumber;
