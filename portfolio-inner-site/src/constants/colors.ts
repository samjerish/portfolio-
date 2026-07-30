const colors = {
    white: '#FFFFFF',
    black: '#000000',
    turquoise: '#3e9697',
    lightGray: '#c3c6ca',
    darkGray: '#86898d',
    blue: '#0000a3',
    darkBlue: '#0000aa',
    red: '#ff0000',
    macOSBackground: 'linear-gradient(135deg, #1c1e26 0%, #0d0f12 100%)', // modern dark background
    macOSMenuBlur: 'rgba(255, 255, 255, 0.1)',
    macOSMenuBorder: 'rgba(255, 255, 255, 0.2)',
    trafficLightRed: '#FF605C',
    trafficLightYellow: '#FFBD44',
    trafficLightGreen: '#00CA4E',
    macOSWindowLight: 'rgba(255, 255, 255, 0.95)',
    macOSWindowDark: 'rgba(30, 30, 30, 0.95)',
    macOSDockBlur: 'rgba(255, 255, 255, 0.2)',
} as const;

export type ColorName = keyof typeof colors;
export type ThemeColor = typeof colors[ColorName];

export default colors;
