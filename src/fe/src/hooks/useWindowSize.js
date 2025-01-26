// "use client";

// import { useState, useEffect } from "react";

// export default function useWindowSize() {
//   const isLandscape = size.height <= size.width;
//   const ratio = isLandscape ? size.width / size.height : size.height / size.width;

//   const [windowSize, setWindowSize] = useState({
//     width: undefined,
//     height: undefined,
//   });

//   useEffect(() => {
//     function handleResize() {
//       setWindowSize({
//         width: window.innerWidth,
//         height: window.innerHeight,
//       });
//     }

//     window.addEventListener("resize", handleResize);

//     handleResize();

//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   return windowSize;
// }
