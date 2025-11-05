import { useRef, useState, useEffect } from "react";

const defaultOptions = {
  root: null,
  rootMargin: "100px",
  threshold: 0,
};

export function useIntersectionObserver(options = defaultOptions) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const currentRef = ref.current;
    if (!currentRef) return;
    const observer = new window.IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(currentRef);
      }
    }, options);

    observer.observe(currentRef);

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [options]);

  return [ref, isVisible];
}
