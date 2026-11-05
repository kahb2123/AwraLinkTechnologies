import { useEffect, useRef } from 'react';

const VARIANT_CLASSES = {
  'fade-up': 'reveal',
  'fade-in': 'reveal-fade',
  'slide-left': 'reveal-left',
  'slide-right': 'reveal-right',
  'scale': 'reveal-scale',
};

export default function ScrollReveal({ children, className = '', delay = 0, variant = 'fade-up', as: Tag = 'div', ...rest }) {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return undefined;

    if (typeof IntersectionObserver === 'undefined') {
      element.classList.add('is-visible');
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            element.classList.add('is-visible');
            observer.unobserve(element);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const baseClass = VARIANT_CLASSES[variant] || 'reveal';
  return (
    <Tag ref={ref} className={`${baseClass} ${className}`.trim()} style={{ transitionDelay: `${delay}ms` }} {...rest}>
      {children}
    </Tag>
  );
}