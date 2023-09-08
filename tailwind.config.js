/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      display: ['Outfit', 'sans-serif'],
      body: ['Outfit', 'sans-serif'],
    },
    extend: {
      backgroundImage: {
        'landing': "url('/src/assets/img/background_landing.png')",
        'wave-green': "url('/src/assets/img/wave-green.svg')",
        'wave-blue':"url('/src/assets/img/wave-blue.svg')",
        'wave-yellow': "url('/src/assets/img/wave-yellow.svg')",
      },
      colors: {
        'primary': "#2F418A",
        'secondary': "#FEEA37",
        'light': "#E0EAF1",
        'success': "#3CCF4E",
        'dark': "#222831",
        'base-text': "#526D82",
        'light-text': "#DDE6ED",
        'white': "#FFFFFF",
        'error': "#CF3C3C",
      },
    },
  },
  plugins: [require("daisyui")],

  daisyui: {
    themes: false, // true: all themes | false: only light + dark | array: specific themes like this ["light", "dark", "cupcake"]
    darkTheme: "light", // name of one of the included themes for dark mode
    base: true, // applies background color and foreground color for root element by default
    styled: true, // include daisyUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
    rtl: false, // rotate style direction from left-to-right to right-to-left. You also need to add dir="rtl" to your html tag and install `tailwindcss-flip` plugin for Tailwind CSS.
    prefix: "", // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
    logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
  },
}

