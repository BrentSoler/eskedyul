/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {},
			fontFamily: { pop: ["Poppins"] },
		},
	},
	plugins: [require("daisyui")],
};
