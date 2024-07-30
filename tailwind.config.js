/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "primary-text": "var(--text_primary)",
        "secondary-text": "var(--text_secondary)",
        "tertiary-text": "var(--text_tertiary)",
        "excerpt-text": "var(--text_excerpt)",
        "twitter-blue": "#1DA1F2",
        "title-blue": "#617bff",
        "button-text": "var(--button_text)",
      },
      fontFamily: {
        allaround: `"Montserrat", sans-serif`,
        heading: `"Lato", sans-serif`,
        body: `"Libre Baskerville", serif`,
        shape: `"Inter", sans-serif`,
        historic: `"EB Garamond", serif`,
        code: `"Martian Mono", monospace`,
        hindi: `"Tiro Devanagari Hindi", serif`,
      },
    },
  },
  plugins: [],
};
