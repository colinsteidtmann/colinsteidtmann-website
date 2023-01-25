import { useEffect, useRef, useState } from "react";

export default function useObserver({ elementIDs }) {
  const observer = useRef(null);
  const [activeID, setActiveID] = useState();

  useEffect(() => {
    const handleObsever = (entries) => {
      entries.forEach((entry) => {
        if (entry?.isIntersecting) {
          setActiveID("#" + entry.target.id);
        }
      });
    };
    observer.current = new IntersectionObserver(handleObsever, {
      root: null, // watch for intersection relative to the device's viewport
      rootMargin: "0% 0px -35% 0px", // grow/shrink root element's bounding box before computing intersections
      threshold: 1.0, // run when 100% of the target is visible
    });
    const elements = document.querySelectorAll(elementIDs.toString());
    elements.forEach((elem) => observer.current.observe(elem));
    return () => observer.current?.disconnect();
  }, [elementIDs]);

  return { activeID };
}
