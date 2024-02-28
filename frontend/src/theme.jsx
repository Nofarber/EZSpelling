import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#F48FB1', // Blue color for primary elements
    },
    secondary: {
      main: '#283593', // Pink color for secondary elements
    },
    background: {
      default: '#BDBDBD', // Light gray background
    },
    text: {
      primary: '#333', // Dark text color
      secondary: '#666', // Slightly lighter text color
    },
  },
  typography: {
    fontFamily: '"Roboto", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 500,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 500,
    },
    h3: {
      fontSize: '1.8rem',
      fontWeight: 500,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 500,
    },
    h5: {
      fontSize: '1.2rem',
      fontWeight: 500,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 500,
    },
    subtitle1: {
      fontSize: '1rem',
      fontWeight: 400,
    },
    subtitle2: {
      fontSize: '0.9rem',
      fontWeight: 400,
    },
    body1: {
      fontSize: '1rem',
      fontWeight: 400,
    },
    body2: {
      fontSize: '0.9rem',
      fontWeight: 400,
    },
  },
  shape: {
    borderRadius: 8, // Rounded corners for elements
  },
  spacing: 8, // Default spacing unit
});

export default theme;
