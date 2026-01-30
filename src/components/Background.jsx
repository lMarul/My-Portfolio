import { useEffect } from "react";

export const Background = () => {
  useEffect(() => {
    if (window.particlesJS) {
      window.particlesJS('background-js', {
        particles: {
          number: { value: 80, density: { enable: true, value_area: 800 } },
          color: { value: "#dc2626" },
          shape: { type: "circle" },
          opacity: { value: 0.5, random: false },
          size: { value: 3, random: true },
          line_linked: { enable: true, distance: 150, color: "#dc2626", opacity: 0.4, width: 1 },
          move: { enable: true, speed: 2, direction: "none", random: false, straight: false, out_mode: "out" }
        },
        interactivity: {
          detect_on: "canvas",
          events: {
            onhover: { enable: true, mode: "repulse" },
            onclick: { enable: true, mode: "push" },
            resize: true
          }
        }
      });
    }
  }, []);

  return (
    <div
      id="background-js"
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      style={{ position: 'fixed', width: '100%', height: '100%', top: 0, left: 0, zIndex: 0 }}
    />
  );
};
