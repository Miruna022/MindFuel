import { Typography, ThemeManager } from 'react-native-ui-lib';

// Load global typography styles
Typography.loadTypographies({
    default: { fontFamily: 'Inter-Regular' }
});

// Set a global theme for components (optional)
ThemeManager.setComponentTheme('Text', {
    typography: Typography.default,
});