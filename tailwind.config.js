process.env.TAILWIND_MODE = 'watch';

module.exports = {
    content: ['./src/**/*.{html,ts}'],
    // prefix: '',
    // mode: 'jit',
    // purge: {
    //     content: [
    //         './src/**/*.{html,ts,css,scss,sass,less,styl}',
    //     ]
    // },
    darkMode: 'class', // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                transparent: 'transparent',
                current: 'currentColor',
                'cyan': {
                    1: '#B0E8D5',
                    2: '#4ECCA3'
                },
                'light-text': '#EEEEEE',
                'error': {
                    1: '#EBC1C8',
                    2: '#E5AEB8',
                    3: '#E2A5B0',
                    4: '#CF6679',
                    5: '#E2A2AE',

                },
                'dark': {
                    1: '#69727B',
                    2: '#393E46',
                    3: '#232931',
                    4: '#121212',
                },
                'grey': {
                    100: '#424242',
                    200: '#3E3E3E',
                    300: '#3A3A3A',
                    400: '#323232',
                    500: '#212121',
                    600: '#1A1A1A',
                    700: '#161616',
                    800: '#141414',
                    900: '#121212',
                },
                'light-grey': {
                    50: '#B3B3B3',
                    100: '#ABABAB',
                    200: '#A3A3A3',
                    300: '#9A9A9A',
                    400: '#909090',
                    500: '#838383',
                    600: '#757575',
                    700: '#616161',
                    800: '#5A5A5A',
                    900: '#525252',
                }
            },
            fontFamily: {
                poppins: 'Poppins',
            },
            backgroundImage: {
                'net-bg': "url('/assets/net-bg.png')",
              }
        }
    }
}