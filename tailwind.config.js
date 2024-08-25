/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      container: {
        center: true,
      },
      colors: {
        abi: {
          100: "#7da1f7",
          200: "#4d0de5",
        },
        zard: "#fae362",
        ghermez: "#f75e4b",
      },
    },
  },
  plugins: [],
};
