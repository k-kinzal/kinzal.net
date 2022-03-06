const config = {
  content: ["./src/**/*.{html,js,svelte,ts}"],

  theme: {
    extend: {
      fontFamily: {
        raleway: [
          "Raleway"
        ]
      },
      colors: {
        main: "#fff",
        base: {
          50: "#f8fafc", // border color
          300: "#cbd5e1", // select color
          900: "#111827" // text color
        },
        accent: "#ba2636",
      },
      letterSpacing: {
        wider: "4px",
        widest: "10px",
      },
      backdropBlur: {
        xs: '1px',
      }
    },
  },

  plugins: [],
};

module.exports = config;
