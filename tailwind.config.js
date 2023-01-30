/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      header: ["Luckiest Guy", "cursive"],
    },
    extend: {
      screens: {
        'sm': '475px',
        // => @media (min-width: 435) { ... }

        'card-sm': '535px',
        // => @media (min-width: 535) { ... }

        'logo-md': '670px',
        // => @media (min-width: 650) { ... }
  
        'md': '768px',
        // => @media (min-width: 768px) { ... }
  
        'lg': '1250px',
        // => @media (min-width: 1024px) { ... }
  
        'xl': '1280px',
        // => @media (min-width: 1280px) { ... }
  
        '2xl': '1536px',
        // => @media (min-width: 1536px) { ... }
      },
      height: {
        '10vh': '10vh',
      },
      spacing: {
        128: "32rem",
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
    },
  },
  plugins: [],
}
};
