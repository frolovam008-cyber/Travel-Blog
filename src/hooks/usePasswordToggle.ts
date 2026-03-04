import { useState, useMemo } from "react";

export const usePasswordToggle = (type?: string) => {
  const isPassword = type === "password";
  const [showPassword, setShowPassword] = useState(false);

  // мемоизированные обработчики
  const handlers = useMemo(() => {
    const show = () => setShowPassword(true);
    const hide = () => setShowPassword(false);

    return {
      onMouseDown: show,
      onMouseUp: hide,
      onMouseLeave: hide,
      onTouchStart: show,
      onTouchEnd: hide,
    };
  }, []);

  const inputType = isPassword && showPassword ? "text" : type ?? "text";

  return {
    isPassword,
    showPassword,
    inputType,
    handlers,
  };
};



// import { useState, useCallback } from "react";

// export const usePasswordToggle = (type?: string) => {
//   const isPassword = type === "password";
//   const [showPassword, setShowPassword] = useState(false);

//   const show = useCallback(() => {
//     setShowPassword(true);
//   }, []);

//   const hide = useCallback(() => {
//     setShowPassword(false);
//   }, []);

//   const inputType =
//     isPassword && showPassword ? "text" : type ?? "text";

//   return {
//     isPassword,
//     showPassword,
//     inputType,
//     handlers: {
//       onMouseDown: show,
//       onMouseUp: hide,
//       onMouseLeave: hide,
//       onTouchStart: show,
//       onTouchEnd: hide,
//     },
//   };
// };
