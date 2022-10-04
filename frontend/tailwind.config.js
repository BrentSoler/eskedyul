/** @type {import('tailwindcss').Config} */
module.exports = {
	daisyui: {
		themes: [
			{
				eskedyul: {
					primary: "#1e40af",

					secondary: "#7B92B2",

					accent: "#67CBA0",

					neutral: "#181A2A",

					"base-100": "#FFFFFF",

					info: "#3ABFF8",

					success: "#36D399",

					warning: "#FBBD23",

					error: "#F87272",
				},
			},
		],
	},
	content: ["./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {},
			fontFamily: { pop: ["Poppins"] },
		},
	},
	plugins: [require("daisyui")],
};
