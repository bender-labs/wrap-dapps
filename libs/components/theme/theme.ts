import { createTheme } from '@material-ui/core/styles';

export const yellow = '#FFD000';
export const black = '#000000';
export const white = '#FFFFFF';

const theme = createTheme({
  palette: {
    primary: {
      main: yellow
    },
    secondary: {
      main: white,
    },
    background: {
      default: black
    }
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          padding: 2
        }
      },
      defaultProps: {
        variant: 'outlined',
        position: 'static',
        color: 'transparent',
        elevation: 0
      }
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          marginLeft: 'auto'
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 25,
          textTransform: 'none'
        }
      },
      defaultProps: {
        color: 'secondary',
        variant: 'contained',

      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#e5e5e5',
          borderRadius: '0px',
        }
      }
    },
    MuiCardHeader: {
      styleOverrides: {
        content: {
          display: 'flex',
          width: '50%',
          m: 'auto',
          justifyContent: 'center',
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          minHeight: 600
        }
      },
      defaultProps: {
        maxWidth: 'xs'
      }
    }
  }
});

export default theme;
