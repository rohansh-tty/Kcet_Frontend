module.exports = {
  content: [
    "./index.html",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/primereact/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ], plugins: [require('@tailwindcss/forms')],
  variants: {
    extend: {
      opacity: ['disabled']
    }
  },
  theme: {
    fontFamily: {
      "sans": ["Recursive", "sans-serif"]
    },
    extend: {
      colors: {
        'primary': '#222831',
        'secondary': '#31363F',
        'tertiary': '#76ABAE',
        'accent': '#EEEEEE'
      },

    }
  }
}
