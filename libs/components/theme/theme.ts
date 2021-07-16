import { createTheme } from '@material-ui/core/styles';

const yellow = '#FFD000';
const black = '#000000';

const theme = createTheme({
  palette: {
    primary: {
      main: yellow,
    },
    background: {
      default: black,
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          padding: 2,
        },
      },
      defaultProps: {
        variant: 'outlined',
        position: 'static',
        color: 'transparent',
        elevation: 0,
      },
    },
    MuiToolbar: {


      styleOverrides: {
        root: {
          marginLeft: 'auto',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 25,
          textTransform: 'none',
        },
      },
      defaultProps: {
        color: 'primary',
        variant: 'contained',

      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#e5e5e5',
          borderRadius: '0px'
        }
      },
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
    MuiStepConnector: {
      styleOverrides: {
        active: {
          borderColor: "none"
        },
        line: {
          color: '#ffd000'
        },
      }
    },

    MuiContainer: {
      styleOverrides: {
        root: {
          minHeight: 600,
        },
      },
      defaultProps: {
        maxWidth: 'xs',
      },
    },
  },
});

export default theme;
