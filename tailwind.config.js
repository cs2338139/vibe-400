/** @type {import('tailwindcss').Config} */
export default {
  mode: 'jit',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1440px',
      '3xl': '1920px'
    },
    fontFamily: {
      'PP-Cirka': ['PP-Cirka', 'sans-serif'],
      'PP-Right-Didone': ['PP-Right-Didone', 'sans-serif'],
      'optima': ['optima', 'sans-serif'],
    },
    fontSize: {
      xs: '.75rem',
      sm: '.875rem',
      tiny: '.875rem',
      base: '1rem',
      md: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '4rem',
      '7xl': '5rem'
    },
    fontWeight: {
      thin: 100,
      extralight: 200,
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
      black: 900
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '16px',
        sm: '16px',
        md: '40px',
        lg: '60px',
        xl: '120px'
      },
      screens: {
        sm: '480px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1440px'
      }
    },
    zIndex: {
      '-10': '-10',
      0: 0,
      1: 1,
      2: 2,
      3: 3,
      4: 4,
      5: 5,
      25: 25,
      50: 50,
      75: 75,
      100: 100,
      auto: 'auto'
    },
    transitionTimingFunction: {
      easeInCubic: 'cubic-bezier(0.32, 0, 0.67, 0)',
      easeOutQuint: 'cubic-bezier(0.33, 1, 0.68, 1)'
    },
    extend: {
      colors: {
        transparent: 'transparent',
        pr: {
          1: '#E01111',
          2: '#288E3E',
        },
        sec: {
          1: '#288E3E',
          2: '#DBBB76',
          3: '#F3EEE5'
        },
        gray: {
          white: '#FFFFFF',
          gray: '#EAEAEA',
          black: '#000000',
        },
      },
      spacing: {
        px: '1px',
        0: '0',
        0.5: '0.125rem',
        1: '0.25rem',
        1.5: '0.375rem',
        2: '0.5rem',
        2.5: '0.625rem',
        3: '0.75rem',
        3.5: '0.875rem',
        4: '1rem',
        5: '1.25rem',
        6: '1.5rem',
        7: '1.75rem',
        8: '2rem',
        9: '2.25rem',
        10: '2.5rem',
        11: '2.75rem',
        12: '3rem',
        14: '3.5rem',
        15: '3.75rem',
        16: '4rem',
        20: '5rem',
        24: '6rem',
        28: '7rem',
        30: '7.5rem',
        32: '8rem',
        36: '9rem',
        40: '10rem',
        44: '11rem',
        48: '12rem',
        52: '13rem',
        56: '14rem',
        60: '15rem',
        64: '16rem',
        72: '18rem',
        80: '20rem',
        96: '24rem'
      },
      boxShadow: {
        btn: '0px 4px 25px rgba(46, 46, 46, 0.1)',
        card: '0px 4px 10px rgba(57, 87, 132, 0.2)',
        filter: '0px 4px 25px rgba(12, 12, 12, 0.1)'
      },
      borderRadius: {
        none: '0',
        sm: '.125rem',
        DEFAULT: '.25rem',
        lg: '.5rem',
        full: '9999px'
      },
      fontSize: {
        'dtHead-1': [
          '80px',
          {
            fontWeight: '400',
            lineHeight: '90%',
            letterSpacing: '0px'
          }
        ],
        'dtHead-2': [
          '45px',
          {
            fontWeight: '300',
            lineHeight: '90%',
            letterSpacing: '0px'
          }
        ],
        'dtHead-3': [
          '28px',
          {
            fontWeight: '400',
            lineHeight: '90%',
            letterSpacing: '0px'
          }
        ],
        'dtHead-4': [
          '28px',
          {
            fontWeight: '300',
            lineHeight: '90%',
            letterSpacing: '0px'
          }
        ],
        'dtBody-1': [
          '20px',
          {
            fontWeight: '400',
            lineHeight: '90%',
            letterSpacing: '0px'
          }
        ],
        'dtBody-2': [
          '16px',
          {
            fontWeight: '400',
            lineHeight: '120%',
            letterSpacing: '0px'
          }
        ],
        'dtMini': [
          '14px',
          {
            fontWeight: '400',
            lineHeight: '140%',
            letterSpacing: '0px'
          }
        ],
        'dtDisplay-2': [
          '120px',
          {
            fontWeight: '400',
            lineHeight: '80%',
            letterSpacing: '0px'
          }
        ],
        'dtDisplay-1': [
          '300px',
          {
            fontWeight: '400',
            lineHeight: '80%',
            letterSpacing: '0px'
          }
        ],
        'mbHead-1': [
          '56px',
          {
            fontWeight: '400',
            lineHeight: '48px',
            letterSpacing: '0px'
          }
        ],
        'mbHead-2': [
          '20px',
          {
            fontWeight: '400',
            lineHeight: '26px',
            letterSpacing: '0px'
          }
        ],
        'mbHead-3': [
          '15px',
          {
            fontWeight: '400',
            lineHeight: '19.5px',
            letterSpacing: '0px'
          }
        ],
        'mbHead-4': [
          '22px',
          {
            fontWeight: '700',
            lineHeight: '28.6px',
            letterSpacing: '0px'
          }
        ],
        'mbBody-1': [
          '20px',
          {
            fontWeight: '400',
            lineHeight: '90%',
            letterSpacing: '0px'
          }
        ],
        'mbBody-2': [
          '16px',
          {
            fontWeight: '400',
            lineHeight: '120%',
            letterSpacing: '0px'
          }
        ],
        'mbMini': [
          '14px',
          {
            fontWeight: '400',
            lineHeight: '140%',
            letterSpacing: '0px'
          }
        ],
        'mbDisplay-2': [
          '72px',
          {
            fontWeight: '400',
            lineHeight: '72px',
            letterSpacing: '0px'
          }
        ],
        'mbDisplay-1': [
          '150px',
          {
            fontWeight: '400',
            lineHeight: '80%',
            letterSpacing: '0px'
          }
        ],
      },
      backgroundImage: {},
    }
  },
  plugins: [],
}

