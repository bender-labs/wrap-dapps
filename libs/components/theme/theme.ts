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
          minHeight: 600,
        },
      },
      defaultProps: {
        maxWidth: 'xs',
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          padding: 10,
          '&:first-child': {
            backgroundColor: '#FF69B4',
          },
        },
      },
    },
  },
});

export default theme;
