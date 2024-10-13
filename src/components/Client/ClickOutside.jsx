import React, { useRef, useEffect } from "react";

const ClickOutside = ({ children, exceptionRef, onClick, className }) => {
  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleClickListener = (event) => {
      let clickedInside = false;
      if (exceptionRef) {
        clickedInside =
          (wrapperRef.current && wrapperRef.current.contains(event.target)) ||
          (exceptionRef.current && exceptionRef.current === event.target) ||
          (exceptionRef.current && exceptionRef.current.contains(event.target));
      } else {
        clickedInside =
          wrapperRef.current && wrapperRef.current.contains(event.target);
      }

      if (!clickedInside) onClick();
    };

    const handleEscKeyPress = (event) => {
      if (event.key === "Escape") {
        onClick(); // Close the element when 'Escape' is pressed
      }
    };

    document.addEventListener("mousedown", handleClickListener);
    document.addEventListener("keydown", handleEscKeyPress); // Listen for 'Escape' key press

    return () => {
      document.removeEventListener("mousedown", handleClickListener);
      document.removeEventListener("keydown", handleEscKeyPress); // Cleanup event listener
    };
  }, [exceptionRef, onClick]);

  return (
    <div ref={wrapperRef} className={className || ""}>
      {children}
    </div>
  );
};

export default ClickOutside;
