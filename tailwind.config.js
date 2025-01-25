/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,html}",
    "./Signin.html"
   
  ],
  theme: {
    extend: {
      backgroundImage: {
        'Ready': "url('../06_password_generator/Ready.jpg')",
      },
      listStyleImage: {
        'checkmark': 'url("C:/Users/lenovo/OneDrive/Desktop/React_js/06_password_generator/src/assets/logo.jpeg")',
      },
    },
  },
  plugins: [],
}

