/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        cairo: ["Cairo", "Arial", "sans-serif"],
      },
      colors: {
        hospital: {
          green: "#08733f",
          greenDark: "#044f2b",
          greenSoft: "#eaf5ef",
          greenMuted: "#d7ebdf",
          ink: "#21302a",
          gray: "#6d7b73",
          border: "#cfe3d7",
          bg: "#f6fbf8",
        },
      },
      boxShadow: {
        soft: "0 2px 8px rgba(8, 115, 63, 0.08)",
      },
    },
  },
  plugins: [],
};
