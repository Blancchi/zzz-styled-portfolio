/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        base: {
          DEFAULT: "#0F1115",
          deep: "#0A0B0D",
        },
        surface: {
          DEFAULT: "#1A1D24",
          raised: "#222630",
        },
        acid: {
          DEFAULT: "#E2FF00",
          dim: "#B8CC00",
        },
        signal: {
          orange: "#FF5500",
          teal: "#00F0FF",
        },
      },
      fontFamily: {
        display: ["'Rajdhani'", "'Oswald'", "sans-serif"],
        mono: ["'JetBrains Mono'", "'Space Mono'", "monospace"],
        body: ["'Inter'", "sans-serif"],
      },
      clipPath: {
        "cut-sm": "polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px)",
        "cut-lg": "polygon(24px 0, 100% 0, 100% calc(100% - 24px), calc(100% - 24px) 100%, 0 100%, 0 24px)",
        "badge": "polygon(10% 0, 100% 0, 90% 100%, 0% 100%)",
      },
      boxShadow: {
        "acid-glow": "0 0 24px 0 rgba(226, 255, 0, 0.35)",
        "teal-glow": "0 0 24px 0 rgba(0, 240, 255, 0.3)",
      },
      backgroundImage: {
        "grid-pattern":
          "linear-gradient(rgba(226,255,0,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(226,255,0,0.06) 1px, transparent 1px)",
        "scanlines":
          "repeating-linear-gradient(0deg, rgba(255,255,255,0.025) 0px, rgba(255,255,255,0.025) 1px, transparent 1px, transparent 3px)",
      },
      backgroundSize: {
        grid: "40px 40px",
      },
      keyframes: {
        "noise-shift": {
          "0%, 100%": { transform: "translate(0, 0)" },
          "10%": { transform: "translate(-2%, -3%)" },
          "30%": { transform: "translate(3%, 2%)" },
          "50%": { transform: "translate(-1%, 3%)" },
          "70%": { transform: "translate(2%, -2%)" },
          "90%": { transform: "translate(-3%, 1%)" },
        },
      },
      animation: {
        "noise-shift": "noise-shift 0.5s steps(2) infinite",
      },
    },
  },
  plugins: [
    // Custom utility plugin: skewed panels, cut corners, HUD frame borders
    function ({ addUtilities, matchUtilities, theme }) {
      matchUtilities(
        { "clip-path": (value) => ({ clipPath: value }) },
        { values: theme("clipPath") }
      );
      addUtilities({
        ".skew-panel": {
          transform: "skewX(-12deg)",
        },
        ".skew-panel > *": {
          transform: "skewX(12deg)",
        },
        ".frame-industrial": {
          borderWidth: "1px",
          borderColor: "rgba(226,255,0,0.25)",
          backgroundColor: "rgba(26,29,36,0.6)",
          backdropFilter: "blur(6px)",
        },
        ".text-outline-acid": {
          "-webkit-text-stroke": "1px #E2FF00",
          color: "transparent",
        },
      });
    },
  ],
};
