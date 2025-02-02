import { StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

export default function CursorGlow() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX - 10, y: e.clientY - 10 });
    };

    window.addEventListener("mousemove", updatePosition);
    return () => window.removeEventListener("mousemove", updatePosition);
  }, []);

  return (
    <div
      className="custom-cursor"
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
      }}
    />
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* <CursorGlow /> */}
    <App />
  </StrictMode>
);
