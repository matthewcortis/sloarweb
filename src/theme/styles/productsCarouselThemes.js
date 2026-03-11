export const PRODUCTS_CAROUSEL_THEME_KEYS = {
  DEFAULT: "default",
  ONGRID: "onGrid",
  HUAWEI: "huawei",
};

export const PRODUCTS_CAROUSEL_THEMES = {
  [PRODUCTS_CAROUSEL_THEME_KEYS.DEFAULT]: {
    cardBgColor: "#FFFFFF",
    mainColor: "#00A859",
    textColor: "#000000ff",
    saveColor: "#E6F4ED",
    saveIconColor: "#37AA6D",
  },
  [PRODUCTS_CAROUSEL_THEME_KEYS.ONGRID]: {
    cardBgColor: "#FFFFFF",
    mainColor: "#EE4037",
    textColor: "#000000",
    saveColor: "#FDECEB",
    saveIconColor: "#EE4037",
  },
  [PRODUCTS_CAROUSEL_THEME_KEYS.HUAWEI]: {
    cardBgColor: "#000000",
    mainColor: "#EE4037",
    textColor: "#FFFFFF",
    saveColor: "#48484D",
    saveIconColor: "#FFFFFF",
  },
};

export const resolveProductsCarouselTheme = (theme) => {
  const defaultTheme = PRODUCTS_CAROUSEL_THEMES[PRODUCTS_CAROUSEL_THEME_KEYS.DEFAULT];

  if (!theme) return defaultTheme;

  if (typeof theme === "string") {
    return PRODUCTS_CAROUSEL_THEMES[theme] ?? defaultTheme;
  }

  if (typeof theme === "object") {
    return {
      ...defaultTheme,
      ...theme,
    };
  }

  return defaultTheme;
};
