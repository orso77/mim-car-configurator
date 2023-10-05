import React, { useRef, useEffect } from "react";

/**
 * Hook that alerts clicks outside of the passed ref
 */
function useInsideAlerter(ref, handleAction) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (ref.current && ref.current.contains(event.target)) {
        handleAction();
        //alert("You clicked inside of me!");
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}

/**
 * Component that alerts if you click outside of it
 */
export default function InsideAlerter(props) {
  const wrapperRef = useRef(null);
  useInsideAlerter(wrapperRef, props.handleAction);
  return <div ref={wrapperRef}>{props.children}</div>;
}