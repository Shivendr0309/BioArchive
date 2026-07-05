/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],

  darkMode: "class",

  theme: {
    extend: {
      colors: {
        primary: "#4F46E5",
        secondary: "#06B6D4",

        app: {
          light: "#F8FAFC",
          dark: "#020617",
        },

        card: {
          light: "#FFFFFF",
          dark: "#0F172A",
        },

        border: {
          light: "#E2E8F0",
          dark: "#334155",
        },

        muted: {
          light: "#64748B",
          dark: "#94A3B8",
        },
      },

      boxShadow: {
        soft: "0 10px 30px rgba(15,23,42,0.08)",

        premium:
          "0 20px 60px rgba(79,70,229,0.18)",

        glass:
          "0 8px 32px rgba(15,23,42,0.12)",
      },

      borderRadius: {
        xl2: "1.25rem",
        xl3: "2rem",
      },

      transitionDuration: {
        400: "400ms",
      },
    },
  },

  plugins: [],
};