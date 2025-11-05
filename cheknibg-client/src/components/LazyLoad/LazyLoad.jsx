import React, { Suspense } from "react";
import { useIntersectionObserver } from "../IntersectionObserver/useIntersectionObserver.jsx";

const Fallback = () => <div style={{ minHeight: "300px" }}>Loading...</div>;

/**
 * Loads the component only when it enters the viewport.
 * @param {object} props - Must contain 'component', 'fallback', and 'componentProps'.
 */
export function LazyLoad({
  component: LazyComponent,
  componentProps = {},
  fallback = <Fallback />,
}) {
  const [ref, isVisible] = useIntersectionObserver();

  return (
    <div ref={ref}>
      {isVisible ? (
        <Suspense fallback={fallback}>
          <LazyComponent {...componentProps} />
        </Suspense>
      ) : (
        fallback
      )}
    </div>
  );
}
