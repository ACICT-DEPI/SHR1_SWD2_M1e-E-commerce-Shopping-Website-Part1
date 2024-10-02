/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // define prime react styles
    "./node_modules/primereact/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#3C50E0",
        white: "#FFFFFF",
        black: "#1C2434",
        body: "#64748B",
        bodydark: "#AEB7C0",
        bodydark1: "#DEE4EE",
        bodydark2: "#8A99AF",
        // gray: "#EFF4FB", // السطر ده عامل مشاكل
        graydark: "#333A48",
        "gray-2": "#F7F9FC",
        "gray-3": "#FAFAFA",
        whiten: "#F1F5F9",
        whiter: "#F5F7FD",
        boxdark: "#24303F",
        "boxdark-2": "#1A222C",
        stroke: "#E2E8F0",
        strokedark: "#2E3A47",
        "form-strokedark": "#3d4d60",
        forminput: "#1D2A39",
        "tabel-dark": "#24303F",
        "tabel-thead": "#313D4A",
      },
      spacing: {
        7.5: "1.875rem",
      },
      borderWidth: {
        1: "1px",
      },
    },
  },
  plugins: [],
};
