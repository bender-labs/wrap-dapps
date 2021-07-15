import { createTheme } from '@material-ui/core/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#FFD000',
    },
    background: {
      default: '#000000',
    },
  },
  components: {
    MuiAppBar: {
      defaultProps: {
        variant: 'outlined',
        position: 'static',
        color: 'transparent',
        elevation: 0,
        sx: {
          padding: 2
        }
      },
    },
    MuiToolbar: {
      defaultProps: {
        sx: {
          ml: 'auto',
        }
      },
    },
    MuiButton: {
      defaultProps: {
        color: 'primary',
        variant: 'contained',
        sx: {
          borderRadius: 25,
          mx: 1,
        }
      },
      styleOverrides: {},
    },
    MuiTypography: {
      defaultProps: {
        sx: {
          display: 'flex',
          width: '50%',
          m: 'auto',
          justifyContent: 'center',
        }
      }
    },
    MuiContainer: {
      defaultProps: {
        maxWidth: 'xs',
        sx: {
          backgroundColor: 'yellow'
        }
      }
    },
    MuiCard: {
      defaultProps: {
        sx: {
          padding: '10px',
          '&:first-child': {
            backgroundColor: 'pink'
          }
        }
      }
    }


  },
});

export default theme;
