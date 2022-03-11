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
        extend: {},
        colors: {
            transparent: 'transparent',
            current: 'currentColor',
            'cyan': '#4ECCA3',
            'light-text': '#EEEEEE',
            'error': '#CF6679',
            'dark': {
                1: '#69727B',
                2: '#393E46',
                3: '#232931',
                4: '#121212',
            },
            'grey': {
                400: '#909090',
                500: '#757575',
                600: '#616161',
                700: '#424242',
                800: '#323232',
                900: '#212121',
            }
        },
        plugins: [],
    }
}