/** @type {import("tailwindcss").Config} */
export default {
  mode: 'jit',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      '3xl': { min: '2560px' },
      '2xl': { min: '1919px' },
      xl: { max: '1199.98px' },
      lg: { max: '991.98px' },
      md: { max: '767.98px' },
      sm: { max: '575.98px' }
    },
    fontFamily: {
      'PP-Cirka': ['PP-Cirka', 'sans-serif'],
      'PP-Right-Didone': ['PP-Right-Didone', 'sans-serif']
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
      10: 10,
      20: 20,
      25: 25,
      30: 30,
      40: 40,
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
          2: '#288E3E'
        },
        sec: {
          1: '#288E3E',
          2: '#DBBB76',
          3: '#F3EEE5'
        },
        gray: {
          white: '#FFFFFF',
          gray: '#EAEAEA',
          black: '#000000'
        }
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
        96: '24rem',
        100: '25rem',
        104: '26rem',
        108: '27rem',
        112: '28rem',
        116: '29rem',
        120: '30rem',
        124: '31rem',
        130: '32rem',
        134: '33rem',
        138: '34rem',
        142: '35rem',
        146: '36rem',
        150: '37rem',
        154: '38rem',
        158: '39rem',
        162: '40rem',
        166: '41rem',
        170: '42rem',
        174: '43rem',
        178: '44rem',
        182: '45rem',
        186: '46rem',
        190: '47rem',
        194: '48rem',
        198: '49rem',
        202: '50rem',
        204: '51rem',
        208: '52rem',
        212: '53rem',
        216: '54rem',
        220: '55rem',
        224: '56rem',
        228: '57rem',
        232: '58rem',
        236: '59rem',
        240: '60rem',
        260: '65rem',
        280: '70rem',
        300: '75rem',
        320: '80rem',
        340: '85rem',
        360: '90rem',
        380: '95rem',
        400: '100rem',
        420: '105rem',
        440: '110rem',
        460: '115rem',
        480: '120rem',
        500: '125rem',
        520: '130rem',
        540: '135rem',
        560: '140rem',
        580: '145rem',
        600: '150rem',
        620: '155rem',
        640: '160rem',
        660: '165rem',
        680: '170rem',
        700: '175rem',
        720: '180rem',
        740: '185rem',
        760: '190rem',
        780: '195rem',
        800: '200rem',
        820: '205rem',
        840: '210rem',
        860: '215rem',
        880: '220rem',
        900: '225rem',
        920: '230rem',
        940: '235rem',
        960: '240rem',
        980: '245rem',
        1000: '250rem',
        1020: '255rem',
        1040: '260rem',
        1060: '265rem',
        1080: '270rem',
        1100: '275rem',
        1120: '280rem',
        1140: '285rem',
        1160: '290rem',
        1180: '295rem',
        1200: '300rem',
        1220: '305rem',
        1240: '310rem',
        1260: '315rem',
        1280: '320rem',
        1300: '325rem',
        1320: '330rem',
        1340: '335rem',
        1360: '340rem',
        1380: '345rem',
        1400: '350rem',
        1420: '355rem',
        1440: '360rem',
        1460: '365rem',
        1480: '370rem',
        1500: '375rem',
        1520: '380rem',
        1540: '385rem',
        1560: '390rem',
        1580: '395rem',
        1600: '400rem'
      },
      letterSpacing: {
        'custom-0': '0.7rem'
      },
      aspectRatio: {
        '1377/710': '1377/710'
      },
      backgroundSize: {
        'w100%': '100% auto',
        'h100%': 'auto 100%',
        'wh100%': '100% 100%'
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
        dtMini: [
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
        'mbHead-0': [
          '56px',
          {
            fontWeight: '400',
            lineHeight: '48px',
            letterSpacing: '0px'
          }
        ],
        'mbHead-1': [
          '40px',
          {
            fontWeight: '400',
            lineHeight: '48px',
            letterSpacing: '0px'
          }
        ],
        'mbHead-2': [
          '45px',
          {
            fontWeight: '300',
            lineHeight: '90%',
            letterSpacing: '0px'
          }
        ],
        'mbHead-3': [
          '28px',
          {
            fontWeight: '400',
            lineHeight: '90%',
            letterSpacing: '0px'
          }
        ],
        'mbHead-4': [
          '28px',
          {
            fontWeight: '300',
            lineHeight: '90%',
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
        mbMini: [
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
        ]
      },
      backgroundImage: {},
    }
  },
  plugins: []
};
