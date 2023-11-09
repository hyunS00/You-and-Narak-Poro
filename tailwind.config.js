/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{html,js}'],
    theme: {
        extend: {
            colors: {
                'lck-purple': '#7A7CFF',
                'lck-blue': '#5D4BEC',
                'lck-orange': '#FF5740',
                'lck-red': '#FF0030',
                'lck-back': '#2A2846',
                'back-black': '#15171B',
                'back-purple': '#1F1A2F',
            },
        },
    },
    plugins: [],
};
