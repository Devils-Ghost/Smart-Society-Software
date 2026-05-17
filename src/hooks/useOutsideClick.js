import { useEffect, useRef, useState } from "react";

export const useOutsideClick = (initialVal) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(initialVal);
  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) setVisible(false);
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);

    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  });
  return [ref, visible, setVisible];
};
