/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{svelte,js,ts,jsx,tsx}'],
	theme: {
		extend: {
			fontFamily: {
				display: ['Teko'],
				sans: ['Work Sans', 'sans-serif']
			}
		}
	},
	daisyui: {
		themes: [
			{
				mytheme: {
					primary: '#eca72c',
					secondary: '#ee5622',
					accent: '#ce4257',
					neutral: '#484547',
					'base-100': '#221e22',
					'base-200': '#1c191a',
					'base-300': '#53c0f3',
					info: '#53c0f3',
					success: '#71ead2',
					warning: '#f3cc30',
					error: '#e24056'
				}
			}
		]
	},
	plugins: [require('daisyui')]
};
