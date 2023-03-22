/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      header: ["Luckiest Guy", "cursive"],
    },
    fontSize: {
      xsm: '0.65rem',
      sm: '0.8rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.563rem',
      '3xl': '1.953rem',
      '4xl': '2.441rem',
      '5xl': '3.052rem',
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

        '<1000px>': '1000px',
        // => @media (min-width: 1024px) { ... }
  
        'lg': '1250px',
        // => @media (min-width: 1024px) { ... }
  
        'xl': '1280px',
        // => @media (min-width: 1280px) { ... }
  
        '2xl': '1536px',
        // => @media (min-width: 1536px) { ... }
      },
      height: {
        '10vh': '10vh',
        '[9%]': '9%',
        '[45%]': '45%',
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
