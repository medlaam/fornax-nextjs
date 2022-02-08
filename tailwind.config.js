const themeStyle = require("./config/style.json");
const primaryFont = themeStyle.font.fontFamily.primary.replace(/\+/g, " ");
const base = Number(themeStyle.font.fontSize.base.replace("px", ""));
const fontScale = themeStyle.font.fontSize.fontScale;
const h6 = base;
const h5 = h6 * fontScale;
const h4 = h5 * fontScale;
const h3 = h4 * fontScale;
const h2 = h3 * fontScale;
const h1 = h2 * fontScale;
const h1_sm = h1 * 0.725;
const h2_sm = h2 * 0.725;
const h3_sm = h3 * 0.8;
const large = base + base * 0.125;
const small = base - base * 0.25;

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  variants: {
    extend: {
    }
  },
  plugins: [
    require("@tailwindcss/typography"),
    // ...
  ],
  theme: {
    extend: {
      fontSize: {
        base: themeStyle.font.fontSize.base,
        large: large + "px",
        small: small + "px",
        h1: h1 + "px",
        h2: h2 + "px",
        h3: h3 + "px",
        h4: h4 + "px",
        h5: h5 + "px",
        h6: h6 + "px",
        h1_sm: h1_sm + "px",
        h2_sm: h2_sm + "px",
        h3_sm: h3_sm + "px",
      },
      height: {
        37: "20rem",
      },
      fontFamily: {
        primary: [
          primaryFont.replace(/:[ital,]*[ital@]*[wght@]*[0-9,;]+/gi, ""),
          themeStyle.font.fontFamily.primaryType,
        ]
      },
      colors: {
        primaryColor: themeStyle.color.themeColor.primary,
        light: themeStyle.color.basicColor.light,
        dark: themeStyle.color.basicColor.dark,
        textDark: themeStyle.color.textColor.dark,
        textColor: themeStyle.color.textColor.default,
        textLight: themeStyle.color.textColor.light,
        textWhite: themeStyle.color.basicColor.white,
        borderColor: themeStyle.color.themeColor.border,
        body: themeStyle.color.themeColor.body,
        facebook: themeStyle.color.socialColor.facebook,
        twitter: themeStyle.color.socialColor.twitter,
        instagram: themeStyle.color.socialColor.instagram,
        dribles: themeStyle.color.socialColor.dribles,
      },
    },
  },
};