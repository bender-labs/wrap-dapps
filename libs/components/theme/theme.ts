import { createTheme } from '@material-ui/core';

const theme = createTheme({
  palette: {
    primary: {
      main: '#FFD000',
    },
    secondary: {
      main: '#000000',
    },
  },
  components: {
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundColor: '#191919',
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        select: {
          '&:focus': {
            backgroundColor: '#FFFFFF',
          },
        },
        root: {
          '&.MuiFilledInput-input': {
            backgroundColor: '#FFFFFF',
            padding: '10px 12px 10px',
          },
        },
      },
    },
    MuiFilledInput: {
      styleOverrides: {
        root: {
          backgroundColor: '#FFFFFF',
          '&.MuiFocused': {
            backgroundColor: '#FFFFFF',
          },
        },
        input: {
          padding: '10px 12px 10px',
          backgroundColor: '#FFFFFF',
        },
      },
    },
  },
});

export default theme;
