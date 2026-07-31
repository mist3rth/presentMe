import React, { useRef, useEffect } from 'react';

interface DotImageRevealProps {
  src: string;
  alt?: string;
  className?: string;
  dots?: number;      // Number of columns (from screen: 12)
  gap?: number;       // Space between dots (from screen: 6)
  intensity?: number; // Reveal falloff intensity (from screen: 4)
  radius?: number;    // Mouse reveal radius (from screen: 150)
  background?: string;
}

type Fit = { fit: number; dx: number; dy: number };

class Cell {
  x: number;
  y: number;
  reveal = 0;
  treveal = 0;
  lastHit = 0;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  update(
    mx: number,
    my: number,
    hit: boolean,
    radius: number,
    falloff: number,
    now: number
  ) {
    if (hit) {
      this.lastHit = now;
      const dist = Math.hypot(mx - this.x, my - this.y);
      const n = Math.max(0, Math.min(1, 1 - dist / radius));
      const shaped = Math.pow(n, falloff);
      this.treveal = shaped * shaped * (3 - 2 * shaped);
    } else if (now - this.lastHit > 50) {
      this.treveal = 0;
    }
  }

  draw(
    ctx: CanvasRenderingContext2D,
    img: HTMLImageElement | null,
    dotSize: number,
    fullSize: number,
    f: Fit | null,
    color: string
  ) {
    // Interpolate reveal state for smooth growth animation
    this.reveal += (this.treveal - this.reveal) * 0.15;

    // Dot size scales up from dotSize to fullSize (overlapping to form solid image)
    const d = dotSize + (fullSize - dotSize) * this.reveal;
    
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.beginPath();
    ctx.arc(0, 0, d / 2, 0, 2 * Math.PI);
    
    if (img && img.complete && img.naturalWidth > 0 && f) {
      ctx.clip();
      const sw = d / f.fit;
      const sx = (this.x - d / 2 - f.dx) / f.fit;
      const sy = (this.y - d / 2 - f.dy) / f.fit;
      ctx.drawImage(img, sx, sy, sw, sw, -d / 2, -d / 2, d, d);
    } else {
      ctx.fillStyle = color;
      ctx.fill();
    }
    ctx.restore();
  }
}

