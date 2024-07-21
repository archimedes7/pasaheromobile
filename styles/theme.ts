export type ThemeColors = {
  primary: string;
  secondary: string;
  tertiary: string;
  alternate: string;
  primaryText: string;
  secondaryText: string;
  primaryBackground: string;
  secondaryBackground: string;
  accent1: string;
  accent2: string;
  accent3: string;
  accent4: string;
  success: string;
  error: string;
  warning: string;
  info: string;
  customColor1: string;
  primaryBtnText: string;
  lineColor: string;
  noColor: string;
  customColor2: string;
  customColor3: string;
};

export type Theme = {
  colors: ThemeColors;
};

export const lightTheme: Theme = {
  colors: {
    primary: "#007f8a",
    secondary: "#ffffff",
    tertiary: "#ff7150",
    alternate: "#0569a2",
    primaryText: "#007f8a",
    secondaryText: "#ff7f50",
    primaryBackground: "#f1f4f8",
    secondaryBackground: "#ffffff",
    accent1: "#4c4b39ef",
    accent2: "#4d39d2c0",
    accent3: "#4dee8b60",
    accent4: "#ccffffff",
    success: "#249689",
    error: "#ff5963",
    warning: "#f9cf58",
    info: "#ffffff",
    customColor1: "#d7acb5",
    primaryBtnText: "#ffffff",
    lineColor: "#e0e3e7",
    noColor: "#00ffffff",
    customColor2: "#a73bc2",
    customColor3: "#473b01",
  },
};

export const darkTheme: Theme = {
  colors: {
    // Define your dark theme colors here
    // Make sure to include all properties from ThemeColors
    primary: "#005f6a",
    secondary: "#2a2a2a",
    tertiary: "#ff5130",
    alternate: "#0457a0",
    primaryText: "#e0e0e0",
    secondaryText: "#ff9f70",
    primaryBackground: "#1a1a1a",
    secondaryBackground: "#2a2a2a",
    accent1: "#5c5b49ef",
    accent2: "#6d59f2c0",
    accent3: "#6dee9b60",
    accent4: "#ccf0f0f0",
    success: "#34a699",
    error: "#ff7983",
    warning: "#f9df78",
    info: "#e0e0e0",
    customColor1: "#e7bcc5",
    primaryBtnText: "#ffffff",
    lineColor: "#4a4a4a",
    noColor: "#00ffffff",
    customColor2: "#b74bd2",
    customColor3: "#574b11",
  },
};
