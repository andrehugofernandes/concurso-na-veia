import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';

// Registrar plugins
gsap.registerPlugin(ScrollTrigger, TextPlugin);

interface AnimationConfig {
  trigger?: string | HTMLElement;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  markers?: boolean;
  onEnter?: () => void;
  onLeave?: () => void;
}

export const useGsapAnimations = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Revelar elementos ao scroll (fade-in + slide-up)
  const revealOnScroll = (selector: string, config?: Partial<AnimationConfig>) => {
    const elements = document.querySelectorAll(selector);
    
    elements.forEach((el) => {
      gsap.from(el, {
        scrollTrigger: {
          trigger: el,
          start: config?.start || 'top 80%',
          end: config?.end || 'top 50%',
          toggleActions: 'play none none none',
          markers: config?.markers || false,
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power3.out',
      });
    });
  };

  // Parallax suave (movimento em Y baseado no scroll)
  const parallaxEffect = (selector: string, intensity: number = 0.5) => {
    const elements = document.querySelectorAll(selector);
    
    elements.forEach((el) => {
      gsap.to(el, {
        scrollTrigger: {
          trigger: el,
          start: 'top center',
          end: 'bottom center',
          scrub: 1,
          markers: false,
        },
        y: window.innerHeight * intensity,
        ease: 'none',
      });
    });
  };

  // Animação de revelação de texto com stagger
  const revealTextStagger = (selector: string, staggerDelay: number = 0.05) => {
    const elements = document.querySelectorAll(selector);
    
    elements.forEach((el) => {
      const text = el.textContent || '';
      const chars = text.split('');
      
      el.innerHTML = chars
        .map((char) => `<span class="inline-block">${char}</span>`)
        .join('');

      const spans = el.querySelectorAll('span');
      
      gsap.from(spans, {
        scrollTrigger: {
          trigger: el,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
        opacity: 0,
        y: 10,
        duration: 0.6,
        stagger: staggerDelay,
        ease: 'power2.out',
      });
    });
  };

  // Efeito de escala ao entrar na viewport
  const scaleOnScroll = (selector: string, config?: Partial<AnimationConfig>) => {
    const elements = document.querySelectorAll(selector);
    
    elements.forEach((el) => {
      gsap.from(el, {
        scrollTrigger: {
          trigger: el,
          start: config?.start || 'top 85%',
          toggleActions: 'play none none none',
        },
        scale: 0.9,
        opacity: 0,
        duration: 0.8,
        ease: 'back.out(1.7)',
      });
    });
  };

  // Cursor magnético (atrai o cursor para botões)
  const magneticCursor = (selector: string) => {
    const elements = document.querySelectorAll(selector);
    
    elements.forEach((el) => {
      const element = el as HTMLElement;
      
      element.addEventListener('mousemove', (e: MouseEvent) => {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        gsap.to(element, {
          x: x * 0.2,
          y: y * 0.2,
          duration: 0.3,
          overwrite: 'auto',
        });
      });

      element.addEventListener('mouseleave', () => {
        gsap.to(element, {
          x: 0,
          y: 0,
          duration: 0.3,
          overwrite: 'auto',
        });
      });
    });
  };

  // Smooth scroll com GSAP (alternativa ao Lenis)
  const smoothScroll = () => {
    gsap.registerPlugin(ScrollTrigger);
    
    // Proxy para smooth scroll
    let proxy = { skew: 0, skewSetter(value) { this.skew = value; }, getCurrentSkew() { return this.skew; }, onUpdate: () => {} },
      skewSetter = gsap.quickSetter(proxy, "skew", "deg"),
      clamp = gsap.utils.clamp(-20, 20);

    gsap.set(document.body, { transformOrigin: "center center", force3D: true });

    gsap.ticker.add(() => {
      let skew = clamp(gsap.getProperty(window, "scrollVelocity"));
      if (Math.abs(skew) > Math.abs(proxy.skew)) {
        proxy.skew = skew;
        skewSetter(skew);
        gsap.to(proxy, { skew: 0, duration: 0.8, ease: "power3", overwrite: false });
      }
    });

    gsap.set(window, { scrollVelocity: 0 });
  };

  useEffect(() => {
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return {
    containerRef,
    revealOnScroll,
    parallaxEffect,
    revealTextStagger,
    scaleOnScroll,
    magneticCursor,
    smoothScroll,
  };
};
