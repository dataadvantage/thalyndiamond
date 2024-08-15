const defaultTheme = require("tailwindcss/defaultTheme");
/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["src/**/*.{html,md,njk,js}", "_includes/**/*.{html,md,njk,js}"],
	theme: {
		extend: {
			fontFamily: {
				fahkwang: ["Fahkwang", ...defaultTheme.fontFamily.sans],
				prompt: ["Prompt", ...defaultTheme.fontFamily.sans],
			},
			colors: {
				primary: "#6D0F23",
				parchment: "#FBF6F0",
			},
		},
	},
	darkMode: "class",
	plugins: [require("@tailwindcss/typography")],
};