export default function DotImageReveal({
  src,
  alt = '',
  className = '',
  dots = 12,          // Number of columns (Matches settings image)
  gap = 6,            // Gap size (Matches settings image)
  intensity = 4,      // Falloff intensity (Matches settings image)
  radius = 150,       // Reveal trigger radius (Matches settings image)
  background = '#000000',
}: DotImageRevealProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -99999, y: -99999, active: false });

  useEffect(() => {
    const host = hostRef.current;
    const canvas = canvasRef.current;
    if (!host || !canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const cols = Math.max(1, Math.floor(dots));
    const R = Math.max(1, radius);
    const I = Math.max(1, Math.min(10, intensity));
    
    // Calculate falloff curve based on intensity
    const falloff = Math.pow(2, (0.5 - ((I - 1) * 5) / 9) / 1.5);

    let img: HTMLImageElement | null = null;
    if (src) {
      img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = src;
    }

    let W = 1;
    let H = 1;
    let pitch = 20;
    let dotSize = 20;
    let fullSize = 20;
    let fitInfo: Fit | null = null;
    let bleed = 0;
    let cells: Cell[] = [];

    const computeFit = () => {
      if (!img || !img.complete || !img.naturalWidth) {
        fitInfo = null;
        return;
      }
      const nW = img.naturalWidth;
      const nH = img.naturalHeight;
      const fit = Math.max(W / nW, H / nH);
      fitInfo = {
        fit,
        dx: (W - nW * fit) / 2,
        dy: (H - nH * fit) / 2,
      };
    };

    const build = (mw?: number, mh?: number) => {
      const r = host.getBoundingClientRect();
      W = Math.max(1, Math.floor(mw ?? r.width));
      H = Math.max(1, Math.floor(mh ?? r.height));

      pitch = W / cols;
      dotSize = Math.max(1, pitch - Math.max(0, gap));
      fullSize = pitch * Math.SQRT2;
      const rowN = Math.max(1, Math.ceil(H / pitch));

      bleed = Math.ceil(fullSize / 2 + 4);

      const dpr = window.devicePixelRatio || 1;
      const cw = W + bleed * 2;
      const ch = H + bleed * 2;
      
      canvas.width = Math.floor(cw * dpr);
      canvas.height = Math.floor(ch * dpr);
      canvas.style.width = cw + 'px';
      canvas.style.height = ch + 'px';
      canvas.style.left = -bleed + 'px';
      canvas.style.top = -bleed + 'px';
      
      ctx.setTransform(dpr, 0, 0, dpr, bleed * dpr, bleed * dpr);

      const gridH = rowN * pitch;
      const oy = (H - gridH) / 2 + pitch / 2;

      cells = [];
      for (let c = 0; c < cols; c++) {
        for (let rIdx = 0; rIdx < rowN; rIdx++) {
          cells.push(
            new Cell(c * pitch + pitch / 2, oy + rIdx * pitch)
          );
        }
      }
      computeFit();
    };

    const drawFrame = (now: number) => {
      const m = mouseRef.current;
      ctx.clearRect(-bleed, -bleed, W + bleed * 2, H + bleed * 2);
      
      // Paint background solid (black) inside the offset grid bounds
      ctx.fillStyle = background;
      ctx.fillRect(-bleed, -bleed, W + bleed * 2, H + bleed * 2);

      for (const cell of cells) {
        cell.update(m.x, m.y, m.active, R, falloff, now);
        cell.draw(ctx, img, dotSize, fullSize, fitInfo, '#FFFFFF');
      }
    };

    build();

    const ro =
      typeof ResizeObserver !== 'undefined'
        ? new ResizeObserver((entries) => {
            const cr = entries[0]?.contentRect;
            build(cr?.width, cr?.height);
          })
        : null;
    ro?.observe(host);

    if (img && !img.complete) {
      img.onload = () => {
        computeFit();
      };
    }

    const setMouse = (clientX: number, clientY: number) => {
      const r = host.getBoundingClientRect();
      mouseRef.current.x = clientX - r.left;
      mouseRef.current.y = clientY - r.top;
      mouseRef.current.active = true;
    };
    
    const onMove = (e: MouseEvent) => setMouse(e.clientX, e.clientY);
    const onLeave = () => {
      mouseRef.current.active = false;
      mouseRef.current.x = -99999;
      mouseRef.current.y = -99999;
    };
    const onTouch = (e: TouchEvent) => {
      const t = e.touches[0];
      if (t) setMouse(t.clientX, t.clientY);
    };

    host.addEventListener('mousemove', onMove);
    host.addEventListener('mouseleave', onLeave);
    host.addEventListener('touchmove', onTouch, { passive: true });
    host.addEventListener('touchend', onLeave);

    let raf = 0;
    let isVisible = false;

    const io = new IntersectionObserver((entries) => {
      isVisible = entries[0].isIntersecting;
      if (isVisible) {
        if (!raf) raf = requestAnimationFrame(loop);
      } else {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    }, { rootMargin: '100px' });
    io.observe(host);

    const loop = (now: number) => {
      if (!isVisible) return;
      drawFrame(now);
      raf = requestAnimationFrame(loop);
    };

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro?.disconnect();
      host.removeEventListener('mousemove', onMove);
      host.removeEventListener('mouseleave', onLeave);
      host.removeEventListener('touchmove', onTouch);
      host.removeEventListener('touchend', onLeave);
    };
  }, [src, dots, gap, intensity, radius, background]);

  return (
    <div
      ref={hostRef}
      className={`relative w-full h-full overflow-hidden ${className}`}
      style={{ background }}
    >
      <canvas
        ref={canvasRef}
        className="absolute pointer-events-none"
      />
    </div>
  );
}
